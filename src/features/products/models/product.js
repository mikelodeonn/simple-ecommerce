export const formatProduct = (rawData, source = 'local') => {
  return {
    id: rawData.id?.toString() || Math.random().toString(36).substring(2, 9),
    title: rawData.title || 'Unknown Product',
    price: Number(rawData.price) || 0,
    description: rawData.description || 'No description available.',
    category: rawData.category?.toLowerCase() || 'general',
    image: rawData.image || null, 
    
   
    seller: rawData.seller || (source === 'api' ? 'FakeStore Official' : 'Local Seller'),
    stock: rawData.stock ?? (source === 'api' ? 10 : 0),
    rating: {
      rate: rawData.rating?.rate || 0,
      count: rawData.rating?.count || 0
    },
    source: source,
    createdAt: rawData.createdAt || new Date().toISOString(),
  };
};