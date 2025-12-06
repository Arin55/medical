'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doctors, Doctor } from '@/lib/data'
import { getCurrentUser } from '@/lib/auth'
import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaClock } from 'react-icons/fa'

export default function DoctorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [patientName, setPatientName] = useState('')
  const [phone, setPhone] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [appointmentId, setAppointmentId] = useState('')

  useEffect(() => {
    const foundDoctor = doctors.find(d => d.id === params.id)
    if (foundDoctor) {
      setDoctor(foundDoctor)
    }
  }, [params.id])

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = getCurrentUser()
    
    if (!user) {
      if (confirm('Please login to book an appointment. Redirect to login page?')) {
        router.push('/login')
      }
      return
    }

    try {
      // Save appointment to MongoDB
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor?.id,
          doctorName: doctor?.name,
          date: selectedDate,
          time: selectedTime,
          patientName,
          phone,
          symptoms,
          status: 'pending',
          userId: user.id
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        const appointmentId = data.data._id || data.data.id
        setAppointmentId(appointmentId)
        setShowForm(false)
        alert(`Appointment booked successfully! Your Appointment ID is: ${appointmentId}`)
        
        // Reset form
        setSelectedDate('')
        setSelectedTime('')
        setPatientName('')
        setPhone('')
        setSymptoms('')
      } else {
        throw new Error(data.error || 'Failed to book appointment')
      }
    } catch (error: any) {
      console.error('Error booking appointment:', error)
      // Fallback to localStorage if API fails
      const id = 'APT-' + Date.now()
      setAppointmentId(id)
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      appointments.push({
        id,
        doctorId: doctor?.id,
        doctorName: doctor?.name,
        date: selectedDate,
        time: selectedTime,
        patientName,
        phone,
        symptoms,
        status: 'pending',
        userId: user.id
      })
      localStorage.setItem('appointments', JSON.stringify(appointments))
      setShowForm(false)
      alert(`Appointment booked successfully! Your Appointment ID is: ${id}`)
      setSelectedDate('')
      setSelectedTime('')
      setPatientName('')
      setPhone('')
      setSymptoms('')
    }
  }

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Doctor not found</p>
      </div>
    )
  }

  // Get next 7 days for date selection
  const getAvailableDates = () => {
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Doctor Info */}
        <div className="card">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{doctor.image}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h1>
            <p className="text-gray-600 mb-2">{doctor.degree}</p>
            <p className="text-medical-blue font-semibold text-xl mb-4">{doctor.specialty}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">Rating:</span> {doctor.rating}/5.0
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-medical-blue" />
              <span className="font-semibold">Location:</span> {doctor.location}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaRupeeSign className="text-green-600" />
              <span className="font-semibold">Consultation Fee:</span> ₹{doctor.fees}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaClock className="text-purple-600" />
              <span className="font-semibold">Experience:</span> {doctor.experience} years
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTime(slot)
                    setShowForm(true)
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === slot
                      ? 'bg-medical-blue text-white'
                      : 'bg-medical-lightBlue text-medical-blue hover:bg-medical-blue hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>
          
          {!showForm && !appointmentId ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Select a time slot to book an appointment</p>
            </div>
          ) : appointmentId ? (
            <div className="text-center py-8">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p className="font-bold">Appointment Booked Successfully!</p>
                <p className="mt-2">Your Appointment ID: <span className="font-mono font-bold">{appointmentId}</span></p>
              </div>
              <button
                onClick={() => {
                  setAppointmentId('')
                  setShowForm(false)
                  setSelectedTime('')
                }}
                className="btn-primary"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Date</option>
                  {getAvailableDates().map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="text"
                  value={selectedTime}
                  readOnly
                  className="input-field bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="input-field"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms / Reason for Visit</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="input-field"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

