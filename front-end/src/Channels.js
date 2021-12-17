
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import { Button, MenuList, Divider, MenuItem } from '@mui/material'
import { width } from '@mui/system';
import Login from './Login';
const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap',

    }
  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels, setCurrentChannel
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
            user: `${oauth.email}`,
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()

  }, [oauth, setChannels])
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
        <Link to="/channels" component={RouterLink}>
          <Button sx={{

            width: "170px",
            textAlign: "left"
          }}
          variant="outlined">Menu</Button>
        </Link>
        <Divider sx={{
          marginTop: 1
        }}/>

      </li>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>

          <Button
          sx={{
            margin: 1,
            width: "170px",
            textAlign: "left",
            textTransform: "none",
            '&:hover': {
              color: '#f1f1f1',
              backgroundColor: '#380036',
            }
          }}
          variant="contained"
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
              setCurrentChannel(`${channel.id}`)
              
            }}
          >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
