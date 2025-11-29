import NavBar from "../../components/Navbar";
import Trials from "./FindTrials";
import PerformanceAnalytics from "./PerformanceAnalytics";
import PlayerCard from "./PlayerCard";
import VirtualTryout from "./VirtualTryout";
import Button from "../../components/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InjuryManagement from "./InjuryManagement";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation


gsap.registerPlugin(ScrollTrigger);

export default function PlayerDashboard() {
  const videoRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const animationFrameId = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  const playerLinks = [
    { name: "Home", path: "/" },
    { name: "Trials", path: "/player/trials" },
    { name: "Messages", path: "/player/messages" },
    { name: "Profile", path: "/player/profile" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      
      scrollVelocity.current = Math.abs(deltaY);
      lastScrollY.current = currentScrollY;
      
      if (videoRef.current) {
        const baseSpeed = 0.5;
        const maxSpeed = 3.0;
        const velocityMultiplier = Math.min(scrollVelocity.current / 10, maxSpeed);
        const newSpeed = baseSpeed + velocityMultiplier;
        
        videoRef.current.playbackRate = Math.max(0.1, Math.min(newSpeed, maxSpeed));
      }
    };

    const updateVideoSpeed = () => {
      if (videoRef.current && scrollVelocity.current > 0) {
        scrollVelocity.current *= 0.95;
        
        const baseSpeed = 0.5;
        const velocityMultiplier = Math.min(scrollVelocity.current / 10, 2.5);
        const newSpeed = baseSpeed + velocityMultiplier;
        
        videoRef.current.playbackRate = Math.max(0.1, Math.min(newSpeed, 3.0));
      }
      
      animationFrameId.current = requestAnimationFrame(updateVideoSpeed);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", () => {
        video.playbackRate = 0.5;
        window.addEventListener("scroll", handleScroll, { passive: true });
        updateVideoSpeed();
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Extracted Browse Sponsorships component
  const BrowseSponsorships = () => {
    const availableSponsors = [
      {
        name: "Lagos Sports Foundation",
        type: "Non-Profit Organization",
        amount: "₦300,000 - ₦800,000",
        period: "per year",
        icon: () => <span className="text-xl">❤️</span>,
        colorClasses: "from-red-400 to-red-600",
        location: "Lagos, Nigeria",
        focus: "Youth Development",
        requirements: ["Age 16-21", "Lagos State resident", "Academic performance", "Community involvement"],
        benefits: ["Training allowance", "Equipment support", "Educational assistance", "Mentorship program"],
      },
      {
        name: "First Bank Sports Scholarship",
        type: "Corporate Sponsor",
        amount: "₦500,000 - ₦1,200,000",
        period: "per year",
        icon: () => <span className="text-xl">🏢</span>,
        colorClasses: "from-blue-400 to-blue-600",
        location: "Nationwide",
        focus: "Elite Athletes",
        featured: true,
        requirements: ["Age 18-25", "State/National team level", "Academic excellence", "Leadership qualities"],
        benefits: ["Full tuition coverage", "Monthly stipend", "Professional coaching", "Career mentorship", "International exposure"],
      },
      {
        name: "Dangote Sports Initiative",
        type: "Private Foundation",
        amount: "₦200,000 - ₦600,000",
        period: "per year",
        icon: () => <span className="text-xl">👑</span>,
        colorClasses: "from-green-400 to-green-600",
        location: "Northern Nigeria",
        focus: "Grassroots Development",
        requirements: ["Age 14-20", "Northern states only", "Demonstrated talent", "Financial need"],
        benefits: ["Training facilities access", "Nutritional support", "Travel allowances", "Skills development"],
      },
      {
        name: "MTN Future Stars Program",
        type: "Corporate Sponsor",
        amount: "₦400,000 - ₦900,000",
        period: "per year",
        icon: () => <span className="text-xl">⭐</span>,
        colorClasses: "from-yellow-400 to-yellow-600",
        location: "Major Cities",
        focus: "Professional Pathway",
        requirements: ["Age 17-23", "Club level experience", "Social media presence", "Brand alignment"],
        benefits: ["Professional contracts", "Marketing opportunities", "Brand partnerships", "Media training"],
      },
    ];

    return (
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">Available Sponsors</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Explore sponsorship opportunities from Nigeria's leading organizations and take your football career to the next level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {availableSponsors.filter(sponsor => !sponsor.featured).map((sponsor, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${sponsor.colorClasses} flex items-center justify-center flex-shrink-0`}>
                      <sponsor.icon />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold leading-none tracking-tight text-xl mb-1">{sponsor.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{sponsor.type}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="text-sm">📍</span>
                        <span className="ml-1">{sponsor.location}</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {sponsor.amount}
                        <span className="text-sm font-normal text-gray-500">/{sponsor.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {sponsor.focus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              title="View All Sponsorships"
              containerClass="px-6 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => {
                console.log("Navigating to sponsorships...");
                navigate("/player/sponsorships");
              }}
            />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="font-general relative min-h-screen w-screen overflow-x-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
          }
        }}
      >
        <source src="/videos/playback.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 bg-black bg-opacity-50 min-h-screen">
        <NavBar variant="player" links={playerLinks} />
        <div className="flex flex-col items-center justify-center">
          <PlayerCard className="player-card" />
        </div>
        <PerformanceAnalytics className="performance-analytics mt-6" />
        <Trials className="find-trials" />
        <InjuryManagement className="injury-management mt-6" />
        <VirtualTryout className="virtual-tryout mt-6" />
        <BrowseSponsorships className="sponsorship mt-6" /> {/* Use the extracted component */}
      </div>
    </div>
  );
}