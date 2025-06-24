import React, { useState, useEffect } from 'react';

interface MobileMenuProps {
  currentPath: string;
  navigation?: Array<{title: string; link: string}>;
  buttons?: {
    scheduleConsultation?: string;
    scheduleOfficeHours?: string;
  };
}

export default function MobileMenu({ currentPath, navigation, buttons }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => currentPath === path;

  const navItems = navigation?.map(item => ({
    href: item.link,
    label: item.title
  })) || [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        
        {/* Menu panel */}
        <nav 
          className={`fixed top-0 right-0 bg-white h-full w-64 shadow-2xl transform transition-transform duration-300 ease-out border-l border-border ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100%-73px)]">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="mt-6 space-y-3">
              <button 
                className="w-full btn-primary" 
                data-cal-link="mindfulbalance/consultation"
                onClick={() => setIsOpen(false)}
              >
                {buttons?.scheduleConsultation || 'Schedule Consultation'}
              </button>
              <button 
                className="w-full btn-secondary" 
                data-cal-link="mindfulbalance/office-hours"
                onClick={() => setIsOpen(false)}
              >
                {buttons?.scheduleOfficeHours || 'Schedule Office Hours'}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}