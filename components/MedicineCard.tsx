import { Medicine } from '@/lib/data'
import { FaShoppingCart } from 'react-icons/fa'

interface MedicineCardProps {
  medicine: Medicine
  onAddToCart: (medicine: Medicine) => void
}

export default function MedicineCard({ medicine, onAddToCart }: MedicineCardProps) {
  return (
    <div className="card">
      <div className="text-center">
        <div className="text-6xl mb-4">{medicine.image}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{medicine.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{medicine.description}</p>
        <p className="text-medical-blue font-semibold mb-2">{medicine.category}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-800">₹{medicine.price}</span>
          <span className={`text-sm ${medicine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {medicine.stock > 0 ? `In Stock (${medicine.stock})` : 'Out of Stock'}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(medicine)}
          disabled={medicine.stock === 0}
          className={`btn-primary w-full flex items-center justify-center gap-2 ${
            medicine.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  )
}

