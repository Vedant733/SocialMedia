import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function Landing() {

    const navigate = useNavigate()

    return <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <h1 style={{ fontSize: '60px', color: 'red' }}>NotSoSocial</h1>
        </div>
        <div style={{ width: '50%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "center" }}>
            <h1 style={{ paddingLeft: '20%', }}>A social media app.</h1>
            <div style={{ marginLeft: '20%', display: 'flex' }}>
                <Button variant="contained" sx={{ marginTop: '12px', }} onClick={() => navigate("/login")}>Login</Button>
                <Button variant="contained" sx={{ marginTop: '12px', marginLeft: '10%' }} onClick={() => navigate("/register")}>Register</Button>
            </div></div>
    </div>;
}

export default Landing;
