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

const READ_ONLY_MSG = '🔒 Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc). Các thao tác thêm/sửa/xóa chỉ mở trên phiên bản chính thức.';

export const firebaseService = {
  // --- Initialization & Data Fetching ---
  getInitialData: async (): Promise<{ status: string; data?: any; message?: string }> => {
    return {
      status: 'ok',
      data: {
        users: [...DEMO_USERS],
        sales: [...DEMO_SALES],
        shifts: [...DEMO_SHIFTS],
        readerShifts: [...DEMO_READER_SHIFTS],
        saleShifts: [...DEMO_SALE_SHIFTS],
        costs: [...DEMO_OPERATING_COSTS],
        settings: { ...DEMO_SETTINGS, id: 'global' },
        adHistory: [...DEMO_AD_HISTORY]
      }
    };
  },

  // --- Auth ---
  login: async (username: string, _password?: string): Promise<FirebaseResponse> => {
    const user = DEMO_USERS.find(u => u.username.toLowerCase() === username.trim().toLowerCase()) || DEMO_USERS[0];
    return { success: true, user };
  },

  // --- User Management (Read-only) ---
  getUsers: async () => [...DEMO_USERS],
  addUser: async (_userData: Partial<User>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  updateUser: async (_userData: User): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  updateUserProfile: async (_userId: string, _data: Partial<User>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deactivateUser: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },

  // --- Sales Management (Read-only) ---
  getSales: async () => [...DEMO_SALES],
  addSaleRecord: async (_saleData: any): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  updateSaleRecord: async (_saleData: SaleRecord): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deleteSaleRecord: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },

  // --- Shifts Management (Read-only) ---
  getShifts: async () => [...DEMO_SHIFTS],
  createShift: async (_shiftData: Partial<Shift>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deleteShift: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  registerReaderShift: async (_registration: any): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  registerSaleShift: async (_registration: any): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deleteReaderShift: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deleteSaleShift: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  clearWeeklyShifts: async (): Promise<FirebaseResponse> => {
    return { success: true };
  },

  // --- Operating Costs (Read-only) ---
  getOperatingCosts: async () => [...DEMO_OPERATING_COSTS],
  addOperatingCost: async (_costData: Partial<OperatingCost>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deleteOperatingCost: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },

  // --- Ad History (Read-only) ---
  getAdHistory: async () => [...DEMO_AD_HISTORY],
  saveWeeklyAdCost: async (_dayName: string, _spend: number, _dateStr: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },

  // --- Payroll Periods ---
  getPayrollPeriods: async (): Promise<PayrollPeriod[]> => [...DEMO_PAYROLL_PERIODS],
  savePayrollPeriod: async (_period: Partial<PayrollPeriod>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  updatePayrollItem: async (_periodId: string, _userId: string, _patch: Partial<PayrollStaffItem>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  deletePayrollPeriod: async (_id: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  updateStaffBank: async (_userId: string, _bankName: string, _bankAccount: string): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },

  // --- Settings (Read-only) ---
  getSettings: async () => ({ ...DEMO_SETTINGS, id: 'global' }),
  updateSettings: async (_settingsData: Partial<SystemSettings>): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
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
        users: DEMO_USERS,
        sales: DEMO_SALES,
        shifts: DEMO_SHIFTS,
        operating_costs: DEMO_OPERATING_COSTS,
        ad_history: DEMO_AD_HISTORY
      }
    };
    return {
      success: true,
      data: backupObj,
      backup: backupObj
    };
  },
  restoreFullBackup: async (_backupData: any): Promise<FirebaseResponse> => {
    return { success: false, message: READ_ONLY_MSG };
  },
  migrateData: async (): Promise<FirebaseResponse> => {
    return { success: true, message: 'Dữ liệu demo đã chuẩn hóa.' };
  }
};
