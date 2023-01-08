// const GET_TWEETS = "tweets/GET_TWEETS";
// const CREATE_TWEET = "tweets/CREATE_TWEET";

// const getTweets = (tweets) => {
//     return {
//         type: GET_TWEETS,
//         payload: tweets,
//     };
// };

// const createTweet = (data) => {
//     return {
//         type: CREATE_TWEET,
//         payload: data,
//     };
// };

let defaultState = {};

const LOAD_TWEETS = "tweets/LOAD_TWEETS";

const REMOVE_TWEET = "tweets/REMOVE_TWEET";

const loadTweets = (payload) => {
    return {
        type: LOAD_TWEETS,
        payload,
    };
};

const removeTweet = (payload) => {
    return {
        type: REMOVE_TWEET,
        payload,
    };
};

export const getAllTweetsThunk = () => async (dispatch) => {
    const res = await fetch("/api/tweets");

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTweets(data));
    }
};

export const createTweetThunk = (data) => async (dispatch) => {
    const newTweet = JSON.stringify(data);

    const res = await fetch("/api/tweets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: newTweet,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTweets(data));
    }
};

export const editTweetThunk = (data) => async (dispatch) => {
    const editTweet = JSON.stringify(data);

    const res = await fetch(`/api/tweets/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: editTweet,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadTweets(data));
    }
};

export const deleteTweetThunk = (data) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${data.id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeTweet(data));
    }
};

const tweetReducer = (state = defaultState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_TWEETS:
            return { ...newState, ...action.payload };
        case REMOVE_TWEET:
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    }
};

export default tweetReducer;
