const Event = require("../models/Event");

// Controlador para obtener todos los eventos
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los eventos" });
  }
};

// Controlador para crear un nuevo evento
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const newEvent = new Event({
    title,
    description,
    date,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el evento" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
};
