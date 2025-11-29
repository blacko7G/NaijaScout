import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import Button from "../../components/Button";

const AuthDashboard = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "player",
      title: "Player",
      description: "Showcase your skills and find opportunities",
      icon: "⚽",
      path: "/player/dashboard"
    },
    {
      id: "scout",
      title: "Scout",
      description: "Discover and evaluate talent",
      icon: "🔍",
      path: "/scout/profile"
    },
    {
      id: "fan",
      title: "Fan",
      description: "Follow players and stay updated",
      icon: "👥",
      path: "/fan/dashboard"
    },
    {
      id: "academy",
      title: "Academy",
      description: "Manage your academy and players",
      icon: "🏫",
      path: "/academy/dashboard"
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Store the selected role in localStorage
      localStorage.setItem("userRole", selectedRole.id);

      // Navigate to the login page, passing the role in state
      navigate("/auth/login", {
        state: { role: selectedRole.id },
        replace: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="special-font text-4xl md:text-6xl text-green-100 mb-4">
            Choose Your <b>R</b>ole
          </h1>
          <p className="text-green-100/70 text-lg max-w-2xl mx-auto">
            Select your role to access the appropriate dashboard and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={`relative cursor-pointer rounded-lg p-6 border-2 transition-all duration-300 ${
                selectedRole?.id === role.id
                  ? "border-white bg-green-900/50"
                  : "border-green-700 bg-green-900/20 hover:border-green-500"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{role.icon}</div>
                <div className="flex-1">
                  <h3 className="special-font text-xl text-green-100 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-green-100/70 text-sm">
                    {role.description}
                  </p>
                </div>
              </div>
              
              {selectedRole?.id === role.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            title="Continue to Dashboard"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-green-600 text-white rounded-lg hover:bg-white hover:text-green-600"
            onClick={handleContinue}
            disabled={!selectedRole}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthDashboard;
