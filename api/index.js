import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Since Vercel handles CORS in production, we still enable it for local dev or external requests.
app.use(cors());
app.use(express.json());

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
let simulationType = null; // 'drought', 'heatwave', 'flood'
let globalDroughtThreshold = 40; // days
let globalHeatwaveThreshold = 45; // Celsius
let globalFloodThreshold = 200; // mm

app.get('/api/weather/:farmId', async (req, res) => {
  const farm = farms[req.params.farmId] || farms['plot-2'];

  const currentNormal = {
    temp: 38,
    humidity: 25,
    rainfall30Days: 15.0,
    soilMoisture: 30,
    droughtDays: 12
  };

  const currentDisaster = {
    drought: { temp: 48, humidity: 8, rainfall30Days: 0, soilMoisture: 4, droughtDays: 45 },
    heatwave: { temp: 49, humidity: 15, rainfall30Days: 5, soilMoisture: 10, droughtDays: 20 },
    flood: { temp: 28, humidity: 95, rainfall30Days: 250, soilMoisture: 100, droughtDays: 0 }
  };

  if (simulationMode && simulationType && currentDisaster[simulationType]) {
    const data = currentDisaster[simulationType];
    return res.json({
      status: 'CRITICAL',
      triggerReached: true,
      triggerType: simulationType,
      data: {
        ...data,
        droughtThreshold: globalDroughtThreshold,
        heatwaveThreshold: globalHeatwaveThreshold,
        floodThreshold: globalFloodThreshold,
        message: `${simulationType.toUpperCase()} parameter breached! Payout triggered.`
      }
    });
  }

  // 🌍 NORMAL MODE (Real API Data if available)
  let weatherData = null;
  try {
    if (OPENWEATHER_API_KEY) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${farm.lat}&lon=${farm.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const response = await axios.get(url);
      weatherData = response.data;
    }
  } catch (err) {
    console.error('Weather API Error:', err.message);
  }

  const temp = weatherData ? Math.round(weatherData.main.temp) : currentNormal.temp;
  const humidity = weatherData ? weatherData.main.humidity : currentNormal.humidity;

  const isDrought = currentNormal.droughtDays >= globalDroughtThreshold;
  const isHeatwave = temp >= globalHeatwaveThreshold;
  const isFlood = currentNormal.rainfall30Days >= globalFloodThreshold;
  
  const isBreached = isDrought || isHeatwave || isFlood;
  let breachMessage = 'Weather within normal parameters.';
  if (isDrought) breachMessage = 'Drought threshold breached via admin override!';
  if (isHeatwave) breachMessage = 'Heatwave threshold breached via admin override!';
  if (isFlood) breachMessage = 'Flood threshold breached via admin override!';

  res.json({
    status: isBreached ? 'CRITICAL' : 'HEALTHY',
    triggerReached: isBreached,
    triggerType: isDrought ? 'drought' : (isHeatwave ? 'heatwave' : (isFlood ? 'flood' : null)),
    data: {
      temp,
      humidity,
      rainfall30Days: currentNormal.rainfall30Days,
      soilMoisture: currentNormal.soilMoisture,
      droughtDays: currentNormal.droughtDays,
      droughtThreshold: globalDroughtThreshold,
      heatwaveThreshold: globalHeatwaveThreshold,
      floodThreshold: globalFloodThreshold,
      message: breachMessage
    }
  });
});

app.post('/api/simulate-trigger', (req, res) => {
  const { type } = req.body; // 'drought', 'heatwave', 'flood'
  simulationMode = true;
  simulationType = type || 'drought';
  res.json({ success: true, message: `Simulation activated: ${simulationType}` });
});

app.post('/api/reset-simulation', (req, res) => {
  simulationMode = false;
  simulationType = null;
  res.json({ success: true, message: 'Simulation reset. Back to real API data.' });
});

// Admin endpoints to modify thresholds
app.post('/api/settings/threshold', (req, res) => {
  const { drought, heatwave, flood } = req.body;
  if (drought !== undefined) globalDroughtThreshold = Number(drought);
  if (heatwave !== undefined) globalHeatwaveThreshold = Number(heatwave);
  if (flood !== undefined) globalFloodThreshold = Number(flood);
  res.json({ success: true, message: `Thresholds updated.` });
});

export default app;
