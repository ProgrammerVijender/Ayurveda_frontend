import { Bell, FileText, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Latest Posts",
      icon: <FileText className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "Trending Posts",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "/dashboard?filter=trending",
    },
    {
      name: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/dashboard?tab=notifications",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-ayurveda-secondary p-4 sticky top-20">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link ${
              location.pathname === item.path ||
              location.search.includes(item.path.split("?")[1] || "") ? "active" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
