const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  city: String,
  street: String,
  postalCode: String,
  image: String, // Campo para la imagen
});

module.exports = mongoose.model("Event", eventSchema);

/*// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true }, // Campo para ciudad
  street: { type: String, required: true }, // Campo para calle
});

module.exports = mongoose.model("Event", eventSchema);*/
