import React from 'react';
import NavBar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const AcademyDashboard = () => {
  const navigate = useNavigate();
  const academyLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/academy/dashboard" },
    { name: "Players", path: "/academy/players" },
    { name: "Trials", path: "/academy/trials" },
    { name: "Settings", path: "/academy/settings" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavBar variant="academy" links={academyLinks} />
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="special-font text-4xl md:text-6xl text-green-100 mb-4">
              Academy <b>D</b>ashboard
            </h1>
            <p className="text-green-100/70 text-lg max-w-2xl mx-auto">
              Manage your academy, players, and trials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-2">Total Players</h3>
              <p className="text-green-100/70 text-3xl font-bold">24</p>
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-2">Active Trials</h3>
              <p className="text-green-100/70 text-3xl font-bold">3</p>
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-2">Applications</h3>
              <p className="text-green-100/70 text-3xl font-bold">12</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-yellow-300 text-black rounded-lg py-2 hover:bg-yellow-400 transition-colors">
                  Post New Trial
                </button>
                <button className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors">
                  View Applications
                </button>
                <button onClick={() => navigate('/academy/players')} className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors">
                  Manage Players
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="text-green-100/70 text-sm">
                  <p>New application received</p>
                  <p className="text-xs">2 hours ago</p>
                </div>
                <div className="text-green-100/70 text-sm">
                  <p>Trial session completed</p>
                  <p className="text-xs">1 day ago</p>
                </div>
                <div className="text-green-100/70 text-sm">
                  <p>Player profile updated</p>
                  <p className="text-xs">2 days ago</p>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-100 text-xl font-bold mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="text-green-100/70 text-sm">
                  <p>U-16 Trial Session</p>
                  <p className="text-xs">Tomorrow, 3:00 PM</p>
                </div>
                <div className="text-green-100/70 text-sm">
                  <p>Scout Meeting</p>
                  <p className="text-xs">Friday, 10:00 AM</p>
                </div>
                <div className="text-green-100/70 text-sm">
                  <p>Player Assessment</p>
                  <p className="text-xs">Next Monday, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDashboard;
