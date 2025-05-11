# X-Clone Frontend

A modern, full-featured Twitter (X) clone frontend built using React, TypeScript, React Query, and React Router. This project replicates core user, tweet, and engagement functionalities, while supporting A/B testing and optimized performance.

## Functional Requirements

### User Features

- **Authentication**: Secure sign up & login (JWT-based).
- **Profile Viewing**: (Planned) See user bio, followers, and username.
- **Edit Bio**: (Planned) Interface to update user bio.
- **Follow/Unfollow**: (Planned) Button and logic to follow/unfollow users.
- **User Search**: (Planned) Search users by username or name.

### Tweeting Features

- **Create Tweet**: Compose and post new tweets.
- **270-Char Limit**: Validated on frontend.
- **Image Upload**: (Planned) Add media to tweets.
- **Retweet**: (Planned) Re-share tweets (original content preserved).
- **Comments**: (Planned) Reply to tweets (nesting and @mentions planned).
- **Likes**: (Planned) Like/unlike tweets.
- **Mentions**: (Planned) Syntax support for @username (highlighted UI coming).
- **Hashtags**: (Planned) Highlighted and extracted from tweet text.
- **Hashtag Suggestions**: (Planned) Shown as users type.
- **Search by Hashtag**: (Planned) Discover tweets by tag.

### Notifications (v2)

- Placeholder support for:

  - Mentions
  - Likes
  - Follows
  - Comments

### Feed & Engagement

- **Personalized Feed Tabs**:

  - For You
  - Trending
  - Following

- **Pagination**: (Planned) Load tweets in pages for better UX.
- **Post Composer**: Add tweets inline on the feed.
- **Shimmer UI**: Smooth loading experience with skeleton cards.

## A/B Testing Support

- **Client-side variant allocation** via `localStorage`.
- Components like CTA and Landing layout vary based on "A" or "B" assignment.
- (Planned) Server-driven A/B support & analytics integration.

## Tech Stack

| Area       | Tool/Library         |
| ---------- | -------------------- |
| Language   | TypeScript           |
| Framework  | React                |
| State      | React Query          |
| Routing    | React Router DOM     |
| API Client | Axios                |
| Styling    | TailwindCSS / Custom |
| Loaders    | React Spinners       |

## Project Structure

```bash
.
├── component/         # Reusable UI components (TweetCard, TabButton, etc.)
├── sections/          # Page-level components (Home, Login, Profile, etc.)
├── constants/         # Static constants (tabs, styles)
├── utils/             # API calls and helper functions
└── App.tsx            # Route declarations
```

---

## 🧪 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Backend expected on: http://localhost:3000/api/v1
```

## Roadmap (For Me)

- [ ] Profile editing
- [ ] Infinite scroll or "Load more" pagination
- [ ] Like, Comment, Retweet
- [ ] Hashtag Suggestion
- [ ] Media uploads (images/GIFs)
- [ ] Abuse Master (Ban the User)
- [ ] Explore page with search
- [ ] Advanced tweet search (hashtags, users)
- [ ] Real-time updates (WebSockets) (v2)
- [ ] Full notifications system (v2)
- [ ] Abuse reporting tools (v2)

## License

MIT License. Use freely with attribution.
