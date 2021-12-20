
/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import Context from "./Context";
import CodeIcon from '@mui/icons-material/Code';

const styles = {
  footer: {
    height: '30px',
    backgroundColor: '#103c76',
    flexShrink: 0,
    borderTop: 'solid',
    borderTopColor: 'white',
    borderTopWidth: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerLight: {
    height: '30px',
    backgroundColor: '#f5f7fa',
    flexShrink: 0,
    borderTop: 'solid',
    borderTopColor: 'white',
    borderTopWidth: '1px',
    color: '#1E2634',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}

export default function Footer() {
  const { darkMode, oauth } = useContext(Context)
  return (
    <footer style={(darkMode || !oauth) ? styles.footer : styles.footerLight}>
      <CodeIcon />
      <span css={{ marginRight: "10px" }}>Kevin Zheng</span>
      <span>|</span>
      <span css={{ marginLeft: "10px" }}>Maxime Attal</span>
      <CodeIcon />
    </footer>
  );
}
