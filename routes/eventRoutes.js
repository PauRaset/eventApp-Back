const express = require("express");
const multer = require("multer");
const path = require("path"); // Importar 'path' para gestionar rutas de archivos
const router = express.Router();
const Event = require("../models/Event");

// Configurar multer para subir archivos a la carpeta "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde guardar las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Endpoint para crear un nuevo evento con una imagen
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, city, street, postalCode } = req.body;
    const image = req.file ? req.file.filename : null; // Nombre del archivo de la imagen, si se carga

    const newEvent = new Event({
      title,
      description,
      date,
      city,
      street,
      postalCode,
      image, // Guardar el nombre de la imagen en la base de datos
    });

    // Guardamos el evento en la base de datos
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent); // Respondemos con el evento guardado
  } catch (error) {
    console.error("Error al guardar el evento:", error);
    res.status(500).json({ message: "Error al guardar el evento", error });
  }
});

// Endpoint para obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Obtener todos los eventos de la base de datos
    res.json(events); // Responder con la lista de eventos
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
});

// Endpoint para obtener los detalles de un evento por su ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros de la URL
  try {
    const event = await Event.findById(id); // Buscar el evento en la base de datos por su ID
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json(event); // Devolver el evento encontrado
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    res.status(500).json({ message: "Error al obtener el evento", error });
  }
});

module.exports = router;

/*const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Endpoint para obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Obtener todos los eventos de la base de datos
    res.json(events); // Enviar la lista de eventos como JSON
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
});

// Endpoint para añadir un nuevo evento con localización
router.post("/", async (req, res) => {
  try {
    const { title, description, date, city, street } = req.body; // Añadir city y street

    // Crear un nuevo evento con los datos recibidos
    const newEvent = new Event({
      title,
      description,
      date,
      city, // Guardar ciudad
      street, // Guardar calle
    });

    // Guardar el evento en la base de datos
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent); // Responder con el evento guardado
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el evento", error });
  }
});

// Endpoint para obtener un evento por ID
router.get("/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    // Busca el evento en la base de datos por ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(event); // Envía los detalles del evento como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el evento", error });
  }
});

module.exports = router;*/
