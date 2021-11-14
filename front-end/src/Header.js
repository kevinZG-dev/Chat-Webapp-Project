
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import {IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import Context from './Context';
import jwtDecode from 'jwt-decode';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
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
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  const {user}  = useContext(Context);

  
  
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      Welcome {user}
      
    </header>
  );
}
