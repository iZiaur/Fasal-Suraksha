require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Mock Database of Farms
const farms = {
  'plot-2': {
    id: 'plot-2',
    name: 'Plot 2 — Barmer',
    crop: 'Bajra',
    lat: 25.75,
    lon: 71.39, // Barmer, Rajasthan
    coverageAmount: 25000,
    farmer: 'Ramesh Patel'
  }
};

// Global state for Hackathon Demo
let simulationMode = false;

app.get('/api/weather/:farmId', async (req, res) => {
  const farm = farms[req.farmId] || farms['plot-2'];

  if (simulationMode) {
    // 💥 DISASTER SIMULATION MODE (Hackathon override)
    return res.json({
      status: 'CRITICAL',
      triggerReached: true,
      data: {
        temp: 48,
        humidity: 8,
        rainfall30Days: 0.0,
        soilMoisture: 4,
        droughtDays: 40,
        droughtThreshold: 40,
        message: 'Drought parameter breached! Payout triggered.'
      }
    });
  }

  // 🌍 NORMAL MODE (Real API Data)
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${farm.lat}&lon=${farm.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const weatherData = response.data;

    // We mix real data with our parametric business logic
    res.json({
      status: 'HEALTHY',
      triggerReached: false,
      data: {
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        rainfall30Days: 12.5, // OpenWeatherMap doesn't easily give 30-day historical for free, so we mock the baseline
        soilMoisture: 35,
        droughtDays: 12, // Baseline
        droughtThreshold: 40,
        message: 'Weather within normal parameters.'
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error.message);
    // Fallback if API fails
    res.json({
      status: 'HEALTHY',
      triggerReached: false,
      data: {
        temp: 38,
        humidity: 25,
        rainfall30Days: 15.0,
        soilMoisture: 30,
        droughtDays: 10,
        droughtThreshold: 40,
        message: 'Fallback healthy data.'
      }
    });
  }
});

// The magic endpoint for the live pitch
app.post('/api/simulate-trigger', (req, res) => {
  simulationMode = true;
  res.json({ success: true, message: 'Simulation activated. Drought parameters triggered.' });
});

// To reset the demo
app.post('/api/reset-simulation', (req, res) => {
  simulationMode = false;
  res.json({ success: true, message: 'Simulation reset. Back to real API data.' });
});

app.listen(PORT, () => {
  console.log(`Fasal Suraksha Oracle Backend running on http://localhost:${PORT}`);
  console.log(`Simulation Mode is: ${simulationMode ? 'ON' : 'OFF'}`);
});
