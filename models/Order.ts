import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  medicines: [{
    id: String,
    name: String,
    quantity: Number,
    price: Number,
  }],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)

