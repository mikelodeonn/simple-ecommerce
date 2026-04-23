import { storageService } from '../../../shared/services/storageService';

export const ordersService = {
  saveOrder: async (order, userEmail) => {
    const key = `@orders_${userEmail}`;
    const existing = await storageService.get(key) || [];
    const updated = [order, ...existing];
    await storageService.save(key, updated);
    return updated;
  },
  getOrders: async (userEmail) => {
    const key = `@orders_${userEmail}`;
    return await storageService.get(key) || [];
  },
  deleteOrder: async (orderId, userEmail) => {
    const key = `@orders_${userEmail}`;
    const existing = await storageService.get(key) || [];
    const updated = existing.filter(o => o.id !== orderId);
    await storageService.save(key, updated);
    return updated;
  }
};