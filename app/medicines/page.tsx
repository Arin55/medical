'use client'

import { useState, useMemo, useEffect } from 'react'
import { medicines, Medicine } from '@/lib/data'
import MedicineCard from '@/components/MedicineCard'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<{ medicine: Medicine; quantity: number }[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = Array.from(new Set(medicines.map(m => m.category)))

  const filteredMedicines = useMemo(() => {
    return medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || medicine.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleAddToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.medicine.id === medicine.id)
    let newCart
    if (existingItem) {
      newCart = cart.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...cart, { medicine, quantity: 1 }]
    }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    alert(`${medicine.name} added to cart!`)
  }

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const cartTotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Order Medicines</h1>
        {cart.length > 0 && (
          <Link
            href="/medicines/checkout"
            className="btn-primary flex items-center gap-2"
          >
            <FaShoppingCart /> Cart ({cartCount}) - ₹{cartTotal}
          </Link>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-blue"
            />
          </div>
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found <span className="font-bold text-medical-blue">{filteredMedicines.length}</span> medicines
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map(medicine => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No medicines found matching your search.</p>
        </div>
      )}
    </div>
  )
}

