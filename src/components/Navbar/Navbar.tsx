import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { IUser } from "../../interfaces";

import CookieService from "../../services/CookieService";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";

import LogoBranca from "../../assets/conexao-inclusao-jaragua-icone-branco.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [user] = useState<IUser | null>(CookieService.getUser());

  const goHome = () => {
    navigate("/");
  };

  const getNameDisplay = () => {
    if (!user) return "";

    const name = user.name.split(" ");

    if (name.length > 1) return name[0][0] + name[name.length - 1][0];
    return name[0][0];
  };

  const getUserTip = () => {
    if (!user) return "Sign in";

    return user.name;
  };

  useEffect(() => {
    console.log("user", user);
  }, []);

  return (
    <AppBar position="static" id="navbar">
      <Toolbar className="justify-between h-16" id="container-items">
        <Box className="h-full flex items-center gap-2">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Tooltip title="Home" className="cursor-pointer" onClick={goHome}>
            <img className="h-2/3" src={LogoBranca} alt="Logo" />
          </Tooltip>
        </Box>

        <Box className="flex gap-6">
          <IconButton sx={{ color: "primary.contrast" }}>
            <NotificationsIcon />
          </IconButton>
          <Box className="flex">
            <Tooltip title={getUserTip()}>
              <Avatar sx={{ bgcolor: "primary.light" }}>
                {user ? getNameDisplay() : <PersonIcon />}
              </Avatar>
            </Tooltip>
            <IconButton size="small" sx={{ color: "primary.contrast" }}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
