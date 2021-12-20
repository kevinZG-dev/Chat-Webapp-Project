
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
// Layout
import { makeStyles, useTheme } from '@mui/styles';
import { useCookies } from 'react-cookie'
import { IconButton, Link, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Button from '@mui/material/Button';
import logoBlanc from './icons/logo-blanc.png'
import logoCouleur from './icons/logo-couleur.png'
import Gravatar from 'react-gravatar'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { fontWeight } from '@mui/system';
import { SettingsPopup } from './Popup';
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
  headerLight: {
    display: 'flex',
    height: "70px",
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    flexShrink: 0,
    margin: "8px",
    boxShadow: '3px 3px 3px #b8c6db'
  },
  logoimg: {
    alignItems: 'center',
    paddingLeft: '40px',
    maxWidth: 30
  },
  logo: {
    paddingLeft: '10px',
    flexGrow: '1',
    margin: 0,
    display: 'block',
    color: 'white'
  },
  logoLight: {
    paddingLeft: '10px',
    flexGrow: '1',
    margin: 0,
    display: 'block',
    color: '#1E2634'
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
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    }
  },
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible, darkMode, user
  } = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [toggleSettings, setToggleSettings] = useState(false)
  const open = Boolean(anchorEl)

  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
    removeCookie('user')
  }
  const handleOpenProfile = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleCloseProfile = () => {
    setAnchorEl(null)
  }
  const handleOpenSettings = () => {
    setToggleSettings(true)
  }
  const handleCloseSettings = () => {
    setToggleSettings(false)
  }
  return (
    <header css={(darkMode || !oauth) ? styles.header : styles.headerLight}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon sx={{ color: (!darkMode && oauth) && "#1E2634" }} />
      </IconButton>
      <img css={styles.logoimg} src={(darkMode || !oauth) ? logoBlanc : logoCouleur} alt="Logo" />
      <h1 css={(darkMode || !oauth) ? styles.logo : styles.logoLight}>Blabla</h1>

      {
        (user && oauth) ?
          <span css={styles.content}>
            <Tooltip title="Account">
              {
                user.avatar==='0'
                  ?
                  <IconButton onClick={handleOpenProfile} size="small" sx={{ ml: 2 }}>
                    <Gravatar
                      size={30}
                      style={{ border: 'thick double #32a1ce', borderRadius: 20 }}
                      email={oauth.email} />
                  </IconButton>
                  :
                  <IconButton sx={{ margin: "5px" }}
                    onClick={handleOpenProfile} size="small"
                  >
                    <Avatar size={30}
                      style={{ border: 'thick double #32a1ce', borderRadius: 25, margin: 0 }}
                      alt="" src={user.avatar} />
                  </IconButton>
              }

            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseProfile}
              onClick={handleCloseProfile}

              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  background: darkMode
                    ? 'linear-gradient(to bottom, #103c76, #380036 )'
                    : 'linear-gradient(to bottom, #f5f7fa, #537895 )',

                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    backgroundColor: darkMode
                      ? '#103c76'
                      : '#f5f7fa',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}

              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start"
              }}>
                <span css={{ color: !darkMode && "#1E2634" }}>Signed in as </span>
                <span css={{
                  fontWeight: "bold",
                  color: !darkMode && "#1E2634"
                }}
                >
                  {oauth.email}</span>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={handleOpenSettings}
                sx={{
                  color: !darkMode && "#1E2634"
                }}
              >
                <ListItemIcon>
                  <Settings
                    sx={{
                      color: !darkMode && "#1E2634"
                    }}
                    fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

            </Menu>
            <Button
              sx={{
                color: darkMode ? '#f1f1f1' : '#1E2634',
                '&:hover': {
                  backgroundColor: darkMode ? '' : '#2B64F6',
                }
              }}
              variant='text' onClick={onClickLogout}>Logout</Button>
            {
              toggleSettings===true
              &&
              <SettingsPopup
                open={toggleSettings}
                onClose={handleCloseSettings}
              />
            }

          </span>
          :
          <span css={styles.content}>New user</span>
      }


    </header>
  );
}
