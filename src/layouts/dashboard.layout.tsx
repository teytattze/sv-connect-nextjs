import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar, SidebarType } from '../components/sidebar';
import { Navbar } from '../components/navbar';
import { routes } from '../lib/routes.lib';

export interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: IDashboardLayoutProps) {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [sidebarStatus, setSidebarStatus] = useState<SidebarType>(
    SidebarType.DEFAULT
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (isMobileScreen) {
      setSidebarStatus(SidebarType.MODAL);
      setIsSidebarOpen(false);
    } else {
      setSidebarStatus(SidebarType.DEFAULT);
      setIsSidebarOpen(true);
    }
  }, [isMobileScreen]);

  const handleSidebarToggle = () => {
    if (isMobileScreen) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setSidebarStatus((prev) =>
        prev === SidebarType.DEFAULT
          ? SidebarType.MINIMIZE
          : SidebarType.DEFAULT
      );
    }
  };

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        routes={routes}
        type={sidebarStatus}
        handleToggle={handleSidebarToggle}
      />
      <Box
        sx={{
          width: `calc(100% - ${sidebarBoxWidthByType[sidebarStatus]})`,
          position: 'relative',
          float: 'right',
        }}
      >
        <Navbar title="Welcome" handleToggle={handleSidebarToggle} />
        <Box component="main">{children}</Box>
      </Box>
    </>
  );
}

const sidebarBoxWidthByType: Record<keyof typeof SidebarType, string> = {
  DEFAULT: '20rem',
  MINIMIZE: '6rem',
  MODAL: '0rem',
};
