
/** @jsxImportSource @emotion/react */
import { Fragment, useContext } from 'react';
import Context from './Context';
import jwtDecode from 'jwt-decode';

const styles = {
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,255,255,.3)',
    color: 'rgba(255,0,0)',
    flexShrink: 0,
  },
}

export default function Footer() {
  const { user } = useContext(Context);
  console.log(user)
  let temp = null
  if (user !== null) {
    temp = jwtDecode(user)
  }
  else {
    temp = null
  }
  return (
    <footer style={styles.footer}>
      {temp ? temp.aud : <Fragment> footer </Fragment>}
    </footer>
  );
}
