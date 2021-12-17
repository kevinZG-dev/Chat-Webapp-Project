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
      margin: '10px'
    }
  }
}
export const ChannelPopup = (props) => {
  const styles = useStyles(useTheme())
  const { onClose, open } = props
  const { oauth, setChannels, user } = useContext(Context)
  const [channelName, setChannelName] = useState("")
  const handleClose = () => {
    onClose()
  }
  const handleChange = (e) => {
    setChannelName(e.target.value)
  }
  const handleSubmit = async (e) => {
    if (channelName !== '') {
      e.preventDefault()
      await axios.post('http://localhost:3001/channels/', {
        name: `${channelName}`,
        creator: `${oauth.email}`,
        listOfUsers: `${oauth.email.split()}`

      }, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
            user: `${oauth.email}`,
          }
        })
        console.log(channels);
        setChannels(channels)
      } catch (err) {
        console.error(err)
      }
      setChannelName('')
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
              css={styles.content}
              value={channelName}
              onChange={handleChange}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button type="submit">
              Validate
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}

export const AddUserPopup = (props) => {
  const { oauth, setChannels, currentChannel } = useContext(Context)
  const { onClose, open, channel } = props
  const [nameUser, setNameUser] = useState([])
  const styles = useStyles(useTheme())
  const navigate = useNavigate();

  const handleClose = () => {
    onClose()
  }
  const handleChange = (e) => {
    setNameUser(e.target.value)
    console.log(nameUser);
  }
  //console.log(currentChannel);
  const handleSubmit = async (e) => {
    e.preventDefault()
    let listOfUsers = (channel.listOfUsers.split()).concat(nameUser)
    console.log(listOfUsers);


    await axios.put(`http://localhost:3001/channels/${channel.id}`, {
      name: `${channel.name}`,
      creator: `${oauth.email}`,
      listOfUsers: `${listOfUsers}`,
      id: `${channel.id}`
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    console.log(channel.id);
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
    setNameUser('')
    handleClose()
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Add a new user</DialogTitle>
        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
              id="input-with-icon-textfield"
              label="User name"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              css={styles.content}
              value={nameUser}
              onChange={handleChange}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button type="submit">
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button sx={{
            color: "red",
            '&:hover': {
              backgroundColor: '#D3302F',
            }
          }}
            onClick={handleSubmit}>Delete</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

export const EditMessagePopup = (props) => {
  const { open, onClose, message } = props
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const [newMessage, setNewMessage] = useState('')
  const handleClose = () => {
    onClose()
  }
  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }
  const handleSubmit = () => {

  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>
        <DialogTitle>Edit Message</DialogTitle>
 

        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box sx={styles.box}>
            <TextField
              id="input-with-icon-textfield"
              label="User name"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              css={styles.content}
              value={newMessage}
              onChange={handleChange}
            >
            </TextField>
          </Box>
          <Box sx={styles.box}>
            <Button type="submit">
              Validate
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  )
}
export const SettingsPopup = () => {

  // return (
  //   <Dialog onClose={handleClose} open={open}>
  //     <Paper sx={styles.paperChannel}>

  //       <DialogTitle>Create new channel</DialogTitle>
  //       <form autoComplete='off' onSubmit={handleSubmit} >
  //         <Box>
  //           <TextField
  //             id="custom-css-outlined-input"
  //             label="Channel's name"
  //             variant="outlined"
  //             css={styles.content}>
  //             onChange={event => setChannelName(event.target.value)}
  //           </TextField>
  //         </Box>
  //         <Box>
  //           <Button type="submit">
  //             Validate
  //           </Button>
  //         </Box>
  //       </form>
  //     </Paper>
  //   </Dialog>
  // )
}