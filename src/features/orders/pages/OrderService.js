import { storageService } from '../../../shared/services/storageService';

const ORDERS_KEY = '@my_orders';


export const ordersService = {
  saveOrder: async (order) => {
    const existingOrders = await storageService.get(ORDERS_KEY) || [];
    const updatedOrders = [order, ...existingOrders];
    await storageService.save(ORDERS_KEY, updatedOrders);
    return updatedOrders;
  },
  getOrders: async () => {
    const orders = await storageService.get(ORDERS_KEY);
    return orders || [];
  }
};