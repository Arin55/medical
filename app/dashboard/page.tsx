'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { FaCalendarCheck, FaShoppingCart, FaFileMedical, FaUser, FaEdit } from 'react-icons/fa'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setProfile({ name: currentUser.name, email: currentUser.email, phone: '' })

    // Load data from localStorage
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const savedReports = JSON.parse(localStorage.getItem('reports') || '[]')

    // Filter by current user
    setAppointments(savedAppointments.filter((apt: any) => apt.userId === currentUser.id))
    setOrders(savedOrders.filter((ord: any) => ord.userId === currentUser.id))
    setReports(savedReports.filter((rpt: any) => rpt.userId === currentUser.id))
  }, [router])

  if (!user) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'appointments'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaCalendarCheck className="inline mr-2" /> My Appointments
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaShoppingCart className="inline mr-2" /> My Orders
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'reports'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaFileMedical className="inline mr-2" /> My Reports
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-medical-blue text-medical-blue'
              : 'border-transparent text-gray-600 hover:text-medical-blue'
          }`}
        >
          <FaUser className="inline mr-2" /> Edit Profile
        </button>
      </div>

      {/* Content */}
      <div className="card">
        {activeTab === 'appointments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-500">No appointments found. <a href="/doctors" className="text-medical-blue hover:underline">Book one now!</a></p>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt: any) => (
                  <div key={apt.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
                        <p className="text-gray-600">Date: {apt.date}</p>
                        <p className="text-gray-600">Time: {apt.time}</p>
                        <p className="text-gray-600">Symptoms: {apt.symptoms}</p>
                        <p className="text-sm mt-2">
                          <span className={`px-2 py-1 rounded ${
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {apt.status}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">ID: {apt.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found. <a href="/medicines" className="text-medical-blue hover:underline">Order medicines now!</a></p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p className="text-gray-600">Address: {order.address}</p>
                        <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-medical-blue">₹{order.total}</p>
                        <p className={`text-sm mt-2 px-2 py-1 rounded inline-block ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Medicines:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {order.medicines.map((med: any, idx: number) => (
                          <li key={idx}>{med.name} x{med.quantity} - ₹{med.price * med.quantity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h2>
            <a href="/reports" className="btn-primary mb-6 inline-block">
              Upload New Report
            </a>
            {reports.length === 0 ? (
              <p className="text-gray-500">No reports found. Upload your first report!</p>
            ) : (
              <div className="space-y-4">
                {reports.map((report: any) => (
                  <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">{report.name}</h3>
                    <p className="text-gray-600">Type: {report.type}</p>
                    <p className="text-gray-600">Date: {new Date(report.date).toLocaleDateString()}</p>
                    <a href={report.file} target="_blank" rel="noopener noreferrer" className="text-medical-blue hover:underline text-sm">
                      View Report
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input-field"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  // Save profile (in production, save to database)
                  alert('Profile updated successfully!')
                }}
                className="btn-primary"
              >
                <FaEdit className="inline mr-2" /> Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

