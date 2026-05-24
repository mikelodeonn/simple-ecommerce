const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maribelalba37:mongoLoo123@damm2026.ntu3asi.mongodb.net/?retryWrites=true&w=majority&appName=damm2026",
    );
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("No se pudo conectar a MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
