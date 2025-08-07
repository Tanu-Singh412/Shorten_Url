import React from "react";
import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-xl border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Scissors className="text-white" size={24} />
          </div>
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent hover:from-blue-100 hover:to-white transition-all duration-300"
          >
            URL Shortener
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
