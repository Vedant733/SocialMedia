import React from 'react'
import { Button, Link, TextField } from '@mui/material'

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
  }, [])


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
    <div><div style={{
      width: '400px',
      height: '450px', color: 'gray',
      borderRadius: '8px',
      border: '1px rgb(177, 148, 205) solid'
    }}>
      <div style={{
        margin: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
      }}>
        <span className='special_text' style={{ fontSize: '32px', marginBottom: '48px', marginTop: '48px' }}>NotSoSocial</span>
        <TextField
          onChange={(e) => setUsername(e.target.value)} label='Username'
          sx={{
            width: '80%', margin: '1.5%', background: 'white'
          }} />
        <TextField type='password' onChange={(e) => setPassword(e.target.value)} label='Password'
          sx={{
            width: '80%', margin: '1.5%', background: 'white'
          }} />
        <Button onClick={handleLogin} variant='contained' sx={{ width: '80%', margin: '3%', padding: '12px' }} >Log In</Button>
      </div>
    </div>
      <div style={{
        borderRadius: '8px',
        border: '1px rgb(177, 148, 205) solid', marginTop: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
          Don't Have An Account,
          <Link underline='hover' sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </div>
}

export default Login