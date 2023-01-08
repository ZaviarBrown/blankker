import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweetThunk, editTweetThunk } from "../store/tweets";

const SingleTweet = ({
    tweet: { id, userId, text, username, likedByUsers },
}) => {
    // Redux Store
    const user = useSelector((store) => store.session.user);
    const dispatch = useDispatch();

    // Component's State
    const [showEdit, setShowEdit] = useState(false);
    const [tweetText, setTweetText] = useState(text);

    const handleEdit = () => {
        const data = {
            id,
            text: tweetText,
        };

        dispatch(editTweetThunk(data));
    };

    const handleDelete = () => {
        const data = {
            id,
        };

        dispatch(deleteTweetThunk(data));
    };

    return (
        <div>
            <h4>{username}</h4>
            {showEdit ? (
                <>
                    <textarea
                        value={tweetText}
                        onChange={(e) => setTweetText(e.target.value)}
                    ></textarea>
                    <button
                        onClick={() => {
                            setTweetText(text);
                            setShowEdit((prev) => !prev);
                        }}
                    >
                        Cancel Edit
                    </button>
                    <button
                        onClick={() => {
                            handleEdit();
                            setShowEdit((prev) => !prev);
                        }}
                    >
                        Submit Edit
                    </button>
                </>
            ) : (
                <p>{tweetText}</p>
            )}
            <div>
                {likedByUsers.length} Like
                {likedByUsers.length !== 1 ? "s" : null}
            </div>
            {user && user.id === userId && !showEdit ? (
                <>
                    <button
                        onClick={() => setShowEdit((prev) => !prev)}
                        style={{ display: "block" }}
                    >
                        Edit Tweet
                    </button>
                    <button
                        onClick={() => handleDelete()}
                        style={{ display: "block" }}
                    >
                        Delete Tweet
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default SingleTweet;
