import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

const navItems = [
  { name: "Dashboard", icon: "ri-home-line", path: "/dashboard" },
  { name: "Trending", icon: "ri-fire-line", path: "/dashboard/trending" },
  { name: "Nutrient Chart", icon: "ri-bar-chart-line", path: "/dashboard/nutrients" },
  { name: "Cooklet", icon: "ri-shopping-basket-line", path: "/dashboard/ingredients" },
  { name: "Recipe Suggestions", icon: "ri-restaurant-line", path: "/dashboard/recipes/suggestions" }, // Added this line
  { name: "Pantry Manager", icon: "ri-store-2-line", path: "/dashboard/leftovers" },
  { name: "Community", icon: "ri-team-line", path: "/dashboard/community" },
  { name: "Favourites", icon: "ri-book-2-line", path: "/dashboard/recipes/favorites" },

  // { name: "Settings", icon: "ri-settings-line", path: "/dashboard/settings" },
];

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <button
        className="fixed top-4 left-4 z-40 p-2 rounded-xl bg-primary text-white shadow-lg md:hidden hover:bg-primary-dark transition-colors duration-300"
        onClick={() => setIsOpen(true)}
      >
        <i className="ri-menu-line text-xl" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full flex flex-col transition-all duration-300 ease-in-out
        bg-gradient-to-b from-primary to-primary-dark border-r border-white/10
        ${isOpen ? 'w-72' : 'w-20'}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-5 border-b border-white/10 bg-primary-dark/50 overflow-hidden">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300">
              <i className="ri-chef-hat-line text-xl text-white" />
            </div>
            <span className={`text-xl font-bold text-white transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              RecipAI
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4">
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${location.pathname === item.path
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <i className={`${item.icon} text-lg ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white'
                }`} />
                <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        
      </aside>
    </>
  );
};

export default Sidebar;
