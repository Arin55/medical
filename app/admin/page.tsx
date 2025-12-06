'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin, getCurrentUser } from '@/lib/auth'
import { doctors, medicines, Doctor, Medicine } from '@/lib/data'
import { FaUserMd, FaPills, FaCalendarCheck, FaShoppingCart, FaUsers, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('doctors')
  const [adminDoctors, setAdminDoctors] = useState<Doctor[]>([])
  const [adminMedicines, setAdminMedicines] = useState<Medicine[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  // Form states
  const [showDoctorForm, setShowDoctorForm] = useState(false)
  const [showMedicineForm, setShowMedicineForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)

  // Doctor form fields
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    degree: '',
    specialty: '',
    experience: '',
    rating: '',
    fees: '',
    location: '',
    availableSlots: ''
  })

  // Medicine form fields
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    if (!isAdmin()) {
      router.push('/dashboard')
      return
    }
    setUser(currentUser)

    // Load data
    setAdminDoctors(doctors)
    setAdminMedicines(medicines)
    
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    setAppointments(savedAppointments)
    setOrders(savedOrders)
    setUsers(savedUsers.length > 0 ? savedUsers : [
      { id: '1', email: 'user@example.com', name: 'John Doe', role: 'user' },
      { id: '2', email: 'admin@example.com', name: 'Admin User', role: 'admin' }
    ])
  }, [router])

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const slots = doctorForm.availableSlots.split(',').map(s => s.trim())
    
    if (editingDoctor) {
      // Update doctor
      const updated = adminDoctors.map(d =>
        d.id === editingDoctor.id
          ? {
              ...d,
              ...doctorForm,
              experience: parseInt(doctorForm.experience),
              rating: parseFloat(doctorForm.rating),
              fees: parseInt(doctorForm.fees),
              availableSlots: slots
            }
          : d
      )
      setAdminDoctors(updated)
      alert('Doctor updated successfully!')
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        id: Date.now().toString(),
        ...doctorForm,
        experience: parseInt(doctorForm.experience),
        rating: parseFloat(doctorForm.rating),
        fees: parseInt(doctorForm.fees),
        availableSlots: slots,
        image: '👨‍⚕️'
      }
      setAdminDoctors([...adminDoctors, newDoctor])
      alert('Doctor added successfully!')
    }
    
    setShowDoctorForm(false)
    setEditingDoctor(null)
    setDoctorForm({
      name: '',
      degree: '',
      specialty: '',
      experience: '',
      rating: '',
      fees: '',
      location: '',
      availableSlots: ''
    })
  }

  const handleMedicineSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingMedicine) {
      // Update medicine
      const updated = adminMedicines.map(m =>
        m.id === editingMedicine.id
          ? {
              ...m,
              ...medicineForm,
              price: parseInt(medicineForm.price),
              stock: parseInt(medicineForm.stock)
            }
          : m
      )
      setAdminMedicines(updated)
      alert('Medicine updated successfully!')
    } else {
      // Add new medicine
      const newMedicine: Medicine = {
        id: Date.now().toString(),
        ...medicineForm,
        price: parseInt(medicineForm.price),
        stock: parseInt(medicineForm.stock),
        image: '💊'
      }
      setAdminMedicines([...adminMedicines, newMedicine])
      alert('Medicine added successfully!')
    }
    
    setShowMedicineForm(false)
    setEditingMedicine(null)
    setMedicineForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: ''
    })
  }

  const deleteDoctor = (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      setAdminDoctors(adminDoctors.filter(d => d.id !== id))
      alert('Doctor deleted successfully!')
    }
  }

  const deleteMedicine = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setAdminMedicines(adminMedicines.filter(m => m.id !== id))
      alert('Medicine deleted successfully!')
    }
  }

  const editDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setDoctorForm({
      name: doctor.name,
      degree: doctor.degree,
      specialty: doctor.specialty,
      experience: doctor.experience.toString(),
      rating: doctor.rating.toString(),
      fees: doctor.fees.toString(),
      location: doctor.location,
      availableSlots: doctor.availableSlots.join(', ')
    })
    setShowDoctorForm(true)
  }

  const editMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    setMedicineForm({
      name: medicine.name,
      description: medicine.description,
      price: medicine.price.toString(),
      stock: medicine.stock.toString(),
      category: medicine.category
    })
    setShowMedicineForm(true)
  }

  if (!user || !isAdmin()) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'doctors'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaUserMd className="inline mr-2" /> Doctors
        </button>
        <button
          onClick={() => setActiveTab('medicines')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'medicines'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaPills className="inline mr-2" /> Medicines
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'appointments'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaCalendarCheck className="inline mr-2" /> Appointments
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaShoppingCart className="inline mr-2" /> Orders
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'users'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaUsers className="inline mr-2" /> Users
        </button>
      </div>

      {/* Content */}
      {activeTab === 'doctors' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>
            <button
              onClick={() => {
                setEditingDoctor(null)
                setDoctorForm({
                  name: '',
                  degree: '',
                  specialty: '',
                  experience: '',
                  rating: '',
                  fees: '',
                  location: '',
                  availableSlots: ''
                })
                setShowDoctorForm(true)
              }}
              className="btn-primary"
            >
              <FaPlus className="inline mr-2" /> Add Doctor
            </button>
          </div>

          {showDoctorForm && (
            <form onSubmit={handleDoctorSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <h3 className="font-semibold">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={doctorForm.degree}
                  onChange={(e) => setDoctorForm({ ...doctorForm, degree: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Specialty"
                  value={doctorForm.specialty}
                  onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={doctorForm.location}
                  onChange={(e) => setDoctorForm({ ...doctorForm, location: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Experience (years)"
                  value={doctorForm.experience}
                  onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Rating (0-5)"
                  step="0.1"
                  value={doctorForm.rating}
                  onChange={(e) => setDoctorForm({ ...doctorForm, rating: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Fees"
                  value={doctorForm.fees}
                  onChange={(e) => setDoctorForm({ ...doctorForm, fees: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Available Slots (comma separated)"
                  value={doctorForm.availableSlots}
                  onChange={(e) => setDoctorForm({ ...doctorForm, availableSlots: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Save</button>
                <button
                  type="button"
                  onClick={() => setShowDoctorForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminDoctors.map(doctor => (
              <div key={doctor.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editDoctor(doctor)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteDoctor(doctor.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{doctor.degree}</p>
                <p className="text-sm text-gray-600">₹{doctor.fees} • {doctor.experience} years</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'medicines' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Medicines</h2>
            <button
              onClick={() => {
                setEditingMedicine(null)
                setMedicineForm({
                  name: '',
                  description: '',
                  price: '',
                  stock: '',
                  category: ''
                })
                setShowMedicineForm(true)
              }}
              className="btn-primary"
            >
              <FaPlus className="inline mr-2" /> Add Medicine
            </button>
          </div>

          {showMedicineForm && (
            <form onSubmit={handleMedicineSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <h3 className="font-semibold">{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h3>
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineForm.name}
                onChange={(e) => setMedicineForm({ ...medicineForm, name: e.target.value })}
                className="input-field"
                required
              />
              <textarea
                placeholder="Description"
                value={medicineForm.description}
                onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })}
                className="input-field"
                required
              />
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={medicineForm.price}
                  onChange={(e) => setMedicineForm({ ...medicineForm, price: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={medicineForm.stock}
                  onChange={(e) => setMedicineForm({ ...medicineForm, stock: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={medicineForm.category}
                  onChange={(e) => setMedicineForm({ ...medicineForm, category: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Save</button>
                <button
                  type="button"
                  onClick={() => setShowMedicineForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminMedicines.map(medicine => (
              <div key={medicine.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">{medicine.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editMedicine(medicine)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteMedicine(medicine.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                <p className="text-sm font-semibold">₹{medicine.price} • Stock: {medicine.stock}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Appointments</h2>
          <div className="space-y-4">
            {appointments.map((apt: any) => (
              <div key={apt.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{apt.doctorName}</h3>
                    <p className="text-gray-600">Patient: {apt.patientName}</p>
                    <p className="text-gray-600">Date: {apt.date} • Time: {apt.time}</p>
                    <p className="text-gray-600">Phone: {apt.phone}</p>
                    <p className="text-gray-600">Symptoms: {apt.symptoms}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">ID: {apt.id}</p>
                    <span className={`px-2 py-1 rounded text-sm ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && (
              <p className="text-gray-500">No appointments found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Address: {order.address}</p>
                    <p className="text-gray-600">Phone: {order.phone}</p>
                    <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Medicines: {order.medicines.map((m: any) => `${m.name} x${m.quantity}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-medical-blue">₹{order.total}</p>
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
          <div className="space-y-4">
            {users.map((u: any) => (
              <div key={u.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{u.name}</h3>
                    <p className="text-gray-600">{u.email}</p>
                    <span className={`px-2 py-1 rounded text-sm ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

