import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  LogOut, 
  TrendingUp, 
  Wallet, 
  User as UserIcon,
  Clock,
  CalendarCheck,
  Receipt,
  Settings,
  X,
  CreditCard
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  view: string;
  setView: (view: any) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
  setEditingSale: (sale: any) => void;
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
        ${active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  view, 
  setView, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  handleLogout,
  setEditingSale
}) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform lg:translate-x-0
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-10">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-purple-200 border border-purple-100 shrink-0">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">Aura Tarot</span>
                <span className="px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-wider">Demo</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold">Chế độ xem thử</p>
            </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            icon={<TrendingUp size={20} />} 
            label="Dashboard" 
            active={view === 'dashboard'} 
            onClick={() => { setView('dashboard'); setIsSidebarOpen(false); }} 
          />
          {user.role === 'manager' && (
            <>
              <SidebarItem 
                icon={<Users size={20} />} 
                label="Nhân Viên" 
                active={view === 'staff'} 
                onClick={() => { setView('staff'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<PlusCircle size={20} />} 
                label="Nhập Doanh Thu" 
                active={view === 'entry'} 
                onClick={() => { 
                  setEditingSale(null);
                  setView('entry'); 
                  setIsSidebarOpen(false); 
                }} 
              />
              <SidebarItem 
                icon={<Clock size={20} />} 
                label="Quản Lý Ca" 
                active={view === 'shifts'} 
                onClick={() => { setView('shifts'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<TrendingUp size={20} />} 
                label="Lịch Sử Giao Dịch" 
                active={view === 'sales_history'} 
                onClick={() => { setView('sales_history'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<CreditCard size={20} />} 
                label="Bảng Lương" 
                active={view === 'payroll'} 
                onClick={() => { setView('payroll'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<Receipt size={20} />} 
                label="Chi Phí Vận Hành" 
                active={view === 'costs'} 
                onClick={() => { setView('costs'); setIsSidebarOpen(false); }} 
              />
            </>
          )}

          {user.role === 'sale' && (
            <SidebarItem 
              icon={<PlusCircle size={20} />} 
              label="Nhập Doanh Thu" 
              active={view === 'entry'} 
              onClick={() => { 
                setEditingSale(null);
                setView('entry'); 
                setIsSidebarOpen(false); 
              }} 
            />
          )}

          {(user.role === 'reader' || user.role === 'sale') && (
            <>
              <SidebarItem 
                icon={<TrendingUp size={20} />} 
                label="Lịch Sử Đơn Của Tôi" 
                active={view === 'sales_history'} 
                onClick={() => { setView('sales_history'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<CalendarCheck size={20} />} 
                label="Đăng Ký Ca" 
                active={view === 'register_shift'} 
                onClick={() => { setView('register_shift'); setIsSidebarOpen(false); }} 
              />
            </>
          )}

          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Cài Đặt" 
            active={view === 'settings'} 
            onClick={() => { setView('settings'); setIsSidebarOpen(false); }} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon size={20} className="text-slate-600" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user.full_name}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
