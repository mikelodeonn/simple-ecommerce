import { apiClient } from '../../../shared/services/apiClient';
import { storageService } from '../../../shared/services/storageService';
import { formatProduct } from '../models/product';

const LOCAL_PRODUCTS_KEY = '@local_products';


const INITIAL_LOCAL_PRODUCTS = [

  // --- ELECTRONICS (5) ---
  {
    id: 'elec_1',
    title: 'Mechanical Keyboard RGB',
    price: 59.99,
    description: 'High-performance mechanical keyboard with customizable RGB lighting and blue switches.',
    category: 'electronics',
    image: require('../images/keyboard.png'),
    seller: 'Tech Gear Mexico',
    stock: 15,
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 'elec_2',
    title: 'Wireless Gaming Mouse',
    price: 34.50,
    description: 'Ergonomic 16000 DPI wireless mouse with long-lasting battery.',
    category: 'electronics',
    image: require('../images/mouse.png'),
    seller: 'Digital Store',
    stock: 20,
    rating: { rate: 4.2, count: 85 }
  },
  {
    id: 'elec_3',
    title: 'Noise Cancelling Headphones',
    price: 89.99,
    description: 'Over-ear headphones with active noise cancellation and 30-hour battery life.',
    category: 'electronics',
    image: require('../images/headphones.png'),
    seller: 'SoundPro',
    stock: 12,
    rating: { rate: 4.6, count: 200 }
  },
  {
    id: 'elec_4',
    title: 'Smartwatch Series 5',
    price: 129.99,
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    category: 'electronics',
    image: require('../images/smartwatch.png'),
    seller: 'WearTech',
    stock: 8,
    rating: { rate: 4.3, count: 150 }
  },
  {
    id: 'elec_5',
    title: 'Portable Bluetooth Speaker',
    price: 49.99,
    description: 'Water-resistant speaker with deep bass and 12-hour playtime.',
    category: 'electronics',
    image: require('../images/speaker.png'),
    seller: 'MusicWorld',
    stock: 18,
    rating: { rate: 4.4, count: 90 }
  },

  // --- JEWELERY (5) ---
  {
    id: 'jewel_1',
    title: 'Silver Chain Bracelet',
    price: 45.00,
    description: 'Elegant 925 sterling silver bracelet, perfect for any occasion.',
    category: 'jewelery',
    image: require('../images/bracelet.png'),
    seller: 'Silver & Gold Shop',
    stock: 5,
    rating: { rate: 4.8, count: 40 }
  },
  {
    id: 'jewel_2',
    title: 'Gold Pendant Necklace',
    price: 120.00,
    description: '18K gold necklace with minimalist pendant design.',
    category: 'jewelery',
    image: require('../images/necklace.png'),
    seller: 'Luxury Jewelers',
    stock: 3,
    rating: { rate: 4.9, count: 25 }
  },
  {
    id: 'jewel_3',
    title: 'Diamond Stud Earrings',
    price: 250.00,
    description: 'Classic diamond stud earrings with 0.5 carat stones.',
    category: 'jewelery',
    image: require('../images/earrings.png'),
    seller: 'Diamond House',
    stock: 2,
    rating: { rate: 5.0, count: 15 }
  },
  {
    id: 'jewel_4',
    title: 'Pearl Ring',
    price: 80.00,
    description: 'Elegant ring with natural freshwater pearl.',
    category: 'jewelery',
    image: require('../images/ring.png'),
    seller: 'Pearl Boutique',
    stock: 6,
    rating: { rate: 4.7, count: 30 }
  },
  {
    id: 'jewel_5',
    title: 'Charm Anklet',
    price: 35.00,
    description: 'Delicate anklet with multiple charms, adjustable size.',
    category: 'jewelery',
    image: require('../images/anklet.png'),
    seller: 'Trendy Accessories',
    stock: 10,
    rating: { rate: 4.5, count: 50 }
  },

  // --- MEN'S CLOTHING (5) ---
  {
    id: 'men_1',
    title: 'Casual Denim Jacket',
    price: 75.00,
    description: 'Classic blue denim jacket, 100% cotton, slim fit design.',
    category: "men's clothing",
    image: require('../images/jacket.png'),
    seller: 'Urban Style',
    stock: 10,
    rating: { rate: 4.0, count: 55 }
  },
  {
    id: 'men_2',
    title: 'Basic White T-Shirt',
    price: 15.00,
    description: 'Soft cotton crew neck t-shirt, regular fit.',
    category: "men's clothing",
    image: require('../images/tshirt.png'),
    seller: 'Everyday Wear',
    stock: 30,
    rating: { rate: 4.3, count: 70 }
  },
  {
    id: 'men_3',
    title: 'Slim Fit Chinos',
    price: 40.00,
    description: 'Comfortable slim fit chinos, versatile for casual or formal wear.',
    category: "men's clothing",
    image: require('../images/chinos.png'),
    seller: 'Smart Casual',
    stock: 15,
    rating: { rate: 4.1, count: 45 }
  },
  {
    id: 'men_4',
    title: 'Leather Belt',
    price: 25.00,
    description: 'Durable genuine leather belt with metal buckle.',
    category: "men's clothing",
    image: require('../images/belr.png'),
    seller: 'Classic Wear',
    stock: 20,
    rating: { rate: 4.6, count: 60 }
  },
  {
    id: 'men_5',
    title: 'Sports Hoodie',
    price: 50.00,
    description: 'Lightweight hoodie with breathable fabric, ideal for workouts.',
    category: "men's clothing",
    image: require('../images/hoodie.png'),
    seller: 'Active Life',
    stock: 12,
    rating: { rate: 4.4, count: 80 }
  },

  // --- WOMEN'S CLOTHING (5) ---
  {
    id: 'women_1',
    title: 'Floral Summer Dress',
    price: 39.99,
    description: 'Lightweight floral dress, breathable fabric, ideal for summer days.',
    category: "women's clothing",
    image: require('../images/dress.png'),
    seller: 'Fashion Boutique',
    stock: 12,
    rating: { rate: 4.7, count: 95 }
  },
  {
    id: 'women_2',
    title: 'Wool Winter Coat',
    price: 120.00,
    description: 'Warm wool coat with button closure, elegant design.',
    category: "women's clothing",
    image: require('../images/coat.png'),
    seller: 'Winter Wear',
    stock: 7,
    rating: { rate: 4.8, count: 40 }
  },
  {
    id: 'women_3',
    title: 'Yoga Leggings',
    price: 29.99,
    description: 'Stretchable leggings with high waist, perfect for fitness.',
    category: "women's clothing",
    image: require('../images/leggins.png'),
    seller: 'Active Fashion',
    stock: 25,
    rating: { rate: 4.5, count: 110 }
  },
  {
    id: 'women_4',
    title: 'Silk Blouse',
    price: 55.00,
    description: 'Elegant silk blouse with long sleeves, ideal for office wear.',
    category: "women's clothing",
    image: require('../images/blouse.png'),
    seller: 'Elegant Styles',
    stock: 9,
    rating: { rate: 4.6, count: 65 }
  },
  {
    id: 'women_5',
    title: 'Casual Sneakers',
    price: 60.00,
    description: 'Comfortable sneakers with breathable mesh and rubber sole.',
    category: "women's clothing",
    image: require('../images/sneakers.png'),
    seller: 'Street Wear',
    stock: 14,
    rating: { rate: 4.4, count: 75 }
  }

];

export const productsService = {
  getProducts: async () => {
    try {
      const apiRaw = await apiClient.get('/products');
      const apiProducts = apiRaw.map(item => formatProduct(item, 'api'));
// --- CAMBIO TEMPORAL PARA FORZAR RESET ---
      // Forzamos que localRaw sea siempre lo que tienes en el código
      const localRaw = INITIAL_LOCAL_PRODUCTS; 
      
      // Guardamos encima de lo que haya en el storage para "actualizarlo"
      await storageService.save(LOCAL_PRODUCTS_KEY, INITIAL_LOCAL_PRODUCTS);
      // -----------------------------------------
      const localProducts = localRaw.map(item => formatProduct(item, 'local'));

      return [...localProducts, ...apiProducts];
    } catch (error) {
      console.error("Error unifying products:", error);
      return [];
    }
  }
};