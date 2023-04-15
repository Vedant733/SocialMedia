import React from 'react'
import { Button, TextField } from '@mui/material'

export const EditProfile.js = ({handleClick, image, div, style, inputRef, e, setImage, URL, img}) => (
	<div style={{ padding: '24px', minHeight: '100vh', width: '700px', background: 'white', borderRadius: '8px' }}>
                <Button onClick={handleClick} variant="contained" style={{ marginBottom: '12px' }}>View Profile</Button>
                <h3 style={{ marginBottom: '12px' }}>Profile Picture</h3> {image && <div style={{ display: 'inline' }}>Click The Image To Delete It</div>}
                <input ref={inputRef} type='file' accept="image/jpeg" style={{ display: 'none' }} onChange={(e) => {
                    if (e?.target?.files?.[0]) {
                        setImage(URL.createObjectURL(e.target.files[0]))
                    }
                }} />
                <div style={{ width: '100%' }}>
                    <div onClick={() => {
                        if (image) return setImage(null)
                        inputRef.current.click()
                    }} style={{ border: '2px dashed red', width: '50%', aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {image
                            ? <img style={{ width: '100%', aspectRatio: 1 }} src={image} alt="" />
                            : <span>Upload Profile Picture</span>
                        }
                    </div>
                </div>
                <div>
                    <h3 style={{ margin: '12px 0px' }}>Bio</h3>
                    <TextField multiline fullWidth style={{ marginRight: '13%', fontSize: '16px', }} />
                </div>

            </div>
)
