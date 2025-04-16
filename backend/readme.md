## Project Structure

- `/src/routes`  
  ⟶ Defines all API routes (endpoints).

- `/src/controllers`  
  ⟶ Handles incoming requests and calls services.

- `/src/services`  
  ⟶ Contains business logic and interacts with repositories.

- `/src/repositories`  
  ⟶ Interacts with the database using models.

- `/src/models`  
  ⟶ Defines database schemas and entities.

- `/src/config`  
  ⟶ Includes database configuration, and other settings.

- `/src/middlewares`  
  ⟶ Middleware for authentication etc.

- `/src/utils`  
  ⟶ Utility functions and helpers.

## Files

- `app.js`  
  ⟶ Main application setup.

- `server.js`  
  ⟶ Entry point to start the server.

## Functional Requirements

### User Features

1. **User Authentication** – Secure login and registration.
2. **User Profile** – View user info like name, follower count.
3. **Edit Bio** – Users can manage their personal bio.
4. **Follow/Unfollow** – Users can follow or unfollow others.
5. **Search Users** – Search for users by username or name.

### Tweeting Features

6. **Create Tweet** – Users can post new tweets.
7. **Tweet Length Limit** – Max 270 characters.
8. **Image Upload** – Attach images to tweets.
9. **Retweeting** – Share others’ tweets.
10. **Comments** – Comment on tweets. (Nesting and mentioning(v2))
11. **Likes** – Like or unlike any tweet.
12. **Mentions** – Mention other users with `@username`.
13. **Hashtags** – Use hashtags in tweets.
14. **Hashtag Suggestions** – Based on content and trends.
15. **Search Tweets by Hashtag** – Find tweets via hashtag queries.
16. **Engagement Notifications** – Users receive notifications for likes, mentions, follows, and comments. (V2)

### Feed & Engagement

17. **Feeds** – Personalized timeline:
    - Tweets from followed users
    - Trending tweets
    - Suggested tweets
18. **Pagination** – Load tweets in chunks for performance.

### Advanced / System Features

19. **Server-Driven UI for A/B Testing** – Vary UI based on server configs.
20. **Analytics for A/B Testing** – Capture performance data in company DB.
21. **Sharding or Partitioning (v2)** – Scale the DB layer for high availability.