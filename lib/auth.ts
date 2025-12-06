// Simple authentication context (in production, use proper auth)

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

// Dummy users
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user'
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin'
  }
]

// Simple session storage (in production, use proper session management)
let currentUser: User | null = null

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  }
  return currentUser
}

export function setCurrentUser(user: User | null) {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('currentUser')
    }
  }
  currentUser = user
}

export function login(email: string, password: string): User | null {
  // Simple login (in production, use proper authentication)
  const user = users.find(u => u.email === email)
  if (user && (password === 'password123' || (email === 'admin@example.com' && password === 'admin123'))) {
    setCurrentUser(user)
    return user
  }
  return null
}

export function logout() {
  setCurrentUser(null)
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

