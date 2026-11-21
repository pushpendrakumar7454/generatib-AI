import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {

    const { users } = useSelector((state) => state.auth);

    console.log("PROFILE USER:", users);

    return (
        <div>
            <h1>Name: {users?.name}</h1>
            <h2>Email: {users?.email}</h2>
        </div>
    );
};

export default Profile;