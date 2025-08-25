import express from 'express';
import Plant from '../models/Plant.js';

const router = express.Router();

/**
 * GET /api/plants
 * Query params:
 *  - search: case-insensitive search by name or category keyword
 *  - category: exact category filter (case-insensitive)
 *  - inStock: 'yes' | 'no' (optional)
 */
router.get('/', async (req, res, next) => {
  try {
    const { search = '', category = '', inStock = '' } = req.query;

    const filter = {};

    // inStock filter
    if (inStock && ['yes','no'].includes((inStock || '').toLowerCase())) {
      filter.inStock = (inStock.toLowerCase() === 'yes');
    }

    // category exact match (case-insensitive)
    if (category && category.trim()) {
      filter.categories = { $elemMatch: { $regex: `^${category.trim()}$`, $options: 'i' } };
    }

    // search by name or category keyword (case-insensitive)
    if (search && search.trim()) {
      const s = search.trim();
      filter.$or = [
        { name: { $regex: s, $options: 'i' } },
        { categories: { $elemMatch: { $regex: s, $options: 'i' } } }
      ];
    }

    const plants = await Plant.find(filter).sort({ name: 1 }).lean();
    res.json({ count: plants.length, plants });
  } catch (e) {
    next(e);
  }
});

/**
 * GET /api/plants/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id).lean();
    if (!plant) return res.status(404).json({ error: 'Plant not found' });
    res.json(plant);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /api/plants
 * Body: { name, price, categories (array|string), inStock (boolean) }
 */
router.post('/', async (req, res, next) => {
  try {
    let { name, price, categories, inStock } = req.body;

    // Basic validation
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number' });
    }

    // categories can arrive as comma-separated string
    let categoryArr = [];
    if (Array.isArray(categories)) {
      categoryArr = categories;
    } else if (typeof categories === 'string') {
      categoryArr = categories.split(',').map(c => c.trim()).filter(Boolean);
    }
    if (!categoryArr.length) {
      return res.status(400).json({ error: 'At least one category is required' });
    }

    const doc = await Plant.create({
      name: String(name).trim(),
      price: parsedPrice,
      categories: categoryArr,
      inStock: Boolean(inStock)
    });
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

export default router;
