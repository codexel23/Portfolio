import { createContext, useContext, useState, useEffect } from 'react'

const DevVaultAuthContext = createContext()

export const DevVaultAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('devvaultUser')
    return stored ? JSON.parse(stored) : null
  })

  const logIn = async (username, password) => {
    const res = await fetch('/.redwood/functions/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      const user = await res.json()
      localStorage.setItem('devvaultUser', JSON.stringify(user))
      setUser(user)
    } else {
      throw new Error('Login failed')
    }
  }

  const signUp = async (username, password) => {
    const res = await fetch('/.redwood/functions/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
