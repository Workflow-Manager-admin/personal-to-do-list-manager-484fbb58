import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component.
 * Handles global state, authentication, and top-level layout.
 */
function App() {
  // Authenticated user state (null if not logged in)
  const [user, setUser] = useState(null);
  // Theme: 'light' | 'dark'
  const [theme, setTheme] = useState('light');
  // Sidebar collapsed/expanded
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handler: theme switch
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Handler: sidebar toggle
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={`main-app-container ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar
        user={user}
        onLogout={() => setUser(null)}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="main-content">
        {!user ? (
          <Auth onAuthSuccess={setUser} />
        ) : (
          <TodoList user={user} />
        )}
      </main>
    </div>
  );
}

export default App;
