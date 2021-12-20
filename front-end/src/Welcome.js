
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ChannelPopup, SettingsPopup } from './Popup';
import { IconButton } from '@mui/material';
import { useState, useContext } from 'react';
import Context from './Context';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: 'linear-gradient(to bottom, #103c76, #380036 )',
  },
  rootLight: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    // background: 'linear-gradient(to bottom, #f5f7fa, #8693ab )',
    backgroundColor: '#d7e1ec'
  },
  buttonLight: {
    '&:hover': {
      backgroundColor: 'rgba(56, 109, 246, 0.2 )'
    }
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '100%',
    fill: '#fff',
  },
  iconLight: {
    width: '100%',
    fill: '#1E2634',
  },
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  const { darkMode } = useContext(Context)
  const [toggleCreateChannels, setToggleCreateChannels] = useState(false)
  const [toggleSettings, setToggleSettings] = useState(false)
  const handleOpenCreateChannels = () => {
    setToggleCreateChannels(true)
  }
  const handleCloseCreateChannels = () => {
    setToggleCreateChannels(false)
  }
  const handleOpenSettings = () => {
    setToggleSettings(true)
  }
  const handleCloseSettings = () => {
    setToggleSettings(false)
  }
  return (
    <div css={darkMode ? styles.root : styles.rootLight}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <IconButton onClick={handleOpenCreateChannels} sx={darkMode ? styles.button : styles.buttonLight}>
              <ChannelIcon css={darkMode ? styles.icon : styles.iconLight} />
            </IconButton>
            <Typography color={darkMode ? 'textPrimary' : "#1E2634"}>
              Create channels
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={darkMode ? styles.icon : styles.iconLight} />
            <Typography color={darkMode ? 'textPrimary' : "#1E2634"}>
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <IconButton onClick={handleOpenSettings} sx={darkMode ? styles.button : styles.buttonLight}>
              <SettingsIcon css={darkMode ? styles.icon : styles.iconLight} />
            </IconButton>
            <Typography color={darkMode ? 'textPrimary' : "#1E2634"}>
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
      <ChannelPopup
        open={toggleCreateChannels}
        onClose={handleCloseCreateChannels}
      />
      {
        toggleSettings === true
        &&
        <SettingsPopup
          open={toggleSettings}
          onClose={handleCloseSettings}
        />
      }
    </div>
  );
}
