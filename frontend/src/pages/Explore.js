import React from "react";
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";
import { PostCard } from "../components/PostCard";
import { GET_ALL_POSTS, IMAGE_PREFIX } from "../constants/dbConstants";

function Explore() {

    const { data: feed } = useQuery('EXPLORE', () => {
        const axios = authAxios()
        return axios.get(GET_ALL_POSTS)
    }, {
        refetchOnReconnect: false
    })

    return <div style={{ width: '40%', marginTop: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column', overflowY: 'scroll', overflowX: 'hidden', minHeight: '100px', height: `${window.innerHeight - 80}px` }}>
        {feed && feed.data.map((item) => {
            return <PostCard key={item.id} id={item.id} image={IMAGE_PREFIX + item.image?.data} caption={item.caption} username={item.username} />
        })}
    </div>
}

export default Explore;
