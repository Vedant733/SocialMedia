import React from 'react'
import { Button, TextField } from '@mui/material'

import { AUTHENTICATE, TOKEN } from '../constants/dbConstants'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      return navigate("/app")
    }
  })


  const handleLogin = async (e) => {
    if (username?.trim().length !== 0 && password?.trim().length !== 0) {
      const res = await axios.post(AUTHENTICATE, { username, password })
      if (res.status === 200) {
        localStorage.setItem(TOKEN, res.data)
        return navigate('/app')
      }
    }
    setOpen(true)
  }

  return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
      <Alert onClose={() => { setOpen(false) }} severity="error" sx={{ width: '100%' }}>
        Invalid Username or Password
      </Alert>
    </Snackbar>
    <div style={{
      boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
      width: '400px',
      background: 'white',
      height: '600px',
      borderRadius: '16px',
      border: '1px red solid', borderTopColor: 'white', borderBottomColor: 'white'
    }}>
      <div style={{
        margin: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
      }}>
        <span style={{ fontSize: '24px', marginBottom: '48px', marginTop: '48px' }}>NotSoSocial</span>
        <TextField inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setUsername(e.target.value)} label='Username' sx={{ width: '80%', margin: '1.5%' }} />
        <TextField type='password' inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setPassword(e.target.value)} label='Password' sx={{ width: '80%', margin: '1.5%' }} />
        <Button onClick={handleLogin} variant='contained' sx={{ width: '80%', margin: '3%', padding: '12px' }} >Log In</Button>
        <span style={{ margin: '16px' }}>Don't Have An Account, Sign up</span>
      </div>
    </div>
  </div>
}

export default Login