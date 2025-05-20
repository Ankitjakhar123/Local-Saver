import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  vendor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  deliveryTime: {
    type: String
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  unit: {
    type: String,
    default: 'kg'
  },
  packSize: {
    type: String
  },
  currentPrices: [{
    vendor: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    deliveryTime: {
      type: String
    },
    url: {
      type: String
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  priceHistory: [priceHistorySchema],
  searchCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for querying products by name and category
productSchema.index({ name: 1, category: 1 });

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;