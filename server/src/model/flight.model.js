const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  actualLandingTime: { type: String },
  actualOffBlockTime: { type: String },
  aircraftRegistration: { type: String },
  aircraftType: {
    iataMain: { type: String },
    iataSub: { type: String },
  },
  airlineCode: { type: Number },
  baggageClaim: {
    belts: [{ type: String }],
  },
  codeshares: {
    codeshares: [{ type: String }],
  },
  estimatedLandingTime: { type: String },
  expectedTimeOnBelt: { type: String },
  expectedSecurityFilter: { type: String },
  flightDirection: { type: String }, // A veya D
  flightName: { type: String },
  flightNumber: { type: Number },
  id: { type: String, unique: true }, // Benzersiz kimlik
  isOperationalFlight: { type: Boolean },
  lastUpdatedAt: { type: String },
  mainFlight: { type: String },
  prefixIATA: { type: String },
  prefixICAO: { type: String },
  publicFlightState: {
    flightStates: [{ type: String }],
  },
  route: {
    destinations: [{ type: String }],
    eu: { type: String },
    visa: { type: Boolean },
  },
  scheduleDate: { type: String },
  scheduleDateTime: { type: String },
  scheduleTime: { type: String },
  schemaVersion: { type: String },
  serviceType: { type: String },
  terminal: { type: Number },
  checkinAllocations: {
    checkinAllocations: [
      {
        endTime: { type: String },
        rows: {
          rows: [
            {
              desks: { type: [{ position: Number }] },
              position: { type: String },
            },
          ],
        },
        startTime: { type: String },
      },
    ],
  },
});

//ucus modelini olusturdum.
const flight = mongoose.model("Flight", flightSchema);

module.exports = flight;
