import { storageService } from '../../../shared/services/storageService';

const ORDERS_KEY = '@my_orders';

export const ordersService = {
  // Guarda el pedido nuevo junto con los anteriores
  saveOrder: async (order) => {
    try {
      const existingOrders = await storageService.get(ORDERS_KEY) || [];
      const updatedOrders = [order, ...existingOrders];
      await storageService.save(ORDERS_KEY, updatedOrders);
      return updatedOrders;
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      throw error;
    }
  },
  
  // Recupera la lista de pedidos
  getOrders: async () => {
    try {
      const orders = await storageService.get(ORDERS_KEY);
      return orders || [];
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return [];
    }
  }
};