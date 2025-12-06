import Link from 'next/link'
import { FaSearch, FaCalendarCheck, FaPills, FaFileMedical, FaStethoscope } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-darkBlue text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-xl mb-8 text-blue-100">Connect with expert doctors and manage your healthcare needs</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for doctors or medicines..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="btn-primary px-8">Search</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/doctors" className="btn-primary flex items-center gap-2">
              <FaCalendarCheck /> Book Appointment
            </Link>
            <Link href="/medicines" className="btn-secondary bg-white text-medical-blue flex items-center gap-2">
              <FaPills /> Order Medicine
            </Link>
            <Link href="/reports" className="btn-secondary bg-white text-medical-blue flex items-center gap-2">
              <FaFileMedical /> View Reports
            </Link>
            <Link href="/login" className="btn-secondary bg-white text-medical-blue flex items-center gap-2">
              Login / Signup
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl text-medical-blue mb-4 flex justify-center">
                <FaStethoscope />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Connect with qualified and experienced healthcare professionals</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl text-medical-blue mb-4 flex justify-center">
                <FaPills />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Medicine Ordering</h3>
              <p className="text-gray-600">Order your prescribed medicines with just a few clicks</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl text-medical-blue mb-4 flex justify-center">
                <FaFileMedical />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Health Records</h3>
              <p className="text-gray-600">Store and access your medical reports securely online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Book Appointment Button */}
      <Link
        href="/doctors"
        className="fixed bottom-8 right-8 bg-medical-blue text-white p-4 rounded-full shadow-lg hover:bg-medical-darkBlue transition-colors duration-200 z-50 flex items-center gap-2"
      >
        <FaCalendarCheck className="text-xl" />
        <span className="hidden sm:inline">Book Appointment</span>
      </Link>
    </div>
  )
}

