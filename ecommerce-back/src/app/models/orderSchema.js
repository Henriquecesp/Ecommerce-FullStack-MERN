const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

const CartItemSchema = new Schema(
  {
    product: { type: ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
)

const CartItem = mongoose.model('CartItem', CartItemSchema)

const OrderSchema = new Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: 'Not processed',
      enum: [
        'Not processed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ], // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, CartItem }
