import { createContext, useContext, useState, useEffect } from 'react'

const DevVaultAuthContext = createContext()

export const DevVaultAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('devvaultUser')
    return stored ? JSON.parse(stored) : null
  })

  const logIn = async (email, password) => {
    const res = await fetch('/.redwood/functions/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const user = await res.json()
      localStorage.setItem('devvaultUser', JSON.stringify(user))
      setUser(user)
    } else {
      throw new Error('Login failed')
    }
  }

  const signUp = async (email, password) => {
    const res = await fetch('/.redwood/functions/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const user = await res.json()
      localStorage.setItem('devvaultUser', JSON.stringify(user))
      setUser(user)
    } else {
      throw new Error('Signup failed')
    }
  }

  const logOut = () => {
    localStorage.removeItem('devvaultUser')
    setUser(null)
  }

  return (
    <DevVaultAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </DevVaultAuthContext.Provider>
  )
}

export const useDevVaultAuth = () => useContext(DevVaultAuthContext)
