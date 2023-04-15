import React from "react";
import { PostCard } from './PostCard';
import { AccountCircle, ArrowBack } from '@mui/icons-material';
import NewPeople from './NewPeople';
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";
import { GET_POSTS_BY_USERNAME, GET_USER_BY_USERNAME, IMAGE_PREFIX } from "../constants/dbConstants";

function People({ personToBeViewedID, setPersonToBeViewedID }) {

    const viewProfile = useQuery('GET_PROFILE' + personToBeViewedID, () => {
        const axios = authAxios()
        return axios.get(GET_USER_BY_USERNAME + personToBeViewedID)
    }, {
        enabled: !!personToBeViewedID
    })

    const posts = useQuery('GET_POSTS' + personToBeViewedID, () => {
        const axios = authAxios()
        return axios.get(GET_POSTS_BY_USERNAME + personToBeViewedID)
    }, {
        enabled: !!personToBeViewedID
    })
    return <>
        {personToBeViewedID ?
            <div style={{ minHeight: '100vh', width: '45%', background: 'white', borderRadius: '8px', marginTop: '10px' }}>
                <ArrowBack style={{ padding: '24px', paddingBottom: 0 }} onClick={() => setPersonToBeViewedID(null)} />

                {viewProfile?.data?.data ? <>
                    <div style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }}>
                            {viewProfile?.data?.data?.profilePicture ? <img src={IMAGE_PREFIX + viewProfile?.data?.data?.profilePicture.data} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="" /> : <AccountCircle style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
                            <span style={{ fontWeight: 600, marginTop: '8px' }}>{viewProfile.data.data.username}</span>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }}>
                            <span style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Followers</span>
                            <span>{viewProfile.data.data.followers.length}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '33%' }}>
                            <span style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Following</span>
                            <span>{viewProfile.data.data.following.length}</span>
                        </div>

                    </div>
                    <div style={{ background: 'white', paddingBottom: '12px', paddingLeft: '10%', width: '90%' }}>
                        <span style={{ marginTop: '8px' }}>{viewProfile.data.data.bio}</span>
                    </div>
                    {viewProfile?.data?.data && posts?.data?.data && posts.data.data.map(item => {
                        return <PostCard profilePic={viewProfile?.data?.data?.profilePicture?.data} id={item.id} hideUsername={true} image={IMAGE_PREFIX + item.image.data} caption={item.caption} />
                    })}
                </> : 'loading'}
            </div>
            : <div style={{ width: '45%', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '16px' }}>
                <NewPeople setPersonToBeViewedID={setPersonToBeViewedID} />
            </div>}
    </>;
}

export default People;
