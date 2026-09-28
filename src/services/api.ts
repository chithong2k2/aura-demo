export const apiService = {
  getInitialData: async () => ({ success: true }),
  login: async (_username: string, _password?: string) => ({ success: true }),
  getUsers: async () => ({ success: true }),
  addUser: async (_user: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  updateUser: async (_user: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deactivateUser: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  addSale: async (_sale: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  updateSale: async (_sale: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deleteSale: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  getShifts: async () => ({ success: true }),
  addShift: async (_shift: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deleteShift: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  registerReaderShift: async (_reg: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  registerSaleShift: async (_reg: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deleteReaderShift: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deleteSaleShift: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  getOperatingCosts: async () => ({ success: true }),
  addOperatingCost: async (_cost: any) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  deleteOperatingCost: async (_id: string) => ({ success: false, message: 'Bản Demo chỉ hỗ trợ xem thử (Chỉ Đọc)' }),
  syncMetaAds: async () => ({
    success: true,
    message: 'Đã đồng bộ realtime chi phí Meta Ads thành công!'
  }),
  testMetaAds: async (_token?: string, _actId?: string) => ({
    success: true,
    message: 'Kết nối Meta Graph API thành công!',
    account: {
      name: 'Aura Tarot Meta Ads',
      id: 'act_123456789'
    }
  }),
  testConnection: async () => ({
    success: true,
    message: 'Kết nối hệ thống ổn định!'
  }),
  analyzePriceMenu: async (_imageBase64: string, _mimeType?: string, _apiKey?: string) => ({
    success: true,
    packages: [
      { name: 'Tarot - 1 câu', price: 25000 },
      { name: 'Tarot - 3 câu', price: 70000 },
      { name: 'Tarot - 5 câu', price: 100000 },
      { name: 'Tarot - 10 câu', price: 180000 }
    ],
    method: 'OCR AI' as any,
    rawText: 'Tarot 1 cau: 25.000d\nTarot 3 cau: 70.000d\nTarot 5 cau: 100.000d',
    message: 'Nhận diện thành công'
  }),
  testModelFallback: async () => ({
    success: true,
    message: 'Gemini AI Vision sẵn sàng'
  })
};
