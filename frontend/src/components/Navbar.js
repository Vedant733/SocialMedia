import { LogoutOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router";
import { TOKEN } from "../constants/dbConstants";
import './Navbar.css'

function Navbar({ showBar }) {

    const navigate = useNavigate()

    return <div style={{ background: 'white', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
        <span style={{ fontSize: '26px', paddingLeft: '14%', color: 'red', }}>NotSoSocial</span>

        <input className="inputField" style={{ width: '42%', marginRight: '13%', fontSize: '16px', padding: '12px', borderRadius: '50px' }} />
        <div style={{ position: 'absolute', right: '10%' }} onClick={() => {
            localStorage.clear(TOKEN)
            return navigate("/")
        }} ><LogoutOutlined /></div>
    </div>
}

export default Navbar;
