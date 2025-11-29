import { Routes, Route, useLocation } from "react-router-dom";
import PlayerDashboard from "./pages/player/Dashboard.jsx";
import Sponsorship from "./pages/player/Sponsorships.jsx";
import Trials from "./pages/player/FindTrials.jsx";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PerformanceAnalytics from "./pages/player/PerformanceAnalytics.jsx";
import ScoutProfile from "./pages/scout/ScoutProfile.jsx";
import PlayerHologram from "./components/PlayerHologram.jsx";
import PlayerPool from "./components/PlayerPool.jsx";

// Placeholder dashboards (create these files as needed)
import FanDashboard from "./pages/fan/Dashboard.jsx";
import AcademyDashboard from "./pages/academy/Dashboard.jsx";

// Auth components
import Login from "@auth/Login.jsx";
import Register from "@auth/Register.jsx";
import ForgotPassword from "@auth/ForgotPassword.jsx";
import VerifyEmail from "@auth/VerifyEmail.jsx";
import AuthDashboard from "@auth/AuthDashboard.jsx";

function App() {
  const { pathname } = useLocation();
  const isPlayer = pathname.startsWith("/player");
  const isScout = pathname.startsWith("/scout");
  const isFan = pathname.startsWith("/fan");
  const isAcademy = pathname.startsWith("/academy");

  // Determine the current role from state or local storage (placeholder logic)
  const { state } = useLocation();
  const userRole = state?.role || localStorage.getItem("userRole") || "fan"; // Default to "fan" if not set

  // Navigation links based on role
  const playerLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/player/dashboard" },
    { name: "Trials", path: "/player/trials" },
    { name: "Sponsorships", path: "/player/sponsorships" },
    { name: "Analytics", path: "/player/analytics" },
  ];

  const scoutLinks = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/scout/profile" },
    { name: "Reports", path: "/scout/reports" },
    { name: "Players", path: "/scout/players" },
    { name: "Analytics", path: "/scout/analytics" },
    { name: "Settings", path: "/scout/settings" },
  ];

  const fanLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/fan/dashboard" },
    { name: "Feed", path: "/fan/feed" },
    { name: "Community", path: "/fan/community" },
    { name: "Predictions", path: "/fan/predictions" },
  ];

  const academyLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/academy/dashboard" },
    { name: "Players", path: "/academy/players" },
    { name: "Trials", path: "/academy/trials" },
    { name: "Settings", path: "/academy/settings" },
  ];

  // Determine which links to show based on the current role
  const links = isPlayer
    ? playerLinks
    : isScout
    ? scoutLinks
    : isFan
    ? fanLinks
    : isAcademy
    ? academyLinks
    : [];

  return (
    <main className="relative min-h-screen bg-black w-screen overflow-x-hidden font-circular">
      {!isScout && <NavBar variant={isPlayer ? "player" : isFan ? "fan" : isAcademy ? "academy" : undefined} links={links} />}
      <Routes>
        <Route path="/player/dashboard" element={<PlayerDashboard />} />
        <Route path="/player/sponsorships" element={<Sponsorship />} />
        <Route path="/player/trials" element={<Trials />} />
        <Route path="/player/analytics" element={<PerformanceAnalytics />} />
        <Route path="/player/hologram" element={<PlayerHologram />} />
        <Route path="/scout/profile" element={<ScoutProfile />} />
        <Route path="/scout/reports" element={<ScoutProfile />} />
        <Route path="/scout/players" element={<ScoutProfile />} />
        <Route path="/scout/analytics" element={<ScoutProfile />} />
        <Route path="/scout/settings" element={<ScoutProfile />} />
        <Route path="/fan/dashboard" element={<FanDashboard />} />
        <Route path="/fan/follow" element={<PlayerPool />} />
        <Route path="/academy/dashboard" element={<AcademyDashboard />} />
        <Route path="/academy/players" element={<PlayerPool />} />
        <Route path="/scout/add-player" element={<PlayerPool />} />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Story />
              <Contact />
              <Footer />
            </>
          }
        />
        {/* Add auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/dashboard" element={<AuthDashboard />} />
      </Routes>
    </main>
  );
}

export default App;