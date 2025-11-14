import express from 'express';
import Item from '../models/Item.js';
import { protect } from '../middleware/auth.js';
import { validate, itemSchema } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/items
// @desc    Get items with search and pagination
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Build query - Users see only their items, Admins see all items
    let query = {};
    if (req.user.role !== 'Admin') {
      query.user = req.user._id;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Item.countDocuments(query);

    res.json({
      items,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // Users can only access their own items
    if (req.user.role !== 'Admin') {
      query.user = req.user._id;
    }

    const item = await Item.findOne(query).populate('user', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.post('/', validate(itemSchema), async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      user: req.user._id,
    });

    const populatedItem = await Item.findById(item._id).populate('user', 'name email');

    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', validate(itemSchema), async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // Users can only update their own items
    if (req.user.role !== 'Admin') {
      query.user = req.user._id;
    }

    const item = await Item.findOneAndUpdate(
      query,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    let query = { _id: req.params.id };
    
    // Users can only delete their own items
    if (req.user.role !== 'Admin') {
      query.user = req.user._id;
    }

    const item = await Item.findOneAndDelete(query);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

