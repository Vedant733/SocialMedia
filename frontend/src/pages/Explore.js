import React from "react";
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";
import { PostCard } from "../components/PostCard";
import { GET_ALL_POSTS, IMAGE_PREFIX } from "../constants/dbConstants";

function Explore() {

    const { data: feed } = useQuery('EXPLORE', () => {
        const axios = authAxios()
        return axios.get(GET_ALL_POSTS)
    })

    return <div style={{ width: '45%', marginTop: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {feed && feed.data.map((item) => {
            return <PostCard id={item.id} image={IMAGE_PREFIX + item.image?.data} caption={item.caption} username={item.username} />
        })}
    </div>
}

export default Explore;
