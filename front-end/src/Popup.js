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
const useStyles = (theme) => {

  return {
    paperChannel: {
      background: 'linear-gradient(to bottom, #103c76, #380036 )',
      textAlign: "center",
      border: "1px solid white",
      padding: '20px',
    },
    box: {
      margin: '30px'
    }
  }
}
export const ChannelPopup = (props) => {
  const styles = useStyles(useTheme())
  const { onClose, open } = props
  const { oauth, channels, setChannels, user } = useContext(Context)
  const [channelName, setChannelName] = useState('')
  const [usersNames, setUsersNames] = useState('')
  const addChannels = (newChannel) => {
    setChannels([...channels, newChannel])
  }
  const handleClose = () => {
    onClose()
    setChannelName('')
    setUsersNames('')
  }
  const handleChangeChannelName = (e) => {
    setChannelName(e.target.value)
  }
  const handleChangeAddUsers = (e) => {
    setUsersNames(e.target.value)
  }
  const handleSubmit = async (e) => {
    if (channelName !== '') {
      e.preventDefault()
      const listEmail = [oauth.email]
      const stringOfListWithoutSpace = usersNames.replace(/\s/g, '')
      const listOfAddedUsers = stringOfListWithoutSpace.split(',')
      const finalListEmail = listEmail.concat(listOfAddedUsers)
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

    }
    handleClose()

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
              id="input-with-icon-textfield"
              label="Add Users"
              variant="standard"
              helperText="Enter users emails separate by , "
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
  const styles = useStyles(useTheme())
  const navigate = useNavigate();

  const handleClose = () => {
    onClose()
  }
  const handleChange = (e) => {
    setUsersNames(e.target.value)

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const stringOfListWithoutSpace = usersNames.replace(/\s/g, '')
    const listOfAddedUsers = stringOfListWithoutSpace.split(',')
    const finalListEmail = channel.listOfUsers.concat(listOfAddedUsers)

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
    setUsersNames('')
    handleClose()
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Invite Users</DialogTitle>
        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
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
              helperText="Enter users emails separate by , "
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
  const { onClose, open, } = props
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())

  const handleClose = () => {
    onClose()
  }

  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Settings</DialogTitle>
        <form autoComplete='off'>
          <Box sx={styles.box}>
            <TextField
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
              value={oauth.email}
     
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
   
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}