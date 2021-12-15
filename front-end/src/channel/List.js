
/** @jsxImportSource @emotion/react */
import { forwardRef, useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react'
// Layout
import { useTheme } from '@mui/styles';
import { IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Tooltip } from '@mui/material';
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
import { AddUserPopup } from '../Popup'
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
  channel,
  messages,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  const [toggleAddUser, setToggleAddUser] = useState(false)
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

      </div>
      <span css={{
        padding: '.2rem .5rem',
        fontSize: "13px",
        color: "#BFC7D7",
        marginBottom: "50px"
      }}>Created by {channel.creator} / Users: {channel.listOfUsers}</span>
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                <span>{message.author}</span>
                {' - '}
                <span>{dayjs().calendar(message.creation)}</span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: value }}>
              </div>
            </li>
          )
        })}
      </ul>
      <div ref={scrollEl} />
      <AddUserPopup
        onClose={handleCloseAddUser}
        open={toggleAddUser}
        channel={channel}
      />

 
    </div>
  )
})
