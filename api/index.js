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

// Global state for Hackathon Demo (Note: In Vercel serverless, this state might reset across cold starts, but will survive during active demo usage)
let simulationMode = false;
let globalDroughtThreshold = 40; // Default drought threshold is 40 days

app.get('/api/weather/:farmId', async (req, res) => {
  const farm = farms[req.params.farmId] || farms['plot-2'];

  // Check if current drought days (mocked as 12 for normal, 40 for disaster) breaches the dynamic threshold
  const currentDroughtDaysNormal = 12;
  const currentDroughtDaysDisaster = 40;

  if (simulationMode || currentDroughtDaysDisaster >= globalDroughtThreshold && simulationMode) {
    // 💥 DISASTER SIMULATION MODE (Hackathon override)
    return res.json({
      status: 'CRITICAL',
      triggerReached: true,
      data: {
        temp: 48,
        humidity: 8,
        rainfall30Days: 0.0,
        soilMoisture: 4,
        droughtDays: currentDroughtDaysDisaster,
        droughtThreshold: globalDroughtThreshold,
        message: 'Drought parameter breached! Payout triggered.'
      }
    });
  }

  // 🌍 NORMAL MODE (Real API Data)
  if (!OPENWEATHER_API_KEY) {
      return res.json({
        status: currentDroughtDaysNormal >= globalDroughtThreshold ? 'CRITICAL' : 'HEALTHY',
        triggerReached: currentDroughtDaysNormal >= globalDroughtThreshold,
        data: {
          temp: 38,
          humidity: 25,
          rainfall30Days: 15.0,
          soilMoisture: 30,
          droughtDays: currentDroughtDaysNormal,
          droughtThreshold: globalDroughtThreshold,
          message: currentDroughtDaysNormal >= globalDroughtThreshold ? 'Threshold breached via admin override!' : 'Fallback healthy data (No API Key).'
        }
      });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${farm.lat}&lon=${farm.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const weatherData = response.data;

    const isBreached = currentDroughtDaysNormal >= globalDroughtThreshold;

    // We mix real data with our parametric business logic
    res.json({
      status: isBreached ? 'CRITICAL' : 'HEALTHY',
      triggerReached: isBreached,
      data: {
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        rainfall30Days: 12.5, // Mock historical for baseline
        soilMoisture: 35,
        droughtDays: currentDroughtDaysNormal,
        droughtThreshold: globalDroughtThreshold,
        message: isBreached ? 'Threshold breached via admin override!' : 'Weather within normal parameters.'
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error.message);
    const isBreached = currentDroughtDaysNormal >= globalDroughtThreshold;
    // Fallback if API fails
    res.json({
      status: isBreached ? 'CRITICAL' : 'HEALTHY',
      triggerReached: isBreached,
      data: {
        temp: 38,
        humidity: 25,
        rainfall30Days: 15.0,
        soilMoisture: 30,
        droughtDays: currentDroughtDaysNormal,
        droughtThreshold: globalDroughtThreshold,
        message: isBreached ? 'Threshold breached via admin override!' : 'Fallback healthy data.'
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

// Endpoint to modify threshold for the Admin dashboard
app.post('/api/settings/threshold', (req, res) => {
  const { newThreshold } = req.body;
  if (typeof newThreshold === 'number') {
    globalDroughtThreshold = newThreshold;
    res.json({ success: true, message: `Drought threshold updated to ${newThreshold} days.` });
  } else {
    res.status(400).json({ success: false, message: 'Invalid threshold value.' });
  }
});

export default app;
