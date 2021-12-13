
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Button from '@mui/material/Button';


const useStyles = (theme) => ({
  header: {

    height: "70px",

    backgroundColor: '#1652a1',
    flexShrink: 0,
    outline: 'none',
    border: 'none',
    margin: 8,
    boxShadow: '3px 3px 3px #0B2951'

  },
  logoNom: {
    marginLeft: "50px",
    height: "30px",
    width: "120px"


  },
  nom: {
    marginLeft: 22
  },
  content: {
    position: "absolute",
    right: "50px",
    top: "15px",
    padding: "5px",
    fontSize: "21px",


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
      <div css={styles.logoNom}>
        <h1 css={styles.nom}>Blabla</h1>
      </div>
    
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
