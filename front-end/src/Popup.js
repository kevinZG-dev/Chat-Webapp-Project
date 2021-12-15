import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, TextField, Box, Paper } from '@mui/material'
import { useContext } from 'react'
import { useTheme } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Context from './Context'

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
    console.log(channelName);
  }

  const handleSubmit = async (e) => {
    if (channelName !== '') {
      e.preventDefault()
      
      await axios.post('http://localhost:3001/channels/', {
        name: `${channelName}`,
        creator: `${user.username}`,
        idCreator: `${user.id}`,
        
      }, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
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
  const { user } = useContext(Context)
  const { onClose, open, channel } = props
  const [nameUser, setNameUser] = useState([])
  const styles = useStyles(useTheme())
  const handleClose = () => {
    onClose()
  }
  const handleChange = (e) => {
    setNameUser([e.target.value])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let listOfUsers = (channel.list).concat(nameUser)

    // if (nameUser !== '') {
    //   try {
    //     await axios.put(`http://localhost:3001/channels/${channel.id}`, {
    //       name: `${channel.name}`,
    //       creator: `${channel.creator}`,
    //       idCreator: `${channel.idCreator}`,
    //       listUsers: `$`
    //     })
    //   } catch (error) {
        
    //   }
    // }
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