import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Get API URL from environment variable
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // Ensure it ends with /api if not already
    return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Configure axios defaults
  axios.defaults.baseURL = API_URL
  
  // Log API URL for debugging (remove in production if needed)
  console.log('API URL:', API_URL);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await axios.get('/auth/me')
      setUser(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching user:', err)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setUser(null)
      setError(err.response?.data?.message || 'Failed to fetch user')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password, role) => {
    try {
      setError(null)
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
        role,
      })

      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await axios.post('/auth/login', {
        email,
        password,
      })

      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    fetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

