import Link from 'next/link'
import { Doctor } from '@/lib/data'
import { FaStar, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa'

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="text-6xl">{doctor.image}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
          <p className="text-gray-600 mb-2">{doctor.degree}</p>
          <p className="text-medical-blue font-semibold mb-3">{doctor.specialty}</p>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {doctor.rating}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt /> {doctor.location}
            </span>
            <span className="flex items-center gap-1">
              <FaRupeeSign /> {doctor.fees}
            </span>
            <span>{doctor.experience} years exp.</span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Available Slots:</p>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.slice(0, 3).map((slot, idx) => (
                <span key={idx} className="px-2 py-1 bg-medical-lightBlue text-medical-blue rounded text-xs">
                  {slot}
                </span>
              ))}
              {doctor.availableSlots.length > 3 && (
                <span className="px-2 py-1 text-gray-500 text-xs">
                  +{doctor.availableSlots.length - 3} more
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/doctors/${doctor.id}`}
            className="btn-primary w-full text-center block"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

