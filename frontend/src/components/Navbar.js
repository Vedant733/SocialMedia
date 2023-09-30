import { LogoutOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router";
import { GET_USER_AUTOCOMPLETE, IMAGE_PREFIX, TOKEN } from "../constants/dbConstants";
import './Navbar.css'
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";

function Navbar({ personToBeViewedID, setPersonToBeViewedID, setActiveTab }) {

    const navigate = useNavigate()
    const [searchText, setSearchText] = React.useState('')
    const [options, setOptions] = React.useState([])
    useQuery(searchText, () => {
        if (searchText === '') return;
        const axios = authAxios()
        return axios.get(GET_USER_AUTOCOMPLETE + searchText)
    },
        {
            onSuccess: (res) => {
                if (!res) return;
                setOptions(res.data.content)
            },
            retry: 0
        }
    )

    return <div style={{ alignSelf: 'center', width: '70%', paddingLeft: '21%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '4%' }}>
        <span className="special_text" style={{ fontSize: '26px', }}>NotSoSocial</span>
        <Autocomplete
            disablePortal
            freeSolo
            id="combo-box-demo"
            options={options}
            renderOption={(props, option, state) => {
                return <div onClick={() => {
                    setOptions([])
                    setPersonToBeViewedID(option[0])
                    setActiveTab(2)
                }} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px', margin: '.5rem 0' }}>
                    {
                        option[1]?.data ? <img width="44px" height="44px" style={{ borderRadius: '50%' }} src={IMAGE_PREFIX + option[1]?.data} alt="" />
                            : <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'gray' }} />
                    }
                    {option[0]}
                </div>
            }}
            sx={{
                width: '45.8%',
            }}
            renderInput={(params) => <TextField {...params}
                placeholder="Look For A Friend"
                onChange={(event) => {
                    if (event.target?.value?.length === 0) setOptions([])
                    setSearchText(event.target.value)
                }}
                sx={{
                    background: 'white', borderRadius: '4px', border: "1px solid rgba(138,43,226, 1)",
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { border: "none" },
                    },
                }} />}
        />
        <div style={{}} onClick={() => {
            localStorage.clear(TOKEN)
            return navigate("/")
        }} ><LogoutOutlined sx={{
            borderRadius: "50%",
            cursor: 'pointer'
        }} /></div>
    </div>
}

export default Navbar;
