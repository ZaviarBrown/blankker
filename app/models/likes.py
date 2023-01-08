from .db import db, environment, SCHEMA, add_prefix_for_prod

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False),
    db.Column('tweets', db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')), primary_key=True, nullable=False)
)

if environment == "production":
    likes.schema = SCHEMA