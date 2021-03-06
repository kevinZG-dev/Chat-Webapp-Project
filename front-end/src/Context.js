
import React, {useState} from 'react'
import { useCookies } from 'react-cookie'

const Context = React.createContext()

export default Context

export const Provider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [user, setUser] = useState(cookies.user)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [darkMode, setDarkmode] = useState(true)
  return (
    <Context.Provider value={{
      oauth: oauth,
      user: user,
      setOauth: (oauth) => {
        if(oauth){
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          oauth.email = payload.email
          setCookie('oauth', oauth)
        }else{
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
      setUser: (user) => {
        if (user) {
          setCookie('user', user)
        } else {
          removeCookie('user')
        }
        setUser(user)
      },
      darkMode: darkMode,
      setDarkmode: setDarkmode,
      channels: channels,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setChannels: setChannels,
      currentChannel: currentChannel,
      setCurrentChannel: (channelId) => {
        const channel = channels.find( channel => channel.id === channelId)
        setCurrentChannel(channel)
      },
    }}>{children}</Context.Provider>
  )
}
