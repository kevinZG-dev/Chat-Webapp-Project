import  { createContext } from 'react'

export const Context = createContext();

export default createContext({
    user: null,
    setUser: value => {}
})