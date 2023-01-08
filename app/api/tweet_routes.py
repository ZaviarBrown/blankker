from flask import Blueprint, request
from ..models import Tweet, db
from ..utils import Print
from flask_login import current_user

tweet_routes = Blueprint('tweets', __name__)


@tweet_routes.route('')
def get_all_tweets():
    tweets = Tweet.query.all()
    
    res = {tweet.id: tweet.to_dict() for tweet in tweets}

    return res


@tweet_routes.route('', methods=["POST"])
def create_tweet():
    new_data = request.json

    new_tweet = Tweet(**new_data, user_id=current_user.id)
    
    db.session.add(new_tweet)
    db.session.commit()
    
    # return new_tweet.to_dict()
    return {new_tweet.id: new_tweet.to_dict()}


@tweet_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
def edit_tweet_by_id(id):
    edit = request.json

    tweet = Tweet.query.get(id)
    
    if (tweet.user_id != current_user.id): 
        return {"msg":"You are not allowed to edit this tweet"}, 401 
    
    tweet.text = edit['text']
    
    db.session.commit()
    
    return {tweet.id: tweet.to_dict()}

@tweet_routes.route('/<int:id>', methods=['DELETE'])
def delete_tweet_by_id(id):
    tweet = Tweet.query.get(id)
    
    db.session.delete(tweet)
    db.session.commit()
    
    return {"msg": "Successfully deleted"}