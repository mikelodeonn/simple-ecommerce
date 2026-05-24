import { storageService } from '../../../shared/services/storageService';

const USERS_LIST_KEY = '@all_users_list';

export const userService = {
  registerUser: async (userData) => {
    const users = await storageService.get(USERS_LIST_KEY) || [];
    const exists = users.find(u => u.email === userData.email);
    if (exists) return false;
    users.push(userData);
    await storageService.save(USERS_LIST_KEY, users);
    return true;
  },
  validateLogin: async (email, password) => {
    const users = await storageService.get(USERS_LIST_KEY) || [];
    return users.find(u => u.email === email && u.password === password);
  },
  updateUserInList: async (updatedData) => {
    const users = await storageService.get(USERS_LIST_KEY) || [];
    const updatedList = users.map(u => u.email === updatedData.email ? updatedData : u);
    await storageService.save(USERS_LIST_KEY, updatedList);
  },
  deleteUserFromList: async (email) => {
    const users = await storageService.get(USERS_LIST_KEY) || [];
    const filtered = users.filter(u => u.email !== email);
    await storageService.save(USERS_LIST_KEY, filtered);
  }
};