
/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Layout
import { IconButton, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Context from './Context'
import { useNavigate } from 'react-router-dom'
import { Button, MenuList, Divider, MenuItem } from '@mui/material'
import { width } from '@mui/system';
import Login from './Login';
import { ChannelPopup } from './Popup';
import AddIcon from '@mui/icons-material/Add';
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap',

    }
  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels, setCurrentChannel, darkMode, user
  } = useContext(Context)
  const [toggleCreateChannels, setToggleCreateChannels] = useState(false)
  const naviate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
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
    }
    fetch()
  }, [oauth, setChannels])
  const handleOpenCreateChannels = () => {
    setToggleCreateChannels(true)

  }
  const handleCloseCreateChannels = () => {
    setToggleCreateChannels(false)
  }

  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
        <Link to="/channels" component={RouterLink}>
          <Button sx={{
            borderColor: !darkMode && "#1E2634",
            color: !darkMode && '#1E2634',
            width: "170px",
            marginTop: '20px'
          }}
            variant="outlined">Menu</Button>
        </Link>
        <Divider sx={{
          marginTop: 1,
          backgroundColor: !darkMode && "#8693ab"
        }} />

      </li>
      <Accordion sx={{
        color: !darkMode && '#1E2634',
        backgroundColor: darkMode ? '#103c76' : '#f5f7fa',
        width: "100%"
      }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: !darkMode && '#1E2634',}}/>}
          aria-controls="panel1a-content"
          id="panela-header"
          sx={{
            backgroundColor: darkMode ? '#103c76' : '#f5f7fa',

          }}
        >
          <Typography>Channels</Typography>

        </AccordionSummary>
        <AccordionDetails sx={{
          padding: 0,
          backgroundColor: darkMode ? '#103c76' : '#f5f7fa',
        }}>
          {channels.map((channel, i) => (
            <li key={i} css={styles.channel}>

              <Button
                sx={{
                  margin: 0,
                  marginTop: "5px",
                  marginBottom: "5px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  width: "100%",
                  textTransform: "none",
                  color: darkMode ? "#f1f1f1" :"#1E2634",
                  '&:hover': {
                    color: '#f1f1f1',
                    backgroundColor: '#380036',
                  }
                }}
                variant="text"
                onClick={(e) => {
                  e.preventDefault()
                  naviate(`/channels/${channel.id}`)
                  setCurrentChannel(`${channel.id}`)

                }}
              >
                {channel.name}
              </Button>
            </li>
          ))}
        </AccordionDetails>
      </Accordion>
      
      <IconButton onClick={handleOpenCreateChannels}
        sx={{ color: !darkMode && '#1E2634',}}
      >
        <AddIcon />
      </IconButton>
      <ChannelPopup
        open={toggleCreateChannels}
        onClose={handleCloseCreateChannels}
      />

    </ul>
  );
}
