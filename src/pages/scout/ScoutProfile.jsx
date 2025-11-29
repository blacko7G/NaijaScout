"use client"

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaChartBar, FaRegEnvelope, FaSearch, FaUsers, FaBullseye, FaCalendar, FaBell, FaCog, FaPlus, FaCrown, FaSignOutAlt } from 'react-icons/fa';
import Feed from "../../components/Feed";

const Card = ({ children, className }) => <div className={`bg-black/20 border border-white/20 rounded-3xl p-6 ${className}`}>{children}</div>;
const Input = ({ className, ...props }) => <input className={`bg-white/10 border border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-green-500 focus:bg-white/15 ${className}`} {...props} />;
const Avatar = ({ children, className }) => <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>;
const AvatarFallback = ({ children, className }) => <div className={`bg-white/20 text-white text-sm flex items-center justify-center w-full h-full ${className}`}>{children}</div>;

export function ScoutProfile() {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [notifications, setNotifications] = useState({ trials: true, updates: false });
  const [profile, setProfile] = useState({ name: "John Doe", role: "Lead Scout" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".header", { opacity: 0, y: 50, duration: 1.2, ease: "power3.out", scrollTrigger: ".header" });
    gsap.from(".profile-card", { opacity: 0, x: -100, duration: 1.5, ease: "elastic.out(1, 0.3)", scrollTrigger: ".profile-card" });
    gsap.from(".settings", { opacity: 0, x: 100, duration: 1.5, ease: "back.out(1.7)", scrollTrigger: ".settings" });
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const mainMenu = [
    { name: "Profile", icon: <FaUsers className="mr-3" />, path: "/scout/profile" },
    { name: "Players", icon: <FaUsers className="mr-3" />, path: "/scout/players" },
    { name: "Trials", icon: <FaCalendar className="mr-3" />, path: "/scout/trials" },
  ];
  const toolsMenu = [
    { name: "Reports", icon: <FaFileAlt className="mr-3" />, path: "/scout/reports" },
    { name: "Analytics", icon: <FaChartBar className="mr-3" />, path: "/scout/analytics" },
  ];
  const quickActions = [
    { name: "Add Player", icon: <FaPlus className="mr-3" />, path: "/scout/add-player" },
    { name: "Schedule Trial", icon: <FaCalendar className="mr-3" />, path: "/scout/schedule-trial" },
    { name: "Send Message", icon: <FaRegEnvelope className="mr-3" />, path: "/scout/messages" },
  ];

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-fill opacity-50 bg-center bg-no-repeat" style={{ backgroundImage: `url('/img/logo.png')` }} />
      <div className="bg-black/50 absolute inset-0" />

      <div className="relative z-10 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 h-screen">
        {/* Left Sidebar */}
        <Card className="col-span-1 md:col-span-2 backdrop-blur-xl mt-9 bg-black/20 border border-white/20 rounded-3xl p-4 sm:p-6 h-fit flex flex-col">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <Link to="/" className="inline-block">
                <h1 className="text-xl sm:text-2xl font-bold text-white hover:text-green-400 transition-colors">NaijaScout</h1>
                <p className="text-white/60 text-xs sm:text-sm">Scout Hub</p>
              </Link>
            </div>
            <div>
              <h4 className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Main Menu</h4>
              <nav className="space-y-2">
                {mainMenu.map((item, index) => (
                  <Link key={index} to={item.path}>
                    <Button
                      containerClass={`w-full justify-start text-sm sm:text-base text-white/80 hover:bg-green-600 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02] ${window.location.pathname === item.path ? "bg-green-600/30 text-white" : ""}`}
                      onClick={() => setSelectedSection(item.name.toLowerCase())}
                    >
                     
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Tools</h4>
              <nav className="space-y-2">
                {toolsMenu.map((item, index) => (
                  <Link key={index} to={item.path}>
                    <Button containerClass="w-full justify-start text-sm sm:text-base text-white/80 hover:bg-green-600 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02]">
        
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 space-y-4 pt-2 sm:pt-4 border-t border-white/10">
     
            <Button containerClass="w-full justify-start text-sm sm:text-base text-white/80 hover:bg-green-600/20 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02]">
              <FaSignOutAlt className="mr-3" />
              Logout
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        <div className="col-span-1 mt-9 md:col-span-8 space-y-4 sm:space-y-6 h-screen overflow-y-auto">
          <Card className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl p-4 sm:p-6 header">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div>
                <p className="text-white/60 text-sm">Welcome back! Manage your scouting network</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-70 mb-4 sm:mb-0">
                  <Input placeholder="Search players..." className="w-full" />
                </div>
                <Button containerClass="w-full sm:w-auto text-white/80 hover:bg-green-600/20 hover:text-white">
                  <FaBell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl p-4 sm:p-6 profile-card">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <Avatar className="w-24 sm:w-32 h-24 sm:h-32 border-4 border-green-600">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left w-full sm:w-auto">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">{profile.name}</h3>
                <p className="text-white/60 text-sm">{profile.role}</p>
                <Button containerClass="mt-2 sm:mt-4 w-full sm:w-auto" onClick={() => setSelectedSection("settings")}>Edit Profile</Button>
              </div>
            </div>
          </Card>

          {selectedSection === "settings" && (
            <Card className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl p-4 sm:p-6 settings">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Settings</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-white/80 text-sm sm:text-base">Name</label>
                  <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1 sm:mt-2 w-full" />
                </div>
                <div>
                  <label className="text-white/80 text-sm sm:text-base">Role</label>
                  <Input value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} className="mt-1 sm:mt-2 w-full" />
                </div>
                <div>
                  <label className="text-white/80 text-sm sm:text-base">Notifications</label>
                  <div className="space-y-2 mt-1 sm:mt-2">
                    <label className="flex items-center text-white/80 text-sm sm:text-base">
                      <input type="checkbox" checked={notifications.trials} onChange={(e) => setNotifications({ ...notifications, trials: e.target.checked })} className="mr-2" />
                      Trial Applications
                    </label>
                    <label className="flex items-center text-white/80 text-sm sm:text-base">
                      <input type="checkbox" checked={notifications.updates} onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })} className="mr-2" />
                      Player Updates
                    </label>
                  </div>
                </div>
                <Button onClick={() => setSelectedSection("profile")} className="mt-3 sm:mt-4 w-full sm:w-auto">Save Changes</Button>
              </div>
            </Card>
          )}
        </div>

        <div className="col-span-1 mt-9 md:col-span-8 space-y-4 sm:space-y-6 h-screen overflow-y-auto">
       </div>

        {/* Right Sidebar */}
        <Card className="col-span-1 mt-9 md:col-span-2 backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl p-4 sm:p-6 h-fit">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path}>
                    <Button containerClass="w-full justify-start text-sm sm:text-base text-white/80 hover:bg-green-600/20 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02]">
                      {action.icon}
                      {action.name}
                    </Button>
                  </Link>
                ))}
              </div>

            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">Recent Activity</h3>
              <div className="space-y-2">
                {["Scouted Player", "Trial Scheduled"].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <p className="text-sm text-white">{activity} - 2 hrs ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ScoutProfile;