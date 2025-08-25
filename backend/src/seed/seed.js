import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Plant from '../models/Plant.js';

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urvann';

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    const plantsPath = path.join(__dirname, 'plants.json');
    const raw = fs.readFileSync(plantsPath, 'utf-8');
    const data = JSON.parse(raw);

    await Plant.deleteMany({});
    await Plant.insertMany(data);
    console.log(`Seeded ${data.length} plants.`);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
