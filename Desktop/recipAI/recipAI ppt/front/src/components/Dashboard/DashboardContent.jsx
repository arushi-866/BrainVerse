import React from 'react';
import { useSidebar } from '../../context/SidebarContext';

const DashboardContent = ({ children }) => {
  const { isOpen } = useSidebar();
  
  return (
    <div className={`flex-1 transition-all duration-300 ${
      isOpen ? 'ml-72' : 'ml-20'
    }`}>
      {children}
    </div>
  );
};

export default DashboardContent;
