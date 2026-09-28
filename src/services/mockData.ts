import { User, SaleRecord, Shift, ShiftRegistration, OperatingCost, SystemSettings, AdHistoryRecord, PayrollPeriod } from '../types';
import { getVNMonday } from '../utils/dateUtils';

const formatDateStr = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const baseMon = getVNMonday();
baseMon.setHours(0, 0, 0, 0);

const dMon = new Date(baseMon);
const dTue = new Date(baseMon); dTue.setDate(baseMon.getDate() + 1);
const dWed = new Date(baseMon); dWed.setDate(baseMon.getDate() + 2);
const dThu = new Date(baseMon); dThu.setDate(baseMon.getDate() + 3);
const dFri = new Date(baseMon); dFri.setDate(baseMon.getDate() + 4);
const dSat = new Date(baseMon); dSat.setDate(baseMon.getDate() + 5);
const dSun = new Date(baseMon); dSun.setDate(baseMon.getDate() + 6);

export const strMon = formatDateStr(dMon);
export const strTue = formatDateStr(dTue);
export const strWed = formatDateStr(dWed);
export const strThu = formatDateStr(dThu);
export const strFri = formatDateStr(dFri);
export const strSat = formatDateStr(dSat);
export const strSun = formatDateStr(dSun);

export const DEMO_USERS: User[] = [
  {
    id: 'u_admin',
    username: 'admin',
    full_name: 'Aura Admin',
    role: 'manager',
    commission_percent: 0,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bank_name: 'Techcombank',
    bank_account: '190367899999',
    bank_account_name: 'AURA TAROT STUDIO',
    status: 'active'
  },
  {
    id: 'u_reader1',
    username: 'linhdan',
    full_name: 'Linh Đan',
    role: 'reader',
    commission_percent: 50,
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    bank_name: 'MBBank',
    bank_account: '0981234567',
    bank_account_name: 'NGUYEN THI LINH DAN',
    status: 'active'
  },
  {
    id: 'u_reader2',
    username: 'minhtriet',
    full_name: 'Minh Triết',
    role: 'reader',
    commission_percent: 45,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bank_name: 'Vietcombank',
    bank_account: '1012345678',
    bank_account_name: 'TRAN MINH TRIET',
    status: 'active'
  },
  {
    id: 'u_reader3',
    username: 'baongoc',
    full_name: 'Bảo Ngọc',
    role: 'reader',
    commission_percent: 40,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bank_name: 'ACB',
    bank_account: '23456789',
    bank_account_name: 'LE THI BAO NGOC',
    status: 'active'
  },
  {
    id: 'u_reader4',
    username: 'huongly',
    full_name: 'Hương Ly',
    role: 'reader',
    commission_percent: 45,
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    bank_name: 'VPBank',
    bank_account: '9876543210',
    bank_account_name: 'HOANG HUONG LY',
    status: 'active'
  },
  {
    id: 'u_sale1',
    username: 'thanhtruc',
    full_name: 'Thanh Trúc',
    role: 'sale',
    commission_percent: 10,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bank_name: 'MBBank',
    bank_account: '0912345678',
    bank_account_name: 'PHAM THANH TRUC',
    status: 'active'
  },
  {
    id: 'u_sale2',
    username: 'duchuy',
    full_name: 'Đức Huy',
    role: 'sale',
    commission_percent: 10,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    bank_name: 'TPBank',
    bank_account: '0345678901',
    bank_account_name: 'VU DUC HUY',
    status: 'active'
  }
];

export const DEMO_SALES: SaleRecord[] = [
  // Thứ 2
  {
    id: 'DON-101',
    date: strMon,
    customer_name: 'Trần Thu Hà',
    package_name: 'Tarot - Gói Tình Duyên Sâu 60p',
    amount: 250000,
    tip: 50000,
    reader_id: 'u_reader1',
    sale_id: 'u_sale1',
    created_at: `${strMon}T09:30:00+07:00`
  },
  {
    id: 'DON-102',
    date: strMon,
    customer_name: 'Nguyễn Hoàng Nam',
    package_name: 'Tarot - Gói Sự Nghiệp & Tài Chính',
    amount: 350000,
    tip: 100000,
    reader_id: 'u_reader2',
    sale_id: 'u_sale1',
    created_at: `${strMon}T11:15:00+07:00`
  },
  {
    id: 'DON-103',
    date: strMon,
    customer_name: 'Lê Phương Thảo',
    package_name: 'Tarot - 5 câu chi tiết',
    amount: 100000,
    tip: 30000,
    reader_id: 'u_reader3',
    sale_id: 'u_sale2',
    created_at: `${strMon}T14:20:00+07:00`
  },
  {
    id: 'DON-104',
    date: strMon,
    customer_name: 'Đặng Minh Quân',
    package_name: 'Lenormand - Dự Báo 3 Tháng Tới',
    amount: 180000,
    tip: 50000,
    reader_id: 'u_reader3',
    sale_id: 'u_sale1',
    created_at: `${strMon}T16:45:00+07:00`
  },
  {
    id: 'DON-105',
    date: strMon,
    customer_name: 'Phạm Quỳnh Anh',
    package_name: 'Gói Chữa Lành Năng Lượng & Tarot',
    amount: 500000,
    tip: 100000,
    reader_id: 'u_reader4',
    sale_id: 'u_sale2',
    created_at: `${strMon}T19:00:00+07:00`
  },
  {
    id: 'DON-106',
    date: strMon,
    customer_name: 'Vũ Gia Bảo',
    package_name: 'Tarot - 3 câu nhanh',
    amount: 80000,
    tip: 0,
    reader_id: 'u_reader1',
    sale_id: 'u_sale1',
    created_at: `${strMon}T21:10:00+07:00`
  },
  {
    id: 'DON-107',
    date: strMon,
    customer_name: 'Hoàng Yến Nhi',
    package_name: 'Tarot - 7 câu chuyên sâu',
    amount: 129000,
    tip: 20000,
    reader_id: 'u_reader2',
    sale_id: 'u_sale2',
    created_at: `${strMon}T22:30:00+07:00`
  },

  // Thứ 3
  {
    id: 'DON-108',
    date: strTue,
    customer_name: 'Bùi Anh Tuấn',
    package_name: 'Tarot - Gói Giải Mã Mối Quan Hệ',
    amount: 220000,
    tip: 50000,
    reader_id: 'u_reader4',
    sale_id: 'u_sale1',
    created_at: `${strTue}T09:15:00+07:00`
  },
  {
    id: 'DON-109',
    date: strTue,
    customer_name: 'Trịnh Cẩm Tú',
    package_name: 'Tarot - Gói Khởi Nghiệp & Kinh Doanh',
    amount: 400000,
    tip: 100000,
    reader_id: 'u_reader2',
    sale_id: 'u_sale1',
    created_at: `${strTue}T11:00:00+07:00`
  },
  {
    id: 'DON-110',
    date: strTue,
    customer_name: 'Đỗ Thùy Trang',
    package_name: 'Tarot - 10 câu trọn gói',
    amount: 169000,
    tip: 30000,
    reader_id: 'u_reader1',
    sale_id: 'u_sale2',
    created_at: `${strTue}T13:40:00+07:00`
  },
  {
    id: 'DON-111',
    date: strTue,
    customer_name: 'Ngô Thanh Hằng',
    package_name: 'Tarot - Gói Tình Duyên Sâu 60p',
    amount: 250000,
    tip: 50000,
    reader_id: 'u_reader1',
    sale_id: 'u_sale1',
    created_at: `${strTue}T15:20:00+07:00`
  },
  {
    id: 'DON-112',
    date: strTue,
    customer_name: 'Phan Quốc Dũng',
    package_name: 'Tarot - 5 câu chi tiết',
    amount: 100000,
    tip: 20000,
    reader_id: 'u_reader3',
    sale_id: 'u_sale2',
    created_at: `${strTue}T17:50:00+07:00`
  },
  {
    id: 'DON-113',
    date: strTue,
    customer_name: 'Lương Thúy Vi',
    package_name: 'Gói Chữa Lành Năng Lượng & Tarot',
    amount: 500000,
    tip: 80000,
    reader_id: 'u_reader4',
    sale_id: 'u_sale1',
    created_at: `${strTue}T19:30:00+07:00`
  },
  {
    id: 'DON-114',
    date: strTue,
    customer_name: 'Mai Tấn Lộc',
    package_name: 'Tarot - 7 câu chuyên sâu',
    amount: 129000,
    tip: 20000,
    reader_id: 'u_reader2',
    sale_id: 'u_sale2',
    created_at: `${strTue}T21:00:00+07:00`
  }
];

export const DEMO_AD_HISTORY: AdHistoryRecord[] = [
  {
    id: 'ad_1',
    date: strMon,
    spend: 380000,
    revenue: 2450000,
    operating_costs: 180000,
    commission: 820000,
    net_profit: 1070000,
    updated_at: `${strMon}T23:59:00+07:00`
  },
  {
    id: 'ad_2',
    date: strTue,
    spend: 420000,
    revenue: 2800000,
    operating_costs: 120000,
    commission: 940000,
    net_profit: 1320000,
    updated_at: `${strTue}T23:59:00+07:00`
  }
];

export const DEMO_OPERATING_COSTS: OperatingCost[] = [
  {
    id: 'cost_1',
    description: 'Phần mềm Chatbot AI & Fanpage',
    amount: 180000,
    category: 'Marketing / Tool',
    date: strMon,
    created_at: `${strMon}T09:00:00+07:00`
  },
  {
    id: 'cost_2',
    description: 'Nến thơm & Trà thảo mộc phòng Tarot',
    amount: 120000,
    category: 'Vận hành shop',
    date: strTue,
    created_at: `${strTue}T10:00:00+07:00`
  }
];

export const DEMO_SHIFTS: Shift[] = [
  { id: 's_morning', shift_name: 'Ca Sáng', start_time: '09:00', end_time: '13:00' },
  { id: 's_afternoon', shift_name: 'Ca Chiều', start_time: '13:00', end_time: '17:00' },
  { id: 's_evening', shift_name: 'Ca Tối', start_time: '17:00', end_time: '21:00' },
  { id: 's_night', shift_name: 'Ca Đêm', start_time: '21:00', end_time: '01:00' }
];

export const DEMO_READER_SHIFTS: ShiftRegistration[] = [
  { id: 'rs_1', user_id: 'u_reader1', shift_id: 's_morning', day_of_week: 'Thứ 2' },
  { id: 'rs_2', user_id: 'u_reader2', shift_id: 's_morning', day_of_week: 'Thứ 2' },
  { id: 'rs_3', user_id: 'u_reader3', shift_id: 's_afternoon', day_of_week: 'Thứ 2' },
  { id: 'rs_4', user_id: 'u_reader4', shift_id: 's_evening', day_of_week: 'Thứ 2' },
  { id: 'rs_5', user_id: 'u_reader1', shift_id: 's_night', day_of_week: 'Thứ 2' },
  { id: 'rs_6', user_id: 'u_reader4', shift_id: 's_morning', day_of_week: 'Thứ 3' },
  { id: 'rs_7', user_id: 'u_reader2', shift_id: 's_morning', day_of_week: 'Thứ 3' },
  { id: 'rs_8', user_id: 'u_reader1', shift_id: 's_afternoon', day_of_week: 'Thứ 3' },
  { id: 'rs_9', user_id: 'u_reader3', shift_id: 's_afternoon', day_of_week: 'Thứ 3' },
  { id: 'rs_10', user_id: 'u_reader4', shift_id: 's_evening', day_of_week: 'Thứ 3' },
  { id: 'rs_11', user_id: 'u_reader2', shift_id: 's_night', day_of_week: 'Thứ 3' },
  { id: 'rs_12', user_id: 'u_reader1', shift_id: 's_morning', day_of_week: 'Thứ 4' },
  { id: 'rs_13', user_id: 'u_reader3', shift_id: 's_afternoon', day_of_week: 'Thứ 4' },
  { id: 'rs_14', user_id: 'u_reader2', shift_id: 's_evening', day_of_week: 'Thứ 4' },
  { id: 'rs_15', user_id: 'u_reader2', shift_id: 's_morning', day_of_week: 'Thứ 5' },
  { id: 'rs_16', user_id: 'u_reader4', shift_id: 's_afternoon', day_of_week: 'Thứ 5' },
  { id: 'rs_17', user_id: 'u_reader1', shift_id: 's_evening', day_of_week: 'Thứ 6' },
  { id: 'rs_18', user_id: 'u_reader3', shift_id: 's_night', day_of_week: 'Thứ 6' },
  { id: 'rs_19', user_id: 'u_reader1', shift_id: 's_afternoon', day_of_week: 'Thứ 7' },
  { id: 'rs_20', user_id: 'u_reader2', shift_id: 's_evening', day_of_week: 'Thứ 7' },
  { id: 'rs_21', user_id: 'u_reader4', shift_id: 's_evening', day_of_week: 'Chủ nhật' }
];

export const DEMO_SALE_SHIFTS: ShiftRegistration[] = [
  { id: 'ss_1', user_id: 'u_sale1', shift_id: 's_morning', day_of_week: 'Thứ 2' },
  { id: 'ss_2', user_id: 'u_sale2', shift_id: 's_afternoon', day_of_week: 'Thứ 2' },
  { id: 'ss_3', user_id: 'u_sale1', shift_id: 's_morning', day_of_week: 'Thứ 3' },
  { id: 'ss_4', user_id: 'u_sale2', shift_id: 's_evening', day_of_week: 'Thứ 3' }
];

const prevMon = new Date(baseMon); prevMon.setDate(baseMon.getDate() - 7);
const prevSun = new Date(baseMon); prevSun.setDate(baseMon.getDate() - 1);
const strPrevMon = formatDateStr(prevMon);
const strPrevSun = formatDateStr(prevSun);

export const DEMO_PAYROLL_PERIODS: PayrollPeriod[] = [
  {
    id: `payroll_${strPrevMon}`,
    title: `Tuần trước (${String(prevMon.getDate()).padStart(2, '0')}/${String(prevMon.getMonth() + 1).padStart(2, '0')} - ${String(prevSun.getDate()).padStart(2, '0')}/${String(prevSun.getMonth() + 1).padStart(2, '0')})`,
    start_date: strPrevMon,
    end_date: strPrevSun,
    total_revenue: 16850000,
    total_payout: 7850000,
    total_ad_spend: 2650000,
    owner_net_profit: 6350000,
    created_at: `${strMon}T00:00:00+07:00`,
    items: [
      {
        user_id: 'u_reader1',
        user_name: 'Linh Đan',
        role: 'reader',
        commission_percent: 50,
        total_amount: 5650000,
        total_tip: 550000,
        commission: 2825000,
        net_payout: 3375000,
        bank_name: 'MBBank',
        bank_account: '0981234567',
        is_paid: true,
        paid_at: `${strMon}T09:00:00+07:00`
      },
      {
        user_id: 'u_reader2',
        user_name: 'Minh Triết',
        role: 'reader',
        commission_percent: 45,
        total_amount: 4700000,
        total_tip: 400000,
        commission: 2115000,
        net_payout: 2515000,
        bank_name: 'Vietcombank',
        bank_account: '1012345678',
        is_paid: true,
        paid_at: `${strMon}T09:10:00+07:00`
      },
      {
        user_id: 'u_reader3',
        user_name: 'Bảo Ngọc',
        role: 'reader',
        commission_percent: 40,
        total_amount: 2550000,
        total_tip: 250000,
        commission: 1020000,
        net_payout: 1270000,
        bank_name: 'ACB',
        bank_account: '23456789',
        is_paid: true,
        paid_at: `${strMon}T09:15:00+07:00`
      },
      {
        user_id: 'u_sale1',
        user_name: 'Thanh Trúc',
        role: 'sale',
        commission_percent: 10,
        total_amount: 11500000,
        total_tip: 0,
        commission: 1150000,
        net_payout: 1150000,
        bank_name: 'MBBank',
        bank_account: '0912345678',
        is_paid: true,
        paid_at: `${strMon}T09:20:00+07:00`
      }
    ]
  }
];

export const DEMO_SETTINGS: SystemSettings = {
  id: 'global',
  is_locked: false,
  bank_name: 'Techcombank',
  bank_account_number: '190367899999',
  bank_account_name: 'AURA TAROT STUDIO',
  packages: [
    { id: '1', name: 'Tarot - 1 câu', label: 'Tarot - 1 câu', price: 35000, popular: false },
    { id: '2', name: 'Tarot - 3 câu', label: 'Tarot - 3 câu', price: 80000, popular: false },
    { id: '3', name: 'Tarot - 5 câu', label: 'Tarot - 5 câu', price: 100000, popular: false },
    { id: '4', name: 'Tarot - 7 câu', label: 'Tarot - 7 câu', price: 129000, popular: false },
    { id: '5', name: 'Tarot - 10 câu', label: 'Tarot - 10 câu', price: 169000, popular: true },
    { id: '6', name: 'Lenormand - 1 câu', label: 'Lenormand - 1 câu', price: 45000, popular: false },
    { id: '7', name: 'Lenormand - 3 câu', label: 'Lenormand - 3 câu', price: 100000, popular: false },
    { id: '8', name: 'Lenormand - 5 câu', label: 'Lenormand - 5 câu', price: 149000, popular: false },
    { id: '9', name: 'Gói Tình Duyên Sâu 60p', label: 'Gói Tình Duyên Sâu 60p', price: 250000, popular: true },
    { id: '10', name: 'Gói Sự Nghiệp & Tài Chính', label: 'Gói Sự Nghiệp & Tài Chính', price: 350000, popular: true },
    { id: '11', name: 'Gói Chữa Lành Năng Lượng & Tarot', label: 'Gói Chữa Lành Năng Lượng & Tarot', price: 500000, popular: true }
  ]
};
