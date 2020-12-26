import { createContext, useContext, useState } from 'react'

const UserContext = createContext({
  username: undefined,
  setUsername: undefined
})

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  )

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  const { username, setUsername } = useContext(UserContext)

  return {
    username,
    setUsername: (value) => {
      localStorage.setItem('username', value)
      setUsername(value)
    }
  }
}

export default useUserContext
