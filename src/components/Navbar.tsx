// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)'); // Проверка на мобильный экран

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  const menuItems = [
    { text: 'Главная', href: '/' },
    { text: 'Художники', href: '/artists' },
    { text: 'Галерея', href: '/gallery' },
    { text: 'Контакты', href: '/contacts' },
  ];

  return (
    <>
      {/* AppBar для десктопа */}
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Art Moon
          </Typography>

          {/* На мобильных скрываем кнопки, показываем бургер */}
          {!isMobile ? (
            <Box>
              {menuItems.map((item) => (
                <Button
                  color="inherit"
                  component={Link}
                  href={item.href}
                  key={item.text}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          ) : (
            <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (бургер-меню) для мобильной версии */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItemButton
              component={Link}
              href={item.href}
              key={item.text}
              onClick={() => toggleDrawer(false)}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
