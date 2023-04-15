import React from "react";
import { useQuery } from "react-query";
import { authAxios } from "../authAxios";
import { GET_NEW_USERS } from "../constants/dbConstants";
import { UsernameAndImageCard } from "./UsernameAndImageCard";

function NewPeople({ setPersonToBeViewedID }) {

    const { data: peopleList, isLoading } = useQuery('GET_NEW_PEOPLE_LIST', () => {
        const axios = authAxios()
        return axios.get(GET_NEW_USERS)
    })

    return isLoading ? <>Loading</>
        : <div style={{ width: '100%' }}>
            {peopleList.data.content.map((item) => {
                return <UsernameAndImageCard key={Math.random()} image={item.profilePicture?.data} username={item.username} setPersonToBeViewedID={setPersonToBeViewedID} />
            })}
        </div>;
}

export default NewPeople;
