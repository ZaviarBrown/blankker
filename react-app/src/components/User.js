import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteThunk } from "../store/session";

function User() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user.id) {
        return null;
    }

    const handleDelete = () => {
        dispatch(deleteThunk(userId));
    };

    return (
        <>
            <ul>
                <li>
                    <strong>User Id</strong> {userId}
                </li>
                <li>
                    <strong>Username</strong> {user.username}
                </li>
                <li>
                    <strong>Email</strong> {user.email}
                </li>
                {user.tweets.map((tweet, i) => (
                    <li key={tweet.id}>
                        <h4>Tweet #{i + 1}</h4> {tweet.text}
                    </li>
                ))}
            </ul>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
}
export default User;
