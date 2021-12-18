
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Button from '@mui/material/Button';
import logoBlanc from './icons/logo-blanc.png'
import Gravatar from 'react-gravatar'

const useStyles = (theme) => ({
  header: {
    display: 'flex',
    height: "70px",
    alignItems: 'center',
    backgroundColor: '#103c76',
    flexShrink: 0,
    margin: "8px",
    boxShadow: '3px 3px 3px #0B2951'
  },
  logoimg: {
    alignItems: 'center',
    paddingLeft: '50px',
    maxWidth: 30
  },
  logo: {
    paddingLeft: '10px',
    flexGrow: '1',
    margin: 0,
    display: 'block',
  },

  content: {
    display: 'inline-flex',
    paddingRight: '50px',
    zIndex: 0,
    alignItems: 'center',
    fontSize: "19px",
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },

    position: "absolute",
    left: "10px",
    top: "15px",


  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <header css={styles.header}>
      <img css={styles.logoimg} src={logoBlanc} alt="Logo" />
      <h1 css={styles.logo}>Blabla</h1>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth ?
          <span css={styles.content}>
            {oauth.email}
            <Gravatar
              size={40}
              style={{ border: 'solid',borderColor: 'black' , borderRadius: 20, margin: '10px' }}
              email={oauth.email} />
            <Button
              sx={{
                color: '#f1f1f1'
              }}
              variant='text' onClick={onClickLogout}>Logout</Button>
          </span>
          :
          <span css={styles.content}>new user</span>
      }


    </header>
  );
}
