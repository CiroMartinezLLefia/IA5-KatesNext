const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ ALERTA: La variable MONGODB_URI no està definida a l'entorn.");
    console.warn("⚠️ L'API Express funcionarà amb emmagatzematge en memòria (Array).");
    return null;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`🔌 Connectat correctament a MongoDB Atlas: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ Error de connexió a MongoDB Atlas:", error.message);
    console.warn("⚠️ L'API Express arrencarà però farà caiguda segura cap a emmagatzematge en memòria (Array).");
    return null;
  }
};

module.exports = connectDB;
