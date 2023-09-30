import React from 'react'
import UserNameAndImage from './UserNameAndImage'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';
// import AddCommentIcon from '@mui/icons-material/AddComment'
// import ShareIcon from '@mui/icons-material/Share'
import { useQuery } from 'react-query';
import { authAxios } from '../authAxios';
import { GET_IS_LIKED, GET_NUMBER_OF_LIKES, GET_PROFILE_PICTURE_BY_USERNAME, LIKE_POST, UNLIKE_POST } from '../constants/dbConstants';

export const PostCard = ({ id, hideUsername, image, caption, username, profilePic }) => {

    const { refetch } = useQuery('IsLiked' + id, () => {
        const axios = authAxios()
        return axios.get(GET_IS_LIKED + id)
    }, {
        onSuccess: (res) => setLike(res.data)
    })

    const { data: numberOfLikes, refetch: getNumberOfLikes } = useQuery('NumberOfLikes' + id, () => {
        const axios = authAxios()
        return axios.get(GET_NUMBER_OF_LIKES + id)
    })

    const [like, setLike] = React.useState(false)
    const [likeTransition, setLikeTransition] = React.useState(false)
    const { data: getProfilePic } = useQuery('ProfilePic' + id, () => {
        const axios = authAxios()
        return axios.get(GET_PROFILE_PICTURE_BY_USERNAME + username)
    },)

    return <div key={id} style={{ background: 'white', width: '90%', borderRadius: '16px', padding: '12px 24px', margin: '8px', marginBottom: '0' }}>
        {!hideUsername && <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <UserNameAndImage username={username} image={getProfilePic?.data.data} />
        </div>
        }<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><img src={image} alt="" style={{ width: '100%', aspectRatio: 1.5, borderRadius: '16px' }} /></div>
        <div style={{ marginTop: '12px' }}>
            {like ?
                <div style={{ display: 'inline-flex' }}>
                    <FavoriteIcon htmlColor='red' style={{ marginRight: '8px' }} onClick={() => {
                        const axios = authAxios()
                        setLikeTransition(false)
                        axios.get(UNLIKE_POST + id).then(() => { refetch(); getNumberOfLikes() })
                    }} />
                    {likeTransition && <FavoriteIcon className='liked_icon' htmlColor='red' style={{ position: 'absolute', transition: '.5 all' }} />}
                </div>
                :
                <FavoriteBorderIcon style={{ marginRight: '8px' }} onClick={() => {
                    const axios = authAxios()
                    setLikeTransition(true)
                    axios.get(LIKE_POST + id).then(() => { refetch(); getNumberOfLikes() })
                }} />

            }
            {/* <AddCommentIcon style={{ marginRight: '8px' }} />
            <ShareIcon /> */}
        </div>
        {numberOfLikes?.data === 1 ? <span style={{ marginLeft: '8px' }}>{numberOfLikes?.data} Like</span> : numberOfLikes?.data === 0 ? <></> : <span style={{ marginLeft: '8px' }}>{numberOfLikes?.data} Likes</span>}
        <div style={{ marginTop: '12px', marginLeft: '8px', marginBottom: '12px' }}>{caption}</div>
        <hr />
    </div>
}
