import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation for the app.
 * @param {object} props
 * @param {object} props.user - Current user object or null.
 * @param {function} props.onLogout - Callback for logout.
 * @param {boolean} props.sidebarOpen - Sidebar open/closed.
 * @param {function} props.toggleSidebar - Toggle sidebar.
 * @param {function} props.toggleTheme - Toggle light/dark.
 * @param {string} props.theme - Current theme.
 */
function Sidebar({
  user,
  onLogout,
  sidebarOpen,
  toggleSidebar,
  toggleTheme,
  theme,
}) {
  return (
    <aside className={`sidebar${sidebarOpen ? "" : " collapsed"}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">My To-Do</span>
        <button
          className="sidebar-toggle"
          tabIndex={0}
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "❮" : "❯"}
        </button>
      </div>
      <nav className="sidebar-nav">
        {user && (
          <div className="sidebar-user">
            <span className="sidebar-greeting">
              Hello, <strong>{user.name || user.username}</strong>
            </span>
          </div>
        )}
        <button
          className="sidebar-btn"
          onClick={toggleTheme}
          tabIndex={0}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        {user && (
          <button className="sidebar-btn logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </nav>
      <style>{`
        .sidebar {
          background: var(--bg-secondary, #f8f9fa);
          border-right: 1px solid var(--border-color, #e9ecef);
          color: var(--text-primary, #282c34);
          width: 220px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 1;
          transition: width 0.2s;
        }
        .sidebar.collapsed {
          width: 54px;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 1rem 0.6rem 1.3rem;
        }
        .sidebar-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1976d2;
        }
        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          color: #9c27b0;
        }
        .sidebar-nav {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: 1rem;
        }
        .sidebar-btn {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 0.45rem 0.75rem;
          margin-bottom: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .sidebar-btn:hover {
          background: #1560a7;
        }
        .logout-btn {
          background: #ff9800;
          color: #fff;
        }
        .logout-btn:hover {
          background: #f57c00;
        }
        .sidebar.collapsed .sidebar-title,
        .sidebar.collapsed .sidebar-user,
        .sidebar.collapsed .sidebar-btn {
          display: none;
        }
        .sidebar.collapsed .sidebar-toggle {
          margin-left: 8px;
        }
        .sidebar-user {
          font-size: 0.97rem;
          color: #9c27b0;
        }
        @media (max-width: 700px) {
          .sidebar {
            width: 54px;
          }
          .sidebar-title,
          .sidebar-user,
          .sidebar-btn {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
