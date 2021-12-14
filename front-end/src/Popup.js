import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, TextField, Box, Paper } from '@mui/material'
import { useContext } from 'react'
import { useTheme } from '@mui/styles';
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
  }
}
export const ChannelPopup = (props) => {
  const styles = useStyles(useTheme())
  const { onClose, open } = props
  const { oauth, setChannels } = useContext(Context)
  const [channelName, setChannelName] = useState("")
  const handleClose = () => {
    onClose()
  }
  const handleSubmit = () => {

  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper sx={styles.paperChannel}>

        <DialogTitle>Create new channel</DialogTitle>
        <form autoComplete='off' onSubmit={handleSubmit} >
          <Box>
            <TextField
              id="custom-css-outlined-input"
              label="Channel's name"
              variant="outlined"
              css={styles.content}>
              onChange={event => setChannelName(event.target.value)}
            </TextField>
          </Box>
          <Box>
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

