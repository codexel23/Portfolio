import { createContext, useContext, useEffect, useState } from 'react'

const DevVaultAdminContext = createContext()

export const DevVaultAdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        const adminIP = '51.37.202.185' 

        if (data.ip === adminIP) {
          setIsAdmin(true)
        }
      } catch (err) {
        console.error('Failed to fetch IP', err)
      }
    }

    fetchIP()
  }, [])

  return (
    <DevVaultAdminContext.Provider value={{ isAdmin }}>
      {children}
    </DevVaultAdminContext.Provider>
  )
}

export const useDevVaultAdmin = () => useContext(DevVaultAdminContext)
