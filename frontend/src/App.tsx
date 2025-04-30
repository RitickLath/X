import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeRedirected, ProtectedRoute } from "./component/component";
import {
  Bookmark,
  Explore,
  Home,
  Landing,
  Login,
  Message,
  NotFound,
  Notification,
  Post,
  Profile,
  Signup,
} from "./sections/Section";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Related Routes */}
        <Route element={<HomeRedirected />}>
          {/* Landing page when user not logged in */}
          <Route path="/" element={<Landing />} />

          {/* Login form with landing page in BG in low opacity */}
          <Route path="/login" element={<Login />} />

          {/* Signup form with landing page in Bg low opacity */}
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Shows the basic Feed page with whats happening*/}
          <Route path="/home" element={<Home />} />

          {/* Explore - Shows the trending hashtahgs with search functionality*/}
          <Route path="/explore" element={<Explore />} />

          {/* Notifications */}
          <Route path="/notifications" element={<Notification />} />

          {/* Messages */}
          <Route path="/messages" element={<Message />} />

          {/* Profile - Contains My tweets and my reshares*/}
          <Route path="/profile" element={<Profile />} />

          {/* Let us compose the post with Landing page bg low opacity */}
          <Route path="/compose/post" element={<Post />} />

          {/* Bookmarks- Shows the tweets user bookmarked */}
          <Route path="/bookmarks" element={<Bookmark />} />
        </Route>
        {/* Error Page/ Invalid Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
