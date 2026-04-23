const BASE_URL = 'https://fakestoreapi.com';

export const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Error en la petición API');
      return await response.json();
    } catch (error) {
     
      throw error;
    }
  }
};