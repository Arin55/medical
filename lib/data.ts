// Dummy data for the application

export interface Doctor {
  id: string
  name: string
  degree: string
  specialty: string
  experience: number
  rating: number
  fees: number
  location: string
  image: string
  availableSlots: string[]
}

export interface Medicine {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
}

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  patientName: string
  phone: string
  symptoms: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface Order {
  id: string
  medicines: { id: string; name: string; quantity: number; price: number }[]
  total: number
  address: string
  phone: string
  paymentMethod: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  date: string
}

export interface Report {
  id: string
  name: string
  type: string
  date: string
  file: string
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    degree: 'MBBS, MD - Cardiology',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    fees: 1500,
    location: 'New York',
    image: '👩‍⚕️',
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    degree: 'MBBS, MS - Orthopedics',
    specialty: 'Orthopedic Surgeon',
    experience: 12,
    rating: 4.9,
    fees: 2000,
    location: 'Los Angeles',
    image: '👨‍⚕️',
    availableSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '04:00 PM', '05:00 PM']
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    degree: 'MBBS, MD - Pediatrics',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.7,
    fees: 1200,
    location: 'Chicago',
    image: '👩‍⚕️',
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    degree: 'MBBS, MD - Neurology',
    specialty: 'Neurologist',
    experience: 18,
    rating: 4.9,
    fees: 1800,
    location: 'Boston',
    image: '👨‍⚕️',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    degree: 'MBBS, MD - Dermatology',
    specialty: 'Dermatologist',
    experience: 8,
    rating: 4.6,
    fees: 1300,
    location: 'Miami',
    image: '👩‍⚕️',
    availableSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM']
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    degree: 'MBBS, MS - General Surgery',
    specialty: 'General Surgeon',
    experience: 20,
    rating: 4.8,
    fees: 2500,
    location: 'Houston',
    image: '👨‍⚕️',
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  }
]

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Pain reliever and fever reducer',
    price: 50,
    stock: 100,
    image: '💊',
    category: 'Pain Relief'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    description: 'Antibiotic for bacterial infections',
    price: 120,
    stock: 75,
    image: '💊',
    category: 'Antibiotic'
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain reliever',
    price: 80,
    stock: 90,
    image: '💊',
    category: 'Pain Relief'
  },
  {
    id: '4',
    name: 'Cetirizine 10mg',
    description: 'Antihistamine for allergies',
    price: 60,
    stock: 85,
    image: '💊',
    category: 'Allergy'
  },
  {
    id: '5',
    name: 'Omeprazole 20mg',
    description: 'Acid reducer for stomach issues',
    price: 100,
    stock: 70,
    image: '💊',
    category: 'Digestive'
  },
  {
    id: '6',
    name: 'Metformin 500mg',
    description: 'Diabetes medication',
    price: 90,
    stock: 60,
    image: '💊',
    category: 'Diabetes'
  }
]

