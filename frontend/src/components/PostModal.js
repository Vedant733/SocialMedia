import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { authAxios } from '../authAxios';
import { POST_POSTS_CURRENT_USER } from '../constants/dbConstants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function PostModal({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
        setPostImage(null)
    };
    const [postImage, setPostImage] = React.useState(null)
    const [caption, setCaption] = React.useState(null)
    const inputRef = React.useRef()
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, background: '#000000c2', width: '70%', height: 'auto', paddingBottom: '24px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '24px', flexDirection: 'column', alignItems: 'center' }}>
                    <input ref={inputRef} type='file' accept="image/jpeg" style={{ display: 'none' }} onChange={(e) => {
                        if (e?.target?.files?.[0]) {
                            setPostImage(e.target.files[0])
                        }
                    }} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div onClick={() => {
                            if (postImage) return setPostImage(null)
                            inputRef.current.click()
                        }} style={{ border: '2px dashed red', width: '40%', aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {postImage
                                ? <img style={{ width: '100%', aspectRatio: 1 }} src={URL.createObjectURL(postImage)} alt="" />
                                : <span style={{ color: 'white' }}>Upload Profile Picture</span>
                            }
                        </div>
                    </div>
                    <input onChange={(e) => setCaption(e.target.value)} placeholder='Caption' className="inputField" style={{ width: '42%', marginTop: '4%', fontSize: '16px', padding: '12px', borderRadius: '50px', marginBottom: '4%' }} />

                    <Button variant='contained' onClick={() => {
                        const formdata = new FormData();
                        formdata.append("caption", caption);
                        formdata.append("image", postImage)
                        const axios = authAxios()
                        axios.post(POST_POSTS_CURRENT_USER, formdata).then(() => {
                            handleClose()
                        })
                    }}>Post</Button>

                </div>
            </Box>
        </Modal>
    );
}
