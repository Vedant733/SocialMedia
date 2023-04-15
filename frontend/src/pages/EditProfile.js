import React from 'react'
import { Button, TextField } from '@mui/material'
import { authAxios } from '../authAxios'
import { POST_PROFILE_PICTURE } from '../constants/dbConstants'
import { QueryClient } from 'react-query'

export const EditProfile = ({ handleClick, profileBio, profileImage }) => {

    const queryClient = new QueryClient()

    const inputRef = React.useRef()
    const [image, setImage] = React.useState(undefined)
    const [bio, setBio] = React.useState(profileBio)
    return <div style={{ padding: '24px', minHeight: '100vh', width: '700px', background: 'white', borderRadius: '8px' }}>
        <Button onClick={handleClick} variant="contained" style={{ marginBottom: '12px' }}>View Profile</Button>
        <h3 style={{ marginBottom: '12px' }}>Profile Picture</h3> {image && <div style={{ display: 'inline' }}>Click The Image To Delete It</div>}
        <input ref={inputRef} type='file' accept="image/jpeg" style={{ display: 'none' }} onChange={(e) => {
            if (e?.target?.files?.[0]) {
                setImage(e.target.files[0])
            }
        }} />
        <div style={{ width: '100%' }}>
            <div onClick={() => {
                if (image) return setImage(null)
                inputRef.current.click()
            }} style={{ border: '2px dashed red', width: '50%', aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {image === undefined && profileImage ? <img style={{ width: '100%', aspectRatio: 1 }} src={profileImage} alt="" />
                    : image ? <img style={{ width: '100%', aspectRatio: 1 }} src={URL.createObjectURL(image)} alt="" />
                        : <span>Upload Profile Picture</span>
                }
            </div>
        </div>
        <div>
            <h3 style={{ margin: '12px 0px' }}>Bio</h3>
            <TextField value={bio} onChange={(e) => setBio(e.target.value)} multiline fullWidth style={{ marginRight: '13%', fontSize: '16px', }} />
        </div>
        <Button sx={{ marginTop: '24px' }} variant='contained' onClick={() => {
            const axios = authAxios()
            const form = new FormData()
            form.append("image", image)
            form.append("bio", bio)
            axios.post(POST_PROFILE_PICTURE, form).then(() => {
                queryClient.invalidateQueries('GET_PROFILE')
                handleClick()
            })
        }}>Save</Button>
    </div>
}
