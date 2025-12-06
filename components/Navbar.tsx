'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaUser, FaSignOutAlt, FaHome, FaUserMd, FaPills, FaFileMedical, FaCog } from 'react-icons/fa'
import { getCurrentUser, logout } from '@/lib/auth'

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-medical-blue">🏥 MediCare</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-medical-blue' : 'text-gray-700 hover:text-medical-blue'
              }`}
            >
              <FaHome className="inline mr-1" /> Home
            </Link>
            <Link
              href="/doctors"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/doctors') ? 'text-medical-blue' : 'text-gray-700 hover:text-medical-blue'
              }`}
            >
              <FaUserMd className="inline mr-1" /> Doctors
            </Link>
            <Link
              href="/medicines"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/medicines') ? 'text-medical-blue' : 'text-gray-700 hover:text-medical-blue'
              }`}
            >
              <FaPills className="inline mr-1" /> Medicines
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard') ? 'text-medical-blue' : 'text-gray-700 hover:text-medical-blue'
                }`}
              >
                <FaFileMedical className="inline mr-1" /> Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin') ? 'text-medical-blue' : 'text-gray-700 hover:text-medical-blue'
                }`}
              >
                <FaCog className="inline mr-1" /> Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  <FaUser className="inline mr-1" /> {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm py-2 px-4">
                <FaUser className="inline mr-1" /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-medical-blue"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-medical-lightBlue">
              <FaHome className="inline mr-2" /> Home
            </Link>
            <Link href="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-medical-lightBlue">
              <FaUserMd className="inline mr-2" /> Doctors
            </Link>
            <Link href="/medicines" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-medical-lightBlue">
              <FaPills className="inline mr-2" /> Medicines
            </Link>
            {user && (
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-medical-lightBlue">
                <FaFileMedical className="inline mr-2" /> Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-medical-lightBlue">
                <FaCog className="inline mr-2" /> Admin
              </Link>
            )}
            {user ? (
              <div className="px-3 py-2">
                <span className="text-sm text-gray-700 block mb-2">
                  <FaUser className="inline mr-2" /> {user.name}
                </span>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4 w-full">
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="block px-3 py-2 btn-primary text-center">
                <FaUser className="inline mr-1" /> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

