
/** @jsxImportSource @emotion/react */

import { color } from "@mui/system";
import { useContext } from "react";
import Context from "./Context";

const styles = {
  footer: {
    height: '30px',
    backgroundColor: '#103c76',
    flexShrink: 0,
    borderTop: 'solid',
    borderTopColor: 'white',
    borderTopWidth: '1px' 

  },
  footerLight: {
    height: '30px',
    backgroundColor: '#f5f7fa',
    flexShrink: 0,
    borderTop: 'solid',
    borderTopColor: 'white',
    borderTopWidth: '1px',
    color: '#1E2634'

  },
}

export default function Footer() {
  const { darkMode } = useContext(Context)
  return (
    <footer style={darkMode ? styles.footer : styles.footerLight}>
      footer
    </footer>
  );
}
