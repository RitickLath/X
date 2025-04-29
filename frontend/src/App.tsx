import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./sections/Landing";
import ProtectedRoute from "./component/ProtectedRoute";
import HomeRedicted from "./component/HomeRedicted";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Related Routes */}
        <Route element={<HomeRedicted />}>
          {/* Landing page when user not logged in */}
          <Route path="/" element={<Landing />} />

          {/* Login form with landing page in BG in low opacity */}
          <Route path="/login" element={<Landing />} />

          {/* Signup form with landing page in Bg low opacity */}
          <Route path="/signup" element={<Landing />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Shows the basic Feed page with whats happening*/}
          <Route path="/home" element={<h1>Home</h1>} />

          {/* Explore - Shows the trending hashtahgs with search functionality*/}
          <Route path="/explore" element={<h1>Explore</h1>} />

          {/* Notifications */}
          <Route path="/notifications" element={<h1>Notifications</h1>} />

          {/* Messages */}
          <Route path="/messages" element={<h1>Messages</h1>} />

          {/* Profile - Contains My tweets and my reshares*/}
          <Route path="/:username" element={<h1>Profile</h1>} />

          {/* Let us compose the post with Landing page bg low opacity */}
          <Route path="/compose/post" element={<h1>Compose Post</h1>} />

          {/* Bookmarks- Shows the tweets user bookmarked */}
          <Route path="/bookmarks" element={<h1>Bookmarks</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
