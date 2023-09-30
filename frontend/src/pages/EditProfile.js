import React from 'react'
import { Button, TextField } from '@mui/material'
import { authAxios } from '../authAxios'
import { POST_PROFILE_PICTURE } from '../constants/dbConstants'
import { QueryClient } from 'react-query'


export const EditProfile = ({ handleClick, profileBio, profileImage }) => {

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const queryClient = new QueryClient()
    const inputRef = React.useRef()
    const [image, setImage] = React.useState(profileImage ? dataURLtoFile(profileImage, 'abc' + Math.random()) : undefined)
    const [bio, setBio] = React.useState(profileBio)
    return <div style={{ padding: '24px', minHeight: '80vh', width: '700px', background: 'white', borderRadius: '8px', marginTop: '1rem' }}>
        <Button onClick={handleClick} variant="outlined" style={{ marginBottom: '12px', color: '#8a2be2', borderColor: '#8a2be2' }}>View Profile</Button>
        <h3 style={{ marginBottom: '12px' }}>Profile Picture</h3> {image && <sub style={{ display: 'inline' }}>Click The Image To Delete It</sub>}
        <input ref={inputRef} type='file' accept="image/jpeg" style={{ display: 'none' }} onChange={(e) => {
            if (e?.target?.files?.[0]) {
                console.log(e.target.files[0], profileImage)
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
            <TextField value={bio} onChange={(e) => setBio(e.target.value)} multiline fullWidth
                sx={{
                    marginRight: '13%', fontSize: '16px',
                    background: 'white',
                }} />
        </div>
        <Button sx={{ marginTop: '24px', borderColor: '#8a2be2', color: '#8a2be2' }} variant='outlined' onClick={() => {
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
