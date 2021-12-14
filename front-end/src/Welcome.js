
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, setRef, Typography, Button } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ChannelPopup } from './Popup';
import { useState } from 'react';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: 'linear-gradient(to bottom, #103c76, #380036 )',

    // background: 'rgba(0,0,0,.2)',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '100%',
    fill: '#fff',
  },
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  const [toggleCreateChannels, setToggleCreateChannels] = useState(false)
  const handleOpenCreateChannels = () => {
    setToggleCreateChannels(true)
    
  }
  const handleCloseCreateChannels = () => {
    setToggleCreateChannels(false)
  }
  return (
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <Button>
              <ChannelIcon onClick={handleOpenCreateChannels} css={styles.icon} />
            </Button>
              <Typography color="textPrimary">
                Create channels
              </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
      <ChannelPopup 
        open={toggleCreateChannels}
        onClose={handleCloseCreateChannels}
      />
    </div>
  );
}
