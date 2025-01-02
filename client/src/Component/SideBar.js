import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { PiStudentBold } from "react-icons/pi";
import Icon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUserDispatch } from '../redux/dispatch/userdispatch';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'var(--appbar-background-color)', 

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      backgroundColor: '#11316',
      color: '#FFFFFF',
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const SideBar = () => {
  const theme = useTheme();
  const common = useSelector((state) => state?.user);
  const { showSidebar } = useUserDispatch();
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    showSidebar(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    showSidebar(false);
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setActive(path);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authorization');
    if (!authToken) {
      navigate('/');
    } else {
      navigate(active);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('authorization', "");
    localStorage.setItem('isLogin', 'false');
    navigate("/")
  }
  const roleId = common?.userLoginData?.role_id;

  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Student', icon: <PiStudentBold />, path: '/student' },
    { text: 'Profile', icon: <SettingsIcon />, path: '/profile' },
    { text: 'Fees', icon: <Icon />, path: '/fees' },

  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={common?.sidebarOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(common?.sidebarOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>P</Avatar>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={common?.sidebarOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarItems.map((item) => {
            if (roleId == '2' && item.text === 'Student') {
              return null; // Hide Student for role_id 2
            }
            if (roleId == '1' && item.text === 'Profile') {
              return null; 
            }
            if (roleId == '1' && item.text === 'Fees') {
              return null; 
            }
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: common?.sidebarOpen ? 'initial' : 'center',
                    px: 2.5,
                    color: location.pathname === item.path ? 'white' : '#02143A',
                    backgroundColor: location.pathname === item.path ? 'var(--appbar-background-color)' : 'transparent',
                    '&:hover': {
                      backgroundColor: location.pathname === item.path ? '#02143A' : 'lightgray',
                    },
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? 'white' : 'var(--appbar-background-color)',
                      minWidth: 0,
                      mr: common?.sidebarOpen ? 3 : 'auto',
                      justifyContent: 'center',
                      fontSize: "25px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: common?.sidebarOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar