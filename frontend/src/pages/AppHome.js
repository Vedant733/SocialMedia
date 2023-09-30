import React from 'react'
import { useQuery } from 'react-query'
import { authAxios } from '../authAxios'
import { PostCard } from '../components/PostCard'
import { GET_FEED, IMAGE_PREFIX } from '../constants/dbConstants'
import { Typography } from '@mui/material'

export const AppHome = () => {

    const { data: feed, isLoading } = useQuery('GET_FEED', () => {
        const axios = authAxios()
        return axios.get(GET_FEED)
    })
    return <div style={{ width: '40%', marginTop: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column', overflowY: 'scroll', overflowX: 'hidden', minHeight: '100px', height: `${window.innerHeight - 80}px` }}>
        {isLoading && <>Loading</>}
        {feed && feed.data.map((item) => {
            return <PostCard key={item.id} id={item.id} image={IMAGE_PREFIX + item.image?.data} profilePic={IMAGE_PREFIX + item.image.data} caption={item.caption} username={item.username} />
        })}
        {feed && feed.data?.length === 0 && <Typography color='black'>Follow People To See Their Posts</Typography>}
    </div>
}
