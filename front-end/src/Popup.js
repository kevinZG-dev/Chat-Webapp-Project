import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, TextField, Box, Paper, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useContext } from 'react'
import { useTheme } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Context from './Context'
import { useNavigate } from 'react-router-dom';
import { maxWidth, textAlign } from '@mui/system';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Gravatar from 'react-gravatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import avatar7 from './avatar/7.png'
import avatar1 from './avatar/1.png'
import avatar2 from './avatar/2.png'
import avatar3 from './avatar/3.png'
import avatar4 from './avatar/4.png'
import avatar5 from './avatar/5.png'
import avatar6 from './avatar/6.png'
const useStyles = (theme) => {

  return {
    paperChannel: {
      background: 'linear-gradient(to bottom, #103c76, #380036 )',
      textAlign: "center",
      border: "1px solid white",
      padding: '20px',
    },
    papperChannelSettings: {
      background: 'linear-gradient(to bottom, #103c76, #380036 )',
      textAlign: "center",
      border: "1px solid white",
      padding: '30px',
      width: '80vw',
      maxWidth: '350px'

    },
    box: {
      margin: '15px'
    }
  }
}
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const ChannelPopup = (props) => {
  const styles = useStyles(useTheme())
  const { onClose, open } = props
  const { oauth, channels, setChannels, user } = useContext(Context)
  const [channelName, setChannelName] = useState('')
  const [usersNames, setUsersNames] = useState('')
  const [toggleValidationAddUsers, setToggleValidationAddUsers] = useState(true)
  const addChannels = (newChannel) => {
    setChannels([...channels, newChannel])
  }
  const handleClose = () => {
    onClose()
    setChannelName('')
    setUsersNames('')
    setToggleValidationAddUsers(true)
  }
  const handleChangeChannelName = (e) => {
    setChannelName(e.target.value)
  }
  const handleChangeAddUsers = (e) => {
    setUsersNames(e.target.value)
    setToggleValidationAddUsers(true)
  }
  const isValidAddUsers = async (added) => {
    const { data: users } = await axios.get(`http://localhost:3001/users`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    });
    let isValid = true
    added.forEach(added => {
      if ((!users.some(user => user.username === added) || added === user.username)) {
        isValid = false

      }
    })
    return isValid

  }
  const handleSubmit = async (e) => {
    if (channelName !== '') {
      e.preventDefault()
      const listEmail = [oauth.email]
      let stringOfListWithoutSpace = ''
      let listOfAddedUsers = []
      let finalListEmail = []
      let isValided = true
      if (usersNames !== '') {
        stringOfListWithoutSpace = usersNames.replace(/\s/g, '')
        listOfAddedUsers = stringOfListWithoutSpace.split(',')
        finalListEmail = listEmail.concat(listOfAddedUsers)
        isValided = await isValidAddUsers(listOfAddedUsers)

      } else {
        finalListEmail = [...listEmail]
      }
      if (isValided) {

        const { data: channel } = await axios.post('http://localhost:3001/channels/', {
          name: `${channelName}`,
          creator: `${oauth.email}`,
          listOfUsers: finalListEmail

        }, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        addChannels(channel)
        setToggleValidationAddUsers(true)
        handleClose()
      } else {
        setToggleValidationAddUsers(false)
      }

    }


  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Create new channel</DialogTitle>
        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
              id="custom-css-outlined-input"
              label="Channel's name"
              variant="outlined"
              required
              css={styles.content}
              value={channelName}
              onChange={handleChangeChannelName}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <TextField
              error={!toggleValidationAddUsers}
              helperText={
                toggleValidationAddUsers
                  ? "Enter users emails separate by , "
                  : "These users don't exist or already invited."
              }
              id="input-with-icon-textfield"
              label="Add Users"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              css={styles.content}
              value={usersNames}
              onChange={handleChangeAddUsers}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#D3302F',
              }
            }}
              onClick={handleClose}>Cancel</Button>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#7EBEEA',
              }
            }}
              type="submit">
              Validate
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}

export const AddUserPopup = (props) => {
  const { oauth, channels, setChannels, currentChannel } = useContext(Context)
  const { onClose, open, channel } = props
  const [usersNames, setUsersNames] = useState('')
  const [toggleValidationAddUsers, setToggleValidationAddUsers] = useState(true)
  const styles = useStyles(useTheme())
  const navigate = useNavigate();

  const handleClose = () => {
    onClose()
    setUsersNames('')
    setToggleValidationAddUsers(true)
  }
  const handleChange = (e) => {
    setUsersNames(e.target.value)
    setToggleValidationAddUsers(true)

  }
  const updateChannels = (channelRet) => {
    const updatedChannels = channels.map(channel => {
      if (channel.id === channelRet.id) {
        return channelRet
      } else {
        return channel
      }
    })
    setChannels(updatedChannels)
  }
  const isValidAddUsers = async (added, already) => {
    const { data: users } = await axios.get(`http://localhost:3001/users`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    });
    let isValid = true
    added.forEach(added => {
      if ((!users.some(user => user.username === added) || (already.some(alr => alr === added)))) {
        isValid = false
      }
    })
    return isValid

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (usersNames !== '') {

      const stringOfListWithoutSpace = usersNames.replace(/\s/g, '')
      const listOfAddedUsers = stringOfListWithoutSpace.split(',')
      const finalListEmail = channel.listOfUsers.concat(listOfAddedUsers)
      const isValided = await isValidAddUsers(listOfAddedUsers, channel.listOfUsers)
      if (isValided) {

        const { data: channelRet } = await axios.put(`http://localhost:3001/channels/${channel.id}`, {
          name: `${channel.name}`,
          creator: `${oauth.email}`,
          listOfUsers: finalListEmail,
          id: `${channel.id}`
        }, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        updateChannels(channelRet)
        setToggleValidationAddUsers(true)
        handleClose()
      } else {
        setToggleValidationAddUsers(false)
      }
    }
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Invite Users</DialogTitle>
        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
              id="input-with-icon-textfield"
              error={!toggleValidationAddUsers}
              helperText={
                toggleValidationAddUsers
                  ? "Enter users emails separate by , "
                  : "These users don't exist or already invited."
              }
              label="Add Users"
              variant="standard"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              css={styles.content}
              value={usersNames}
              onChange={handleChange}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#D3302F',
              }
            }}
              onClick={handleClose}>Cancel</Button>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#7EBEEA',
              }
            }}
              type="submit">
              Validate
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}

export const DeleteChannelPopup = (props) => {
  const { onClose, open, channel } = props
  const { oauth, setChannels } = useContext(Context)
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  const handleClose = () => {
    onClose()
  }
  const handleSubmit = async () => {

    await axios.delete(`http://localhost:3001/channels/${channel.id}`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
      params: {
        id: `${channel.id}`,
        creator: `${channel.creator}`
      }
    })
    try {
      const { data: channels } = await axios.get('http://localhost:3001/channels/', {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
        params: {
          user: `${oauth.email}`,
        }
      })
      setChannels(channels)
    } catch (err) {
      console.error(err)
    }
    navigate('/channels')
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>
        <DialogTitle>Are you sure you want to delete the channel: {channel.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ color: "#D3302F" }}>
            This channel will be deleted for all users!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button sx={{
            color: "#f1f1f1",
            '&:hover': {
              color: '#D3302F',
            }
          }}
            onClick={handleClose}>Cancel</Button>
          <Button sx={{
            color: "#f1f1f1",
            '&:hover': {
              color: '#7EBEEA',
            }
          }}
            onClick={handleSubmit}>Delete</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

export const EditMessagePopup = (props) => {
  const { open, onClose, message, channelId, editMessage } = props
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const [newMessage, setNewMessage] = useState(message.content)

  const handleClose = () => {
    onClose()
    setNewMessage('')
  }
  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }
  const handleSubmit = async (e) => {

    e.preventDefault()
    await axios.put(`http://localhost:3001/channels/${channelId}/messages`, {
      author: `${message.author}`,
      content: `${newMessage}`,

    }, {
      params: {
        creation: `${message.creation}`
      }
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    editMessage(newMessage, message.creation)
    setNewMessage('')
    handleClose()


  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>
        <DialogTitle>Edit Message</DialogTitle>


        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
              id="standard-basic"
              label="New message"
              variant="standard"
              css={styles.content}
              value={newMessage}
              onChange={handleChange}
              sx={{ width: '70vw', maxWidth: '500px' }}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              Validate
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}
export const SettingsPopup = (props) => {
  const { onClose, open } = props
  const { oauth, user, setUser, darkMode, setDarkmode } = useContext(Context)
  const [fullName, setFullName] = useState(user.fullName)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [toggleChecked, setToggleCheked] = useState(user.darkTheme)
  const [avatarSelected, setAvatarSelected] = useState(user.avatar)
  const [anchorElAv, setAnchorElAv] = useState(null)
  const openAv = Boolean(anchorElAv)
  const styles = useStyles(useTheme())

  let listAvatar = []
  listAvatar.push(avatar1)
  listAvatar.push(avatar2)
  listAvatar.push(avatar3)
  listAvatar.push(avatar4)
  listAvatar.push(avatar5)
  listAvatar.push(avatar6)

  const handleClose = () => {
    onClose()
  }
  const handleChangeFullName = (e) => {
    setFullName(e.target.value)
  }
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }
  const handleChangeThemeMode = (e) => {
    setToggleCheked(e.target.checked)
    setDarkmode(e.target.checked)
  }
  const handleOpenAvatar = (e) => {
    setAnchorElAv(e.currentTarget)
  }
  const handleCloseAvatar = () => {
    setAnchorElAv(null)
  }
  const handleClickAvatar = (avatar) => {
    setAvatarSelected(avatar)
  }
  const handleSubmit = async () => {
    const { data: updatedUser } = await axios.put(`http://localhost:3001/users/${user.id}`, {
      username: user.username,
      darkTheme: toggleChecked,
      fullName: fullName,
      phoneNumber: phoneNumber,
      avatar: avatarSelected
    },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      });
    setUser(updatedUser)
    setFullName(updatedUser.fullName)
    setPhoneNumber(updatedUser.phoneNumber)
    setAvatarSelected(updatedUser.avatar)
    handleClose(updatedUser)

  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.papperChannelSettings}>
        <DialogTitle sx={{
          padding: "10px 15px",
        }}
        >
          Settings
        </DialogTitle>

        <form autoComplete='off'>
          <Box>
            {
              avatarSelected === '0'
                ?
                <IconButton onClick={handleOpenAvatar} size="small">
                  <Gravatar
                    size={40}
                    style={{ border: 'thick double #32a1ce', borderRadius: 25 }}
                    email={oauth.email} />
                </IconButton>
                :
                <IconButton sx={{ margin: "5px" }}
                  onClick={handleOpenAvatar} size="small"
                >
                  <Avatar size={30}
                    style={{ border: 'thick double #32a1ce', borderRadius: 25, margin: 0 }}
                    alt="" src={avatarSelected} />
                </IconButton>
            }

          </Box>
          <Menu
            anchorEl={anchorElAv}
            open={openAv}
            onClose={handleCloseAvatar}
            onClick={handleCloseAvatar}

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

            <Grid columns={2}>
              <Grid
                display="flex"
                justifyContent="center"
                alignItems="center">
                <IconButton sx={{ margin: "5px" }}
                  onClick={() => handleClickAvatar('0')} size="small"
                >
                  <Gravatar
                    size={30}
                    style={{ border: 'thick double #32a1ce', borderRadius: 20 }}
                    email={oauth.email}
                    sx={{

                    }} />

                </IconButton>
              </Grid>
              {
                listAvatar.map((avatar, i) => {
                  return (
                    <Grid
                      key={i}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                      <IconButton sx={{ margin: "5px" }}
                        onClick={() => handleClickAvatar(avatar)} size="small"
                      >
                        <Avatar size={30}
                          style={{ border: 'thick double #32a1ce', borderRadius: 20, margin: 0 }}
                          alt="Remy Sharp" src={avatar} />


                      </IconButton>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Menu>
          <Box sx={styles.box}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              disabled
              value={oauth.email}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={fullName}
              onChange={handleChangeFullName}

            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}

            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} />}
              label={toggleChecked ? "Dark mode" : "Light mode"}
              checked={toggleChecked}
              onChange={handleChangeThemeMode}
            />
          </Box>
          <Box sx={styles.box}>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#D3302F',
              }
            }}
              onClick={handleClose}>Cancel</Button>
            <Button sx={{
              color: "#f1f1f1",
              '&:hover': {
                color: '#7EBEEA',
              }
            }}
              onClick={handleSubmit}>Validate</Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}