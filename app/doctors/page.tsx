'use client'

import { useState, useMemo } from 'react'
import { doctors, Doctor } from '@/lib/data'
import DoctorCard from '@/components/DoctorCard'
import { FaSearch, FaFilter } from 'react-icons/fa'

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [minExperience, setMinExperience] = useState('')
  const [maxFees, setMaxFees] = useState('')

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)))
  const locations = Array.from(new Set(doctors.map(d => d.location)))

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty
      const matchesLocation = !selectedLocation || doctor.location === selectedLocation
      const matchesExperience = !minExperience || doctor.experience >= parseInt(minExperience)
      const matchesFees = !maxFees || doctor.fees <= parseInt(maxFees)

      return matchesSearch && matchesSpecialty && matchesLocation && matchesExperience && matchesFees
    })
  }, [searchTerm, selectedSpecialty, selectedLocation, minExperience, maxFees])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Find Your Doctor</h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-blue"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaFilter className="inline mr-1" /> Specialty
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="input-field"
            >
              <option value="">All Specialties</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-field"
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Experience</label>
            <input
              type="number"
              placeholder="Years"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Fees</label>
            <input
              type="number"
              placeholder="₹"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found <span className="font-bold text-medical-blue">{filteredDoctors.length}</span> doctors
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

