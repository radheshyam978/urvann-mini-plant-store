import express from 'express';
import Plant from '../models/Plant.js';

const router = express.Router();

/**
 * GET /api/categories
 * Returns distinct categories sorted alphabetically
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await Plant.distinct('categories');
    categories.sort((a, b) => a.localeCompare(b));
    res.json({ count: categories.length, categories });
  } catch (e) {
    next(e);
  }
});

export default router;
