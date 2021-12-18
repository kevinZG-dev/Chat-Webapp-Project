
/** @jsxImportSource @emotion/react */
import { forwardRef, useContext, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react'
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Paper } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import MenuList from '@mui/material/MenuList';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import axios from 'axios';
import Context from '../Context';
import { useState } from 'react'
import { AddUserPopup, DeleteChannelPopup, EditMessagePopup } from '../Popup'
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',

  }
})

export default forwardRef(({
  deleteMessage,
  editMessage,
  channel,
  messages,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  const { oauth } = useContext(Context)
  const [toggleAddUser, setToggleAddUser] = useState(false)
  const [toggleDeleteChannel, setToggleDeleteChannel] = useState(false)
  const [toggleEditMessage, setToggleEditMessage] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentMessage, setCurrentMessage] = useState()
  const open = Boolean(anchorEl)
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const { scrollTop, offsetHeight, scrollHeight } = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }

    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })

  const handleOpenAddUser = () => {
    setToggleAddUser(true)
  }
  const handleCloseAddUser = () => {
    setToggleAddUser(false)
  }
  const handleOpenDeleteChannel = () => {
    setToggleDeleteChannel(true)
  }
  const handleCloseDeleteChannel = () => {
    setToggleDeleteChannel(false)
  }
  const handleOpenAction = (e, message) => {
    e.preventDefault()
    setCurrentMessage(message)
    console.log(message);
    setAnchorEl(e.currentTarget)

  }
  const handleCloseAction = () => {
    setAnchorEl(null)
    setCurrentMessage(null)
  }
  const handleDeleteMessage = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/channels/${channel.id}/messages`, {
      params: {
        author: `${currentMessage.author}`,
        creation: `${currentMessage.creation}`
      }
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    
    deleteMessage(currentMessage.creation)
    handleCloseAction()
  }
  const handleOpenEditMessage = () => {
    setToggleEditMessage(true)
  }
  const handleCloseEditMessage = () => {
    setToggleEditMessage(false)
    handleCloseAction()
  }
  return (
    <div css={styles.root} ref={rootEl}>
      <div css={styles.bar}>
        <div css={{
          padding: '.2rem .5rem',
          marginTop: "10px",
          marginBottom: "10px"
        }}>
          <h1 css={{ margin: 0 }}># {channel.name}</h1>
        </div>
        <Tooltip title="New user">
          <IconButton
            aria-label="New user"
            onClick={handleOpenAddUser}
          >
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
        {
          oauth.email === channel.creator
            ?
            <Tooltip title="Delete channel">
              <IconButton
                aria-label="Delete channel"
                onClick={handleOpenDeleteChannel}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            :
            <IconButton
              aria-label="Delete channel"
              disabled
            >
              <DeleteIcon />
            </IconButton>
        }


      </div>
      <span css={{
        padding: '.2rem .5rem',
        fontSize: "13px",
        color: "#BFC7D7",
        marginBottom: "50px"
      }}>Created by {channel.creator} / Users: {channel.listOfUsers.map(user => user + ' - ')}</span>
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);

          return (
            <li
              key={i}
              css={styles.message}
            >
              <div css={styles.bar}>
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs(message.creation/1000).calendar()}</span>
                </p>
                {
                  message.author === oauth.email
                  &&
                  <Tooltip title="Action">
                    <IconButton
                      aria-label="Action"
                      onClick={(e) => handleOpenAction(e, message)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                }
                <Menu

                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseAction}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}

                >

                  <Paper sx={{

                    width: 150, maxWidth: "100%"
                  }}
                  >
                    <MenuList>
                      <MenuItem onClick={handleOpenEditMessage}>
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>

                      </MenuItem>
                      <MenuItem onClick={handleDeleteMessage}>
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Menu>

              </div>
              <div dangerouslySetInnerHTML={{ __html: value }}>
              </div>

            </li>
          )
        })}
      </ul>
      <div ref={scrollEl} />
      <DeleteChannelPopup
        onClose={handleCloseDeleteChannel}
        open={toggleDeleteChannel}
        channel={channel}
      />
      <AddUserPopup
        onClose={handleCloseAddUser}
        open={toggleAddUser}
        channel={channel}
      />
      {
        toggleEditMessage 
        &&

      <EditMessagePopup
        onClose={handleCloseEditMessage}
        open={toggleEditMessage}
        message={currentMessage}
        channelId={channel.id}
        editMessage={editMessage}
      />
      }

    </div >
  )
})
