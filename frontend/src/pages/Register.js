import React from 'react'
import { Button, TextField } from '@mui/material'

import { REGISTER, TOKEN } from '../constants/dbConstants'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const passwordError = 'Passwords Do Not Match'
const unknownError = 'Unknown Error'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [cpassword, setCPassword] = React.useState('')
    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState(passwordError)

    React.useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            return navigate("/app")
        }
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        if (password === cpassword) {

            try {
                const res = await axios.post(REGISTER, { username, password, email, firstname, lastname })
                if (res.status === 200) {
                    localStorage.setItem(TOKEN, res.data)
                    return navigate('/app')
                }
            } catch {
                setErrorText(unknownError)
                setOpen(true)
            }
        }
        else {
            setErrorText(passwordError)
        }
        setOpen(true)
    }

    return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
            <Alert onClose={() => { setOpen(false) }} severity="error" sx={{ width: '100%' }}>
                {errorText}
            </Alert>
        </Snackbar>
        <div style={{
            boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
            width: '400px',
            background: 'white',
            height: '650px',
            borderRadius: '16px',
            border: '1px red solid', borderTopColor: 'white', borderBottomColor: 'white'
        }}>
            <form onSubmit={handleLogin} style={{
                margin: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            }}>
                <span style={{ fontSize: '24px', marginBottom: '48px', marginTop: '48px' }}>NotSoSocial</span>
                <TextField required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setUsername(e.target.value)} label='Username' sx={{ width: '80%', margin: '1.5%' }} />
                <TextField type='email' required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setEmail(e.target.value)} label='Email' sx={{ width: '80%', margin: '1.5%' }} />
                <TextField required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setFirstname(e.target.value)} label='First Name' sx={{ width: '80%', margin: '1.5%' }} />
                <TextField required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setLastname(e.target.value)} label='Last Name' sx={{ width: '80%', margin: '1.5%' }} />
                <TextField required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setPassword(e.target.value)} label='Password' sx={{ width: '80%', margin: '1.5%' }} />
                <TextField required inputProps={{ style: { padding: '12px', paddingBottom: '16px' } }} onChange={(e) => setCPassword(e.target.value)} label='Confirm Password' sx={{ width: '80%', margin: '1.5%' }} />
                <Button type='submit' variant='contained' sx={{ width: '80%', margin: '3%', padding: '12px', paddingBottom: '16px' }} >Log In</Button>
                <span style={{ margin: '16px' }}>Already Have An Account, Log in</span>
            </form>
        </div>
    </div>
}

export default Register