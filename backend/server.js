require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const bacallaRoutes = require("./routes/bacalla");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // Allow all origins for the academic project to prevent any CORS blockages
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/bacalla", bacallaRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Bacallà REST API (HUB Backend)",
    status: "running",
    endpoints: {
      list: "GET /api/bacalla",
      detail: "GET /api/bacalla/:id",
      create: "POST /api/bacalla"
    }
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor de l'API Express unificada al port ${PORT}`);
  });
};

startServer();
