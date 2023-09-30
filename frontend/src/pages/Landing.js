import React from "react";
import Login from "./Login";
import LandingImg from '../assets/landing.svg'
function Landing() {

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="landing_container" style={{ maxWidth: 1500, width: 'clamp(900px,100%,1500px)', height: '100vh', display: 'flex' }}>
            <div className='landing_img' style={{ width: '50%', height: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <img src={LandingImg} alt="" width="60%" style={{ aspectRatio: 1 }} />
            </div>
            <div style={{ width: '40%', height: 'auto' }}><Login /></div>
        </div>
    </div>
}

export default Landing;
