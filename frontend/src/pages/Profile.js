import { EditProfile } from './EditProfile'
import React from "react";
import '../components/Navbar.css'
import { Box, Button, Modal } from "@mui/material";
import { PostCard } from "../components/PostCard";
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";
import { GET_CURRENT_USER, GET_POSTS_CURRENT_USER, IMAGE_PREFIX } from "../constants/dbConstants";
import { AccountCircle } from '@mui/icons-material';
import FollowingUser from '../components/FollowingUser';
import FollwerUser from '../components/FollwerUsers';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '600px'
};

function Profile() {

    const [edit, setEdit] = React.useState(false)
    const [followingModal, setFollowingModal] = React.useState(false)
    const [followerModal, setFollowerModal] = React.useState(false)
    // const [clickedPostId, setClickedPostId] = React.useState(null)
    const handleClick = () => {
        setEdit(prev => !prev)
    }

    const { data: profile, isLoading: isProfileLoading } = useQuery('GET_PROFILE', () => {
        const axios = authAxios()
        return axios.get(GET_CURRENT_USER)
    })

    const { data: posts } = useQuery('GET_POSTS', () => {
        const axios = authAxios()
        return axios.get(GET_POSTS_CURRENT_USER)
    })

    return !profile?.data ? <></> :
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', overflowY: 'scroll', overflowX: 'hidden', minHeight: '100px', height: `${window.innerHeight - 80}px` }}>
            {edit
                ? <EditProfile profileImage={profile?.data?.profilePicture?.data ? IMAGE_PREFIX + profile.data.profilePicture.data : null} handleClick={handleClick} profileBio={profile.data.bio} />
                : <>
                    {isProfileLoading ? 'Loading' : <div style={{ width: '700px', background: 'white', borderRadius: '8px', marginTop: '1rem' }}>
                        <Modal open={followingModal} onClose={() => setFollowingModal(false)}>
                            <Box sx={style}>
                                <FollowingUser />
                            </Box>
                        </Modal>
                        <Modal open={followerModal} onClose={() => setFollowerModal(false)}>
                            <Box sx={style}>
                                <FollwerUser />
                            </Box>
                        </Modal>
                        <Button onClick={handleClick} variant="outlined" style={{ margin: '24px', borderColor: '#8a2be2', color: '#8a2be2' }}>Edit Profile</Button>
                        <div style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }}>
                                {profile?.data?.profilePicture?.data ? <img src={IMAGE_PREFIX + profile.data.profilePicture.data} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="" /> : <AccountCircle style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
                                <span style={{ fontWeight: 600, marginTop: '8px' }}>{profile.data.username}</span>

                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }} onClick={() => setFollowerModal(true)}>
                                <span style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Followers</span>
                                <span>{profile.data.followers.length}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }} onClick={() => setFollowingModal(true)}>
                                <span style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Following</span>
                                <span>{profile.data.following.length}</span>
                            </div>

                        </div>
                        <div style={{ background: 'white', paddingBottom: '12px', paddingLeft: '10%', width: '90%' }}>
                            <span style={{ marginTop: '8px' }}>{profile.data.bio}</span>
                        </div>
                        <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {posts && posts.data.map(item => {
                                return <PostCard id={item.id} hideUsername={true} image={IMAGE_PREFIX + item.image.data} caption={item.caption} />
                            })}
                        </div>
                    </div>
                    }
                </>}
        </div>;
}

export default Profile;
