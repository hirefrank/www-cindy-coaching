import React, { useState, useEffect } from 'react';

interface MobileMenuProps {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on the body when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else if (!isAnimating) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isOpen && !isAnimating) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };
  }, [isOpen, isAnimating]);

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const openMenu = () => {
    setIsAnimating(true);
    setIsOpen(true);
    // Allow animation to start
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeMenu = () => {
    setIsAnimating(true);
    // Wait for animation to complete before changing state
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
    // Clean up after full animation cycle
    setTimeout(() => {
      setIsAnimating(false);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }, 300);
  };

  return (
    <>
      {/* Mobile menu button with smooth hamburger animation */}
      <button
        onClick={() => isOpen ? closeMenu() : openMenu()}
        className="md:hidden relative z-[60] p-2 rounded-lg hover:bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out transform ${
              (isOpen || isAnimating) ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out ${
              (isOpen || isAnimating) ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-out transform ${
              (isOpen || isAnimating) ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
            }`}
          />
        </div>
      </button>

      {/* Mobile menu overlay with staggered animations */}
      {(isOpen || isAnimating) && (
        <div className="md:hidden">
          {/* Backdrop with smooth fade */}
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out z-[9998] ${
              isOpen ? 'opacity-60' : 'opacity-0'
            }`}
            onClick={closeMenu}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          />
          
          {/* Menu panel with slide and scale animation */}
          <div 
            className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-2xl z-[9999] transition-all duration-300 ease-out transform ${
              isOpen 
                ? 'translate-x-0 opacity-100 scale-100' 
                : 'translate-x-full opacity-90 scale-95'
            }`}
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              bottom: 0,
              height: '100vh'
            }}
          >
            {/* Header with fade-in animation */}
            <div className={`flex items-center justify-between px-6 py-4 border-b border-border bg-background transition-all duration-300 delay-75 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}>
              <span className="text-lg font-semibold text-foreground px-4">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-muted transition-all duration-200 text-foreground hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 transition-transform duration-200 hover:rotate-90" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation content with staggered fade-in */}
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="p-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-base font-medium transition-all duration-300 hover:text-primary ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      } ${
                        isOpen 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-4'
                      }`}
                      style={{
                        transitionDelay: isOpen ? `${100 + index * 50}ms` : '0ms'
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                
                {/* CTA Buttons with delayed staggered animation */}
                <div className="mt-8 space-y-3">
                  <button 
                    className={`w-full btn-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      isOpen 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: isOpen ? '300ms' : '0ms'
                    }}
                    data-cal-link="cindy-romanzo/consultation"
                    onClick={closeMenu}
                  >
                    Schedule Consultation
                  </button>
                  <button 
                    className={`w-full btn-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      isOpen 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: isOpen ? '350ms' : '0ms'
                    }}
                    data-cal-link="cindy-romanzo/office-hours"
                    onClick={closeMenu}
                  >
                    Schedule Office Hours
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}