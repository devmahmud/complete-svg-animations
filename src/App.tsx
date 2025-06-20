import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import Playground from './pages/Playground';
import { CourseProvider } from './context/CourseContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-dark-50">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex h-[calc(100vh-70px)]">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`
              fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto w-full lg:w-auto">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/module/:moduleId" element={<ModuleView />} />
                  <Route path="/playground" element={<Playground />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;
