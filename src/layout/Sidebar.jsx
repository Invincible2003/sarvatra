import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-2 p-2 rounded hover:bg-blue-800";

  const activeClass = "bg-blue-900";

  return (
    <div className="w-60 bg-blue-950 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Sarvatra</h1>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          📊 Event Analysis
        </NavLink>

        <NavLink
          to="/correlation"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          📈 Correlation
        </NavLink>

        <NavLink
          to="/powerbi"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          💼 Power BI
        </NavLink>
      </nav>
    </div>
  );
}