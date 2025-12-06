'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, setCurrentUser } from '@/lib/auth'
import { FaUser, FaLock } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      try {
        // Login via API
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        
        if (data.success) {
          setCurrentUser(data.data)
          router.push('/dashboard')
        } else {
          setError(data.error || 'Invalid email or password')
        }
      } catch (error) {
        console.error('Login error:', error)
        // Fallback to local auth
        const user = login(email, password)
        if (user) {
          router.push('/dashboard')
        } else {
          setError('Invalid email or password')
        }
      }
    } else {
      // Signup
      if (!name || !email || !password) {
        setError('Please fill all fields')
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      
      try {
        // Signup via API
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name, role: 'user' }),
        })

        const data = await response.json()
        
        if (data.success) {
          setCurrentUser(data.data)
          router.push('/dashboard')
        } else {
          setError(data.error || 'Failed to create account')
        }
      } catch (error) {
        console.error('Signup error:', error)
        // Fallback to local signup
        const newUser = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user' as const
        }
        setCurrentUser(newUser)
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-lightBlue px-4 py-12">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              {isLogin ? 'Login' : 'Sign Up'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-2 rounded-lg font-medium ${
                isLogin
                  ? 'bg-medical-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-2 rounded-lg font-medium ${
                !isLogin
                  ? 'bg-medical-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-12"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-sm text-gray-600 mb-4">
                <p>Demo credentials:</p>
                <p>User: user@example.com / password123</p>
                <p>Admin: admin@example.com / admin123</p>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

