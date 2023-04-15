import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IMAGE_PREFIX } from "../constants/dbConstants";

function UserNameAndImage({ image, username }) {

    return <div style={{ display: 'flex', alignItems: 'center' }}>

        {
            image
                ? <img src={IMAGE_PREFIX + image} width='50px' height='50px' alt="" style={{ borderRadius: '50%', marginRight: '16px' }} />
                : <AccountCircleIcon style={{ width: '50px', height: '50px', marginRight: '16px' }} />
        }
        <span>{username}</span>
    </div>;
}

export default UserNameAndImage;
