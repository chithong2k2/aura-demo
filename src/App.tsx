import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  User, 
  SaleRecord, 
  DashboardSummary, 
  Shift, 
  ShiftRegistration, 
  OperatingCost, 
  SystemSettings, 
  AdHistoryRecord, 
  PayrollPeriod 
} from './types';
import { firebaseService } from './services/firebaseService';
import { DEMO_USERS } from './services/mockData';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { StaffView } from './components/views/StaffView';
import { SaleEntryView } from './components/views/SaleEntryView';
import { ShiftView } from './components/views/ShiftView';
import { CostsView } from './components/views/CostsView';
import { SettingsView } from './components/views/SettingsView';
import { SalesHistoryView } from './components/views/SalesHistoryView';
import { PayrollView } from './components/views/PayrollView';
import { LoginView } from './components/views/LoginView';
import { calculateDashboardSummary, INITIAL_SUMMARY } from './utils/dashboard';
import { getVNDateStr, getVNDayName } from './utils/dateUtils';
import { Menu, Sparkles, ShieldCheck } from 'lucide-react';

const READ_ONLY_NOTICE = '🔒 Bản Demo chỉ xem thử (Chỉ Đọc). Các thao tác thêm/sửa/xóa chỉ mở trên phiên bản chính thức!';

export default function App() {
  const [user, setUser] = useState<User | null>(DEMO_USERS[0]);
  const [view, setView] = useState<'dashboard' | 'staff' | 'staff_form' | 'entry' | 'shifts' | 'register_shift' | 'settings' | 'sales_history' | 'payroll' | 'costs'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [rawSales, setRawSales] = useState<SaleRecord[]>([]);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [costs, setCosts] = useState<OperatingCost[]>([]);
  const [adHistory, setAdHistory] = useState<AdHistoryRecord[]>([]);
  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>([]);
  const [readerSchedule, setReaderSchedule] = useState<ShiftRegistration[]>([]);
  const [saleSchedule, setSaleSchedule] = useState<ShiftRegistration[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({ id: 'global', is_locked: false });
  const [selectedDay, setSelectedDay] = useState<string>(() => getVNDayName());
  const [selectedReader, setSelectedReader] = useState<string>('All');

  // Load all mock data on mount
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await firebaseService.getInitialData();
      if (res.status === 'ok' && res.data) {
        setUsers(res.data.users || []);
        setRawSales(res.data.sales || []);
        setShifts(res.data.shifts || []);
        setCosts(res.data.costs || []);
        setSettings(res.data.settings || { id: 'global', is_locked: false });
        setAdHistory(res.data.adHistory || []);
        setReaderSchedule(res.data.readerShifts || []);
        setSaleSchedule(res.data.saleShifts || []);
        const periods = await firebaseService.getPayrollPeriods();
        setPayrollPeriods(periods || []);
      }
    } catch (err) {
      console.error("[Demo App] Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Enrich sales
  useEffect(() => {
    if (!user) return;

    const enriched = rawSales.map(s => {
      const reader = users.find(u => u.id === s.reader_id || u.full_name === s.reader_id);
      const sale = users.find(u => u.id === s.sale_id || u.full_name === s.sale_id);
      
      const rPercent = reader ? Number(reader.commission_percent || 0) : 0;
      const sPercent = sale ? Number(sale.commission_percent || 0) : 0;
      
      const baseAmount = Number(s.amount) || 0;
      const calculatedRComm = Math.round(baseAmount * (rPercent / 100));
      const calculatedSComm = Math.round(baseAmount * (sPercent / 100));

      return {
        ...s,
        reader_commission: s.reader_commission !== undefined ? s.reader_commission : calculatedRComm,
        sale_commission: s.sale_commission !== undefined ? s.sale_commission : calculatedSComm
      };
    });

    if (user.role === 'manager') {
      setSales(enriched);
    } else if (user.role === 'reader') {
      const filtered = enriched.filter(s => s.reader_id === user.id || s.reader_id === user.full_name);
      setSales(filtered);
    } else if (user.role === 'sale') {
      const filtered = enriched.filter(s => s.sale_id === user.id || s.sale_id === user.full_name);
      setSales(filtered);
    }
  }, [rawSales, users, user]);

  // Recalculate summary
  useEffect(() => {
    if (sales.length >= 0) {
      const sum = calculateDashboardSummary(sales, users, costs, adHistory);
      setSummary(sum);
    }
  }, [sales, users, costs, adHistory]);

  // Read-only handlers
  const [editingSale, setEditingSale] = useState<SaleRecord | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<Partial<User>>({});
  const [saleForm, setSaleForm] = useState<Partial<SaleRecord>>({ date: getVNDateStr() });
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const res = await firebaseService.login(loginForm.username);
    if (res.user) setUser(res.user);
    setLoginLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Intercept mutations with read-only alerts
  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(READ_ONLY_NOTICE);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(READ_ONLY_NOTICE);
  };

  const handleUserDelete = async (_id: string) => {
    alert(READ_ONLY_NOTICE);
  };

  const handleShiftRegistration = async (_shiftId: string, _day: string) => {
    alert(READ_ONLY_NOTICE);
  };

  const handleShiftUnregistration = async (_id: string, _type?: 'reader' | 'sale') => {
    alert(READ_ONLY_NOTICE);
  };

  const onUpdateUser = async (_data: Partial<User>) => {
    alert(READ_ONLY_NOTICE);
  };

  const onUpdateSettings = async (_data: Partial<SystemSettings>) => {
    alert(READ_ONLY_NOTICE);
  };

  const handleSyncToSheets = async () => {
    alert(READ_ONLY_NOTICE);
  };

  const handleSeed = async () => {
    alert('Dữ liệu Demo đã được nạp sẵn đầy đủ!');
  };

  if (!user) {
    return (
      <LoginView 
        loginForm={loginForm} 
        setLoginForm={setLoginForm} 
        handleLogin={handleLogin} 
        handleSeed={handleSeed}
        checkApi={() => alert('Demo Mode (Offline)')}
        loading={loginLoading}
      />
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <DashboardView 
            user={user}
            summary={summary || INITIAL_SUMMARY}
            adHistory={adHistory}
            costs={costs}
            payrollPeriods={payrollPeriods}
            fetchData={fetchData}
            sales={sales}
            users={users}
            selectedReader={selectedReader}
            setSelectedReader={setSelectedReader}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setEditingSale={setEditingSale}
            setView={setView}
          />
        );
      case 'staff':
      case 'staff_form':
        return (
          <StaffView 
            users={users} view={view} setView={setView} 
            editingUser={editingUser} setEditingUser={setEditingUser}
            userForm={userForm} setUserForm={setUserForm}
            handleUserSubmit={handleUserSubmit} handleUserDelete={handleUserDelete}
            loading={loading}
            sales={sales}
          />
        );
      case 'entry':
        return (
          <SaleEntryView 
            editingSale={editingSale} setEditingSale={setEditingSale}
            saleForm={saleForm} setSaleForm={setSaleForm}
            handleSaleSubmit={handleSaleSubmit}
            users={users}
            sales={sales}
            fetchData={fetchData}
            setView={setView} loading={loading}
            systemSettings={settings}
          />
        );
      case 'shifts':
      case 'register_shift':
        return (
          <ShiftView 
            user={user} view={view} shifts={shifts} 
            readerSchedule={readerSchedule} saleSchedule={saleSchedule}
            fetchData={fetchData} handleShiftRegistration={handleShiftRegistration}
            handleShiftUnregistration={handleShiftUnregistration} loading={loading}
            settings={settings}
            users={users}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            user={user}
            onUpdateUser={onUpdateUser}
            systemSettings={settings}
            onUpdateSettings={onUpdateSettings}
            onSyncToSheets={handleSyncToSheets}
          />
        );
      case 'sales_history':
        return (
          <SalesHistoryView 
            user={user}
            sales={sales}
            users={users}
            fetchData={fetchData}
            setEditingSale={setEditingSale}
            setView={setView}
          />
        );
      case 'payroll':
        return (
          <PayrollView 
            user={user}
            users={users}
            sales={sales}
            payrollPeriods={payrollPeriods}
            adHistory={adHistory}
            fetchData={fetchData}
            loading={loading}
          />
        );
      case 'costs':
        return (
          <CostsView 
            user={user}
            costs={costs}
            fetchData={fetchData}
            loading={loading}
          />
        );
      default:
        return (
          <DashboardView 
            user={user}
            summary={summary || INITIAL_SUMMARY}
            adHistory={adHistory}
            costs={costs}
            payrollPeriods={payrollPeriods}
            fetchData={fetchData}
            sales={sales}
            users={users}
            selectedReader={selectedReader}
            setSelectedReader={setSelectedReader}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setEditingSale={setEditingSale}
            setView={setView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Demo Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-900 text-white text-xs px-4 py-2 font-bold flex items-center justify-between shadow-sm shrink-0 z-50">
        <div className="flex items-center gap-2 mx-auto text-center">
          <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
          <span>BẢN DEMO XEM THỬ (CHỈ ĐỌC) — Trải nghiệm hệ thống Aura Tarot Studio</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/15 text-[10px] text-amber-200">
            Dữ liệu mô phỏng
          </span>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar 
          user={user} 
          view={view} 
          setView={setView} 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          handleLogout={handleLogout} 
          setEditingSale={setEditingSale}
        />

        <main className={`flex-1 min-w-0 ${view === 'entry' ? 'h-[calc(100vh-36px)] overflow-hidden flex flex-col' : 'overflow-auto'} lg:pl-64`}>
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-slate-200 p-3.5 flex items-center justify-between sticky top-0 z-20 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-purple-100 shadow-sm shrink-0">
                <img 
                  src="/logo.svg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-900 block leading-tight">Aura Tarot</span>
                <span className="text-[10px] font-bold text-purple-600 block">Demo Studio</span>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className={`${view === 'entry' ? 'p-3 lg:p-5 flex-1 min-h-0 flex flex-col' : 'p-4 lg:p-8'} ${view === 'settings' ? 'max-w-[1600px]' : 'max-w-7xl'} mx-auto w-full`}>
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
