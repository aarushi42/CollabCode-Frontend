import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/Chat";
import Premium from "./components/Premium";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Disclaimer from "./pages/Disclaimer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

function RootPage() {
  const user = useSelector((store) => store.user);
  return user ? <Feed /> : <Home />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}

function ProtectedRoute({ user, isAuthChecked, children }) {
  if (!isAuthChecked) return null;
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        setIsAuthChecked(true);
        return;
      }

      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch {
        // No active session is expected for guests.
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch, user]);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request"
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <Request />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <Premium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:targetUserId"
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <Provider store={appStore}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
