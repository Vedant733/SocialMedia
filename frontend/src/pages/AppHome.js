import React from 'react'
import { useQuery } from 'react-query'
import { authAxios } from '../authAxios'
import { PostCard } from '../components/PostCard'
import { GET_FEED, IMAGE_PREFIX } from '../constants/dbConstants'

export const AppHome = () => {

    const { data: feed } = useQuery('GET_FEED', () => {
        const axios = authAxios()
        return axios.get(GET_FEED)
    })

    return <div style={{ width: '45%', marginTop: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {feed && feed.data.map((item) => {
            return <PostCard key={item.id} id={item.id} image={IMAGE_PREFIX + item.image?.data} profilePic={IMAGE_PREFIX + item.image.data} caption={item.caption} username={item.username} />
        })}
    </div>
}
