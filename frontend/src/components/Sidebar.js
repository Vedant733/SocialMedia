import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { authAxios } from "../authAxios";
import { GET_CURRENT_USER, IMAGE_PREFIX } from "../constants/dbConstants";
import './Sidebar.css'

const activeNavTab = { backgroundColor: 'transparent', borderLeft: '10px solid red', fontWeight: 800, color: 'red' }

function Sidebar({ activeTab, setActiveTab, setOpen }) {

    const navigate = useNavigate()

    const { data: user, isLoading } = useQuery('GET_PROFILE', () => {
        const axios = authAxios()
        return axios.get(GET_CURRENT_USER)
    }, {
        onError: () => {
            navigate("/")
        },
        retry: false
    })

    return isLoading ? <></> : <div style={{ width: '20%', height: '100vh' }}>
        <div style={{
            display: 'grid', justifyItems: 'start', margin: '10px',
            borderRadius: '16px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            background: 'white', padding: '10px 24px',
            height: '70px', borderLeft: '2px solid red',
            borderRight: '2px solid red', transition: '.5s all,1s display',
            ...(activeTab === 3 ? { height: 0, opacity: 0, padding: 0 } : {})
        }}>
            <div style={{ borderRadius: '16px5', display: 'flex', alignItems: 'center', ...(activeTab === 3 ? { height: 0, opacity: 0, padding: 0 } : {}) }}>
                {user?.data?.profilePicture?.data ? <img src={IMAGE_PREFIX + user?.data?.profilePicture?.data} width='50px' height='50px' alt="" style={{ borderRadius: '50%', marginRight: '16px' }} /> : <AccountCircle style={{ width: '60px', height: '60px', marginRight: '16px' }} />}
                <div><span>{user?.data?.username}</span><br />
                    <span>{user?.data?.firstname} {user?.data?.lastname}</span></div>
            </div>
        </div>
        <div style={{ margin: '10px', borderRadius: '16px', cursor: 'pointer' }}>
            <Box onClick={() => { setActiveTab(0) }} sx={{ fontSize: '18px', transition: '.5s all', borderLeft: '10px solid white', background: 'white', ...(activeTab === 0 ? activeNavTab : {}), boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '10px 24px', height: '40px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                Home
            </Box>
            <Box onClick={() => { setActiveTab(1) }} sx={{ fontSize: '18px', transition: '.5s all', borderLeft: '10px solid white', background: 'white', ...(activeTab === 1 ? activeNavTab : {}), boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '10px 24px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                Explore
            </Box>
            <Box onClick={() => { setActiveTab(2) }} sx={{ fontSize: '18px', transition: '.5s all', borderLeft: '10px solid white', background: 'white', ...(activeTab === 2 ? activeNavTab : {}), boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '10px 24px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                People
            </Box>

            <Box onClick={() => { setActiveTab(3) }} sx={{ fontSize: '18px', transition: '.5s all', borderLeft: '10px solid white', background: 'white', ...(activeTab === 3 ? activeNavTab : {}), boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '10px 24px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px' }}>
                Profile
            </Box>
        </div>
        <div className='card' onClick={() => setOpen(true)}>
            <div className='card-content'>
                <div className="card-title">Add a post</div>
            </div>
        </div>
    </div>;
}

export default Sidebar;
