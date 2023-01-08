import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createTweetThunk } from "../store/tweets";

const CreateTweet = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [tooLong, setTooLong] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            text,
        };

        dispatch(createTweetThunk(data));
        history.push("/");
    };

    useEffect(() => {
        if (text.length > 280) {
            setTooLong(true);
        } else {
            setTooLong(false);
        }
    }, [text]);

    return (
        <form onSubmit={handleSubmit}>
            <label style={{ display: "block" }}>
                What do you want to say to the world?
            </label>
            {tooLong ? <h1>THIS TWEET IS TOOOOO LONG!!!!!</h1> : null}
            <textarea
                placeholder="Write a tweet!"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button style={{ display: "block" }} disabled={tooLong}>
                Tweet!
            </button>
        </form>
    );
};

export default CreateTweet;
