import { apiClient } from '../../../shared/services/apiClient';
import { storageService } from '../../../shared/services/storageService';
import { formatProduct } from '../models/product';

const LOCAL_PRODUCTS_KEY = '@local_products';


const INITIAL_LOCAL_PRODUCTS = [
  {
    id: 'local_1',
    title: 'Premium Leather Boots',
    price: 89.99,
    image: require('../images/backpack.png'), 
    seller: 'Handmade Workshop',
    stock: 3,
  }
];

export const productsService = {
  getProducts: async () => {
    try {
      const apiRaw = await apiClient.get('/products');
      const apiProducts = apiRaw.map(item => formatProduct(item, 'api'));

      let localRaw = await storageService.get(LOCAL_PRODUCTS_KEY);
      
      if (!localRaw) {
        await storageService.save(LOCAL_PRODUCTS_KEY, INITIAL_LOCAL_PRODUCTS);
        localRaw = INITIAL_LOCAL_PRODUCTS;
      }
      
      const localProducts = localRaw.map(item => formatProduct(item, 'local'));

      return [...localProducts, ...apiProducts];
    } catch (error) {
      console.error("Error unifying products:", error);
      return [];
    }
  }
};