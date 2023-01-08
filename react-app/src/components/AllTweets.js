import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTweetsThunk } from "../store/tweets";
import SingleTweet from "./SingleTweet";

const AllTweets = () => {
    const dispatch = useDispatch();
    const tweets = useSelector((entireReduxStore) => {
        return Object.values(entireReduxStore.tweets);
    });

    useEffect(() => {
        dispatch(getAllTweetsThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>New Home Page</h1>
            {tweets.map((tweet) => (
                <SingleTweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
};

export default AllTweets;
