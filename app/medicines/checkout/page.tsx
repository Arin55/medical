'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { medicines, Medicine } from '@/lib/data'
import { getCurrentUser } from '@/lib/auth'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<{ medicine: Medicine; quantity: number }[]>([])
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [orderId, setOrderId] = useState('')
  const user = getCurrentUser()

  useEffect(() => {
    // Load cart from localStorage (in a real app, this would be in a context or state management)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (newCart: { medicine: Medicine; quantity: number }[]) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateQuantity = (medicineId: string, change: number) => {
    const newCart = cart.map(item => {
      if (item.medicine.id === medicineId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    updateCart(newCart)
  }

  const removeFromCart = (medicineId: string) => {
    const newCart = cart.filter(item => item.medicine.id !== medicineId)
    updateCart(newCart)
  }

  const total = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      if (confirm('Please login to place an order. Redirect to login page?')) {
        router.push('/login')
      }
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    // Generate order ID
    const id = 'ORD-' + Date.now()
    setOrderId(id)

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({
      id,
      userId: user.id,
      medicines: cart.map(item => ({
        id: item.medicine.id,
        name: item.medicine.name,
        quantity: item.quantity,
        price: item.medicine.price
      })),
      total,
      address,
      phone,
      paymentMethod,
      status: 'pending',
      date: new Date().toISOString()
    })
    localStorage.setItem('orders', JSON.stringify(orders))

    // Clear cart
    updateCart([])
    localStorage.removeItem('cart')

    alert(`Order placed successfully! Your Order ID is: ${id}`)
  }

  if (orderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold text-xl">Order Placed Successfully!</p>
            <p className="mt-2">Your Order ID: <span className="font-mono font-bold text-2xl">{orderId}</span></p>
          </div>
          <p className="text-gray-600 mb-6">We will process your order and deliver it to your address soon.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty!</p>
        <button onClick={() => router.push('/medicines')} className="btn-primary">
          Browse Medicines
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-field"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="input-field"
                required
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full">
              Place Order
            </button>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.medicine.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{item.medicine.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.medicine.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.medicine.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.medicine.id, -1)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.medicine.id, 1)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="font-semibold">₹{item.medicine.price * item.quantity}</div>
                <button
                  onClick={() => removeFromCart(item.medicine.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-medical-blue">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

