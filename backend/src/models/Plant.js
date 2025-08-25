import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: { type: [String], default: [], index: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Helpful indexes for search
PlantSchema.index({ name: 'text', categories: 'text' });

export default mongoose.model('Plant', PlantSchema);
