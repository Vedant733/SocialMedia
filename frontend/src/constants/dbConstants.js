export const TOKEN = 'Authorization'


const HOST = 'http://localhost:8080/api'
export const AUTHENTICATE = HOST + '/auth/authenticate'
export const REGISTER = HOST + '/auth/register'
export const GET_CURRENT_USER = HOST + '/user/'
export const POST_CURRENT_USER = HOST + '/user/'
export const GET_POSTS_CURRENT_USER = HOST + '/posts/user'
export const POST_POSTS_CURRENT_USER = HOST + '/posts/'
export const GET_POSTS_BY_USERNAME = HOST + '/posts/user/'
export const GET_FEED = HOST + '/posts/feed/0/5' // /{page}/{size}
export const GET_ALL_POSTS = HOST + '/posts/0/5' // /{page}/{size}
export const LIKE_POST = HOST + '/likes/like/' // /{postid}
export const UNLIKE_POST = HOST + '/likes/unlike/'// /{postid}
export const GET_PROFILE_PICTURE = HOST + '/user/profile-picture'
export const POST_PROFILE_PICTURE = HOST + '/user/profile-picture'
export const GET_PROFILE_PICTURE_BY_USERNAME = GET_PROFILE_PICTURE + '/'
export const FOLLOW_USER = HOST + '/user/follow/' // /{id}
export const UNFOLLOW_USER = HOST + '/user/unfollow/'  // /{id}
export const SEARCH_BY_KEYWORD = HOST + '/user/users/' // /{page}/{size}/{searchKeyword}
export const POST_COMMENT = HOST + '/comments' // /{postid}
export const GET_COMMENTS = HOST + '/comments' // /{postid}/{page}/{size}
export const GET_NEW_USERS = HOST + '/user/users/0/5'
export const GET_USER_BY_USERNAME = HOST + '/user/'
export const GET_IS_LIKED = HOST + '/likes/isLiked/'
export const GET_NUMBER_OF_LIKES = HOST + '/likes/postLikes/'
export const GET_USER_AUTOCOMPLETE = HOST + '/user/autocomplete/5/'
export const GET_FOLLOWING_USERS = HOST + '/user/following'
export const GET_FOLLOWER_USERS = HOST + '/user/followers'

export const IMAGE_PREFIX = 'data:image/png;base64,'