import { useState, useEffect } from 'react';
import { productsService } from '../services/productsService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const loadData = async () => {
    setIsLoading(true);
    const data = await productsService.getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return { products, isLoading, refresh: loadData };
};