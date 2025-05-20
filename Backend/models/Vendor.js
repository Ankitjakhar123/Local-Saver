import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: {
      type: String,
      required: true
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  serviceablePincodes: [{
    type: String
  }],
  products: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: 'kg'
    },
    packSize: String,
    inStock: {
      type: Boolean,
      default: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: false
    }
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

// Update the updatedAt timestamp before saving
vendorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;