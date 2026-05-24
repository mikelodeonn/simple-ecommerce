const User = require("../models/User");
const bcrypt = require("bcrypt"); 

class UserService {
  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new User(userData);
    return await user.save();
  }


  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Credenciales incorrectas");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciales incorrectas");

    return user; 
  }

  async getAllUsers() {
    return await User.find().select("-password");
  }

  async getUserById(id) {
    const user = await User.findById(id).select("-password");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateUser(id, updateData) {
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");
    if (!user) throw new Error("Usuario no encontrado para actualizar");
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("Usuario no encontrado para eliminar");
    return user;
  }
}

module.exports = new UserService();
