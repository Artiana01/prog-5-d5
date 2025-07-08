import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode, faBell, faBars, faUserCircle, faTachometerAlt, faHistory, faCog, faTimes // Added faTimes for mobile menu close
} from '@fortawesome/free-solid-svg-icons';

// Import components that will be rendered in the main content area
import Dashboard from '../components/Dashboard';
import RefactorForm from '../components/RefactorForm';
import ResultsDisplay from '../components/ResultsDisplay';
import HistoryTable from '../components/HistoryTable';

type SectionName = 'dashboard' | 'refactor' | 'results' | 'history';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<SectionName>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // State for user dropdown

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'refactor':
        // Pass a function to RefactorForm to allow it to change the section
        return <RefactorForm onRefactorComplete={() => setActiveSection('results')} />;
      case 'results':
        return <ResultsDisplay />;
      case 'history':
        return <HistoryTable />;
      default:
        return <Dashboard />;
    }
  };

  // Effect to close user menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('user-menu-dropdown');
      const button = document.getElementById('user-menu');
      if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const navLinkClasses = (sectionName: SectionName) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      activeSection === sectionName
        ? 'border-primary text-dark'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`;

  const mobileNavLinkClasses = (sectionName: SectionName) =>
    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
      activeSection === sectionName
        ? 'bg-primary-50 border-primary text-primary' // Adjusted to match original active mobile style
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
    }`;

  const sidebarLinkClasses = (sectionName: SectionName) =>
    `sidebar-link group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        activeSection === sectionName ? 'active' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`;


  return (
    <>
      <Head>
        <title>CodeRefactor - Plateforme de refactorisation</title>
        <meta name="description" content="CodeRefactor - Plateforme de refactorisation intelligente" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <FontAwesomeIcon icon={faCode} className="text-primary text-2xl mr-2" />
                  <span className="text-xl font-bold text-dark">CodeRefactor</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveSection('dashboard'); }}
                    className={navLinkClasses('dashboard')}
                  >
                    Tableau de bord
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveSection('refactor'); }}
                    className={navLinkClasses('refactor')}
                  >
                    Refactoriser
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveSection('history'); }}
                    className={navLinkClasses('history')}
                  >
                    Historique
                  </a>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">Notifications</span>
                  <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      className="bg-white rounded-full flex text-sm focus:outline-none"
                      id="user-menu"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <span className="sr-only">Ouvrir le menu utilisateur</span>
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    </button>
                  </div>
                  {userMenuOpen && (
                    <div
                      id="user-menu-dropdown"
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu" aria-orientation="vertical" aria-labelledby="user-menu"
                    >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Votre profil</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Paramètres</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Déconnexion</a>
                    </div>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  id="mobile-menu-button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Ouvrir le menu principal</span>
                  <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('dashboard'); setMobileMenuOpen(false); }} className={mobileNavLinkClasses('dashboard')}>Tableau de bord</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('refactor'); setMobileMenuOpen(false); }} className={mobileNavLinkClasses('refactor')}>Refactoriser</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('history'); setMobileMenuOpen(false); }} className={mobileNavLinkClasses('history')}>Historique</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">John Doe</div>
                  <div className="text-sm font-medium text-gray-500">john@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Votre profil</a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Paramètres</a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Déconnexion</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
              <div className="flex items-center flex-shrink-0 px-4">
                {/* <FontAwesomeIcon icon={faUserCircle} className="text-primary text-xl mr-2" /> */}
                {/* Using img as in original nav for consistency, or keep icon if preferred */}
                 <img className="h-8 w-8 rounded-full mr-2" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                <span className="font-medium text-gray-800">John Doe</span>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('dashboard'); }} className={sidebarLinkClasses('dashboard')}>
                    <FontAwesomeIcon icon={faTachometerAlt} className="text-gray-500 group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />
                    Tableau de bord
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('refactor'); }} className={sidebarLinkClasses('refactor')}>
                    <FontAwesomeIcon icon={faCode} className="text-gray-500 group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />
                    Refactoriser
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('history'); }} className={sidebarLinkClasses('history')}>
                    <FontAwesomeIcon icon={faHistory} className="text-gray-500 group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />
                    Historique
                  </a>
                  {/* The "Paramètres" link in sidebar was not in the top nav, adding it here for completeness based on sidebar HTML */}
                  <a href="#" className="sidebar-link group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                     <FontAwesomeIcon icon={faCog} className="text-gray-500 group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />
                    Paramètres
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 bg-gray-50">
            {renderSection()}
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
