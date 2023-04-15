import { Button } from '@mui/material'
import React from 'react'
import { authAxios } from '../authAxios'
import { FOLLOW_USER, UNFOLLOW_USER } from '../constants/dbConstants'
import UserNameAndImage from './UserNameAndImage'

export const UsernameAndImageCard = ({ username, image, setPersonToBeViewedID }) => {
    const [isFollowing, setIsFollowing] = React.useState(false)
    return <div
        onClick={() => setPersonToBeViewedID(username)}
        style={{ background: 'white', borderRadius: '16px', width: '95%', padding: '12px', paddingRight: 0, margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <UserNameAndImage image={image} username={username} />
        <Button variant='contained' sx={{ margin: '12px' }} onClick={(e) => {
            const axios = authAxios()
            if (!isFollowing) {
                axios.get(FOLLOW_USER + username).then(() => setIsFollowing(true))
            }
            else {
                axios.get(UNFOLLOW_USER + username).then(() => setIsFollowing(false))
            }
            e.stopPropagation()
        }}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
    </div>
}
