import { AppHome } from './AppHome'
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Profile from "./Profile";
import PostModal from "../components/PostModal";
import People from '../components/People';
import Explore from './Explore';

function Home() {

    const [activeTab, setActiveTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const [personToBeViewedID, setPersonToBeViewedID] = React.useState(null)

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PostModal open={open} setOpen={setOpen} />
        <div style={{ maxWidth: 1500, width: '100%', backgroundColor: 'rgb(233 233 233)', flexDirection: 'column' }}>
            <Navbar personToBeViewed={personToBeViewedID} setPersonToBeViewedID={setPersonToBeViewedID} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} open={open} setOpen={setOpen} />
                {activeTab === 0 &&
                    <AppHome />
                }
                {activeTab === 1 &&
                    <Explore />
                }
                {activeTab === 2 &&
                    <People personToBeViewedID={personToBeViewedID} setPersonToBeViewedID={setPersonToBeViewedID} />
                }
                {activeTab === 3 && <div style={{ width: '45%', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '16px' }}>
                    <Profile />
                </div>}

            </div>
        </div></div>
}

export default Home;
