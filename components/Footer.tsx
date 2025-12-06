import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-medical-blue mb-4">🏥 MediCare</h3>
            <p className="text-gray-400">
              Your trusted healthcare partner for appointments, medicines, and medical records.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/doctors" className="text-gray-400 hover:text-white">Find Doctors</Link></li>
              <li><Link href="/medicines" className="text-gray-400 hover:text-white">Order Medicines</Link></li>
              <li><Link href="/reports" className="text-gray-400 hover:text-white">Medical Reports</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white">Login / Signup</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/doctors" className="text-gray-400 hover:text-white">Book Appointment</Link></li>
              <li><Link href="/medicines" className="text-gray-400 hover:text-white">Medicine Delivery</Link></li>
              <li><Link href="/reports" className="text-gray-400 hover:text-white">Health Records</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Patient Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
            </div>
            <p className="text-gray-400 text-sm">
              Email: support@medicare.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MediCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

