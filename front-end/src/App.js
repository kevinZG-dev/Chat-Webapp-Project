
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
// Rooter
import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom"

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#103c76',
 
  },
  rootLight: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f7fa',

  },
}

export default function App() {
  const location = useLocation()
  const {oauth, darkMode} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const gochannels = (<Navigate
    to={{
      pathname: "/channels",
      state: { from: location }
    }}
  />)
  const gohome = (<Navigate
    to={{
      pathname: "/",
      state: { from: location }
    }}
  />)
  return (
    <div className="App" css={darkMode ? styles.root : styles.rootLight}>
      <Header drawerToggleListener={drawerToggleListener}/>
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)}/>
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)}/>
        <Route path="/Oups" element={<Oups />} />
      </Routes>
      <Footer />
    </div>
  );
}
