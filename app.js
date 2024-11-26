const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Cargar variables del archivo .env
const path = require("path"); // Para manejar rutas de archivos

const app = express();

// Permite solicitudes desde cualquier origen
app.use(
  cors({
    origin: "*", // Usa * para pruebas, aunque no es recomendable para producción.
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json()); // Middleware para manejar JSON

// Middleware para servir los archivos estáticos de la carpeta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Configura la ruta para acceder a las imágenes cargadas

// Conectar a MongoDB usando mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Ruta principal para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Rutas
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
