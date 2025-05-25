"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      aria-hidden={false}
      color="primary"
      sx={{ backgroundColor: "#1e1e2f", width: "100%" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          FantasyLedger
        </Typography>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography variant="subtitle1" color="inherit">
            Logged in as: <strong>{username || "..."}</strong>
          </Typography>
        </Box>

        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            disableScrollLock
            disableEnforceFocus
            disableAutoFocus
            disableAutoFocusItem
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  backgroundColor: "#2e2e3f",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
