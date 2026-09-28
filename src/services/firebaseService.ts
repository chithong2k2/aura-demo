import { 
  User, 
  SaleRecord, 
  Shift, 
  ShiftRegistration, 
  OperatingCost, 
  SystemSettings, 
  AdHistoryRecord, 
  PayrollPeriod, 
  PayrollStaffItem 
} from '../types';
import { 
  DEMO_USERS, 
  DEMO_SALES, 
  DEMO_SHIFTS, 
  DEMO_READER_SHIFTS, 
  DEMO_SALE_SHIFTS, 
  DEMO_OPERATING_COSTS, 
  DEMO_SETTINGS, 
  DEMO_AD_HISTORY, 
  DEMO_PAYROLL_PERIODS 
} from './mockData';

export interface FirebaseResponse {
  success: boolean;
  message?: string;
  id?: string;
  user?: User;
  data?: any;
  backup?: any;
}

// In-Memory state: starts with fresh demo data every time the page loads!
let memoryUsers: User[] = JSON.parse(JSON.stringify(DEMO_USERS));
let memorySales: SaleRecord[] = JSON.parse(JSON.stringify(DEMO_SALES));
let memoryShifts: Shift[] = JSON.parse(JSON.stringify(DEMO_SHIFTS));
let memoryReaderShifts: ShiftRegistration[] = JSON.parse(JSON.stringify(DEMO_READER_SHIFTS));
let memorySaleShifts: ShiftRegistration[] = JSON.parse(JSON.stringify(DEMO_SALE_SHIFTS));
let memoryCosts: OperatingCost[] = JSON.parse(JSON.stringify(DEMO_OPERATING_COSTS));
let memorySettings: SystemSettings = JSON.parse(JSON.stringify(DEMO_SETTINGS));
let memoryAdHistory: AdHistoryRecord[] = JSON.parse(JSON.stringify(DEMO_AD_HISTORY));
let memoryPayrollPeriods: PayrollPeriod[] = JSON.parse(JSON.stringify(DEMO_PAYROLL_PERIODS));

export const firebaseService = {
  // --- Initialization & Data Fetching ---
  getInitialData: async (): Promise<{ status: string; data?: any; message?: string }> => {
    return {
      status: 'ok',
      data: {
        users: [...memoryUsers],
        sales: [...memorySales],
        shifts: [...memoryShifts],
        readerShifts: [...memoryReaderShifts],
        saleShifts: [...memorySaleShifts],
        costs: [...memoryCosts],
        settings: { ...memorySettings, id: 'global' },
        adHistory: [...memoryAdHistory]
      }
    };
  },

  // --- Auth ---
  login: async (username: string, _password?: string): Promise<FirebaseResponse> => {
    const user = memoryUsers.find(u => u.username.toLowerCase() === username.trim().toLowerCase()) || memoryUsers[0];
    return { success: true, user };
  },

  // --- User Management (In-Memory) ---
  getUsers: async () => [...memoryUsers],
  addUser: async (userData: Partial<User>): Promise<FirebaseResponse> => {
    const newId = `u_${Date.now()}`;
    const newUser: User = {
      id: newId,
      username: userData.username || `user_${Date.now()}`,
      full_name: userData.full_name || 'Nhân Viên Mới',
      role: userData.role || 'reader',
      commission_percent: Number(userData.commission_percent) || 30,
      bank_name: userData.bank_name || 'MBBank',
      bank_account: userData.bank_account || '',
      bank_account_name: userData.bank_account_name || userData.full_name || '',
      status: 'active'
    };
    memoryUsers.push(newUser);
    return { success: true, id: newId, user: newUser };
  },
  updateUser: async (userData: User): Promise<FirebaseResponse> => {
    memoryUsers = memoryUsers.map(u => u.id === userData.id ? { ...u, ...userData } : u);
    return { success: true, user: userData };
  },
  updateUserProfile: async (userId: string, data: Partial<User>): Promise<FirebaseResponse> => {
    memoryUsers = memoryUsers.map(u => u.id === userId ? { ...u, ...data } : u);
    return { success: true };
  },
  deactivateUser: async (id: string): Promise<FirebaseResponse> => {
    memoryUsers = memoryUsers.filter(u => u.id !== id);
    return { success: true };
  },

  // --- Sales Management (In-Memory) ---
  getSales: async () => [...memorySales],
  addSaleRecord: async (saleData: any): Promise<FirebaseResponse> => {
    const newId = `DON-${Date.now().toString().slice(-4)}`;
    const newRecord: SaleRecord = {
      id: newId,
      customer_name: saleData.customer_name || 'Khách vãng lai',
      package_name: saleData.package_name || 'Gói Tarot',
      amount: Number(saleData.amount) || 0,
      tip: Number(saleData.tip) || 0,
      reader_id: saleData.reader_id || '',
      sale_id: saleData.sale_id || '',
      date: saleData.date || new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString()
    };
    memorySales.unshift(newRecord);
    return { success: true, id: newId };
  },
  updateSaleRecord: async (saleData: SaleRecord): Promise<FirebaseResponse> => {
    memorySales = memorySales.map(s => s.id === saleData.id ? { ...s, ...saleData } : s);
    return { success: true };
  },
  deleteSaleRecord: async (id: string): Promise<FirebaseResponse> => {
    memorySales = memorySales.filter(s => s.id !== id);
    return { success: true };
  },

  // --- Shifts Management (In-Memory) ---
  getShifts: async () => [...memoryShifts],
  createShift: async (shiftData: Partial<Shift>): Promise<FirebaseResponse> => {
    const newId = `s_${Date.now()}`;
    const newShift: Shift = {
      id: newId,
      shift_name: shiftData.shift_name || 'Ca Mới',
      start_time: shiftData.start_time || '09:00',
      end_time: shiftData.end_time || '13:00'
    };
    memoryShifts.push(newShift);
    return { success: true, id: newId };
  },
  deleteShift: async (id: string): Promise<FirebaseResponse> => {
    memoryShifts = memoryShifts.filter(s => s.id !== id);
    memoryReaderShifts = memoryReaderShifts.filter(rs => rs.shift_id !== id);
    memorySaleShifts = memorySaleShifts.filter(ss => ss.shift_id !== id);
    return { success: true };
  },
  registerReaderShift: async (reg: any): Promise<FirebaseResponse> => {
    const newId = `rs_${Date.now()}`;
    memoryReaderShifts.push({
      id: newId,
      user_id: reg.user_id,
      shift_id: reg.shift_id,
      day_of_week: reg.day_of_week
    });
    return { success: true, id: newId };
  },
  registerSaleShift: async (reg: any): Promise<FirebaseResponse> => {
    const newId = `ss_${Date.now()}`;
    memorySaleShifts.push({
      id: newId,
      user_id: reg.user_id,
      shift_id: reg.shift_id,
      day_of_week: reg.day_of_week
    });
    return { success: true, id: newId };
  },
  deleteReaderShift: async (id: string): Promise<FirebaseResponse> => {
    memoryReaderShifts = memoryReaderShifts.filter(rs => rs.id !== id && rs.user_id !== id);
    return { success: true };
  },
  deleteSaleShift: async (id: string): Promise<FirebaseResponse> => {
    memorySaleShifts = memorySaleShifts.filter(ss => ss.id !== id && ss.user_id !== id);
    return { success: true };
  },
  clearWeeklyShifts: async (): Promise<FirebaseResponse> => {
    memoryReaderShifts = [];
    memorySaleShifts = [];
    return { success: true };
  },

  // --- Operating Costs (In-Memory) ---
  getOperatingCosts: async () => [...memoryCosts],
  addOperatingCost: async (costData: Partial<OperatingCost>): Promise<FirebaseResponse> => {
    const newId = `cost_${Date.now()}`;
    const newCost: OperatingCost = {
      id: newId,
      description: costData.description || 'Chi phí phụ',
      amount: Number(costData.amount) || 0,
      category: costData.category || 'Vận hành',
      date: costData.date || new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString()
    };
    memoryCosts.unshift(newCost);
    return { success: true, id: newId };
  },
  deleteOperatingCost: async (id: string): Promise<FirebaseResponse> => {
    memoryCosts = memoryCosts.filter(c => c.id !== id);
    return { success: true };
  },

  // --- Ad History (In-Memory) ---
  getAdHistory: async () => [...memoryAdHistory],
  saveWeeklyAdCost: async (dayName: string, spend: number, dateStr: string): Promise<FirebaseResponse> => {
    const existing = memoryAdHistory.find(h => h.date === dateStr);
    if (existing) {
      existing.spend = spend;
    } else {
      memoryAdHistory.push({
        id: `ad_${dateStr}`,
        date: dateStr,
        spend,
        revenue: 0,
        operating_costs: 0,
        commission: 0,
        net_profit: -spend,
        updated_at: new Date().toISOString()
      });
    }
    return { success: true };
  },

  // --- Payroll Periods (In-Memory) ---
  getPayrollPeriods: async (): Promise<PayrollPeriod[]> => [...memoryPayrollPeriods],
  savePayrollPeriod: async (period: Partial<PayrollPeriod>): Promise<FirebaseResponse> => {
    const newId = period.id || `payroll_${Date.now()}`;
    const newPeriod: PayrollPeriod = {
      id: newId,
      title: period.title || 'Kỳ Lương Mới',
      start_date: period.start_date || '',
      end_date: period.end_date || '',
      total_revenue: Number(period.total_revenue) || 0,
      total_payout: Number(period.total_payout) || 0,
      total_ad_spend: Number(period.total_ad_spend) || 0,
      owner_net_profit: Number(period.owner_net_profit) || 0,
      created_at: new Date().toISOString(),
      items: period.items || []
    };
    memoryPayrollPeriods.unshift(newPeriod);
    return { success: true, id: newId };
  },
  updatePayrollItem: async (periodId: string, userId: string, patch: Partial<PayrollStaffItem>): Promise<FirebaseResponse> => {
    const period = memoryPayrollPeriods.find(p => p.id === periodId);
    if (period) {
      period.items = period.items.map(item => item.user_id === userId ? { ...item, ...patch } : item);
    }
    return { success: true };
  },
  deletePayrollPeriod: async (id: string): Promise<FirebaseResponse> => {
    memoryPayrollPeriods = memoryPayrollPeriods.filter(p => p.id !== id);
    return { success: true };
  },
  updateStaffBank: async (userId: string, bankName: string, bankAccount: string): Promise<FirebaseResponse> => {
    memoryUsers = memoryUsers.map(u => u.id === userId ? { ...u, bank_name: bankName, bank_account: bankAccount } : u);
    return { success: true };
  },

  // --- Settings (In-Memory) ---
  getSettings: async () => ({ ...memorySettings, id: 'global' }),
  updateSettings: async (settingsData: Partial<SystemSettings>): Promise<FirebaseResponse> => {
    memorySettings = { ...memorySettings, ...settingsData };
    return { success: true };
  },

  // --- Utilities ---
  checkAndAutoRolloverWeek: async () => {},
  seedDatabase: async (): Promise<FirebaseResponse> => {
    return { success: true, message: 'Dữ liệu demo đã tải sẵn đầy đủ.' };
  },
  exportFullBackup: async (): Promise<FirebaseResponse> => {
    const backupObj = {
      exported_at: new Date().toISOString(),
      collections: {
        users: memoryUsers,
        sales: memorySales,
        shifts: memoryShifts,
        operating_costs: memoryCosts,
        ad_history: memoryAdHistory
      }
    };
    return {
      success: true,
      data: backupObj,
      backup: backupObj
    };
  },
  restoreFullBackup: async (_backupData: any): Promise<FirebaseResponse> => {
    return { success: true, message: 'Khôi phục tạm thời thành công!' };
  },
  migrateData: async (): Promise<FirebaseResponse> => {
    return { success: true, message: 'Dữ liệu demo đã chuẩn hóa.' };
  }
};
