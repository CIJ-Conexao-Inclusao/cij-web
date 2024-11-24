import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, IconButton, Toolbar } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import {
  AppBar,
  BoxLeft,
  BoxRight,
  BoxUser,
  PersonIconStyled,
} from "./Navbar.styled";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logoWhiteIcon from "../../../assets/logo-white-icon.png";

import ModalUser from "./ModalUser";

import { ROUTES } from "../../../constants";
import "./Navbar.scss";

type TModalUser = {
  open: boolean;
  anchorEl: null | HTMLElement;
};

const Navbar: React.FC<{ open: boolean; handleSidebarChange: () => void }> = ({
  open,
  handleSidebarChange,
}) => {
  const navigate = useNavigate();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const [modalUser, setModalUser] = useState<TModalUser>({
    open: false,
    anchorEl: null,
  });

  const goHome = () => {
    navigate(ROUTES.home);
  };

  const getNameDisplay = () => {
    if (!user) return "";

    const name = user.name.split(" ");

    if (name.length > 1) return name[0][0] + name[name.length - 1][0];
    return name[0][0];
  };

  const handleCloseModalUser = () => {
    setModalUser({ ...modalUser, open: false });
  };

  const openModalUser = (e: React.MouseEvent<HTMLElement>) => {
    setModalUser({ ...modalUser, open: true, anchorEl: e.currentTarget });
  };

  return (
    <>
      <ModalUser
        anchorEl={modalUser.anchorEl}
        open={modalUser.open}
        handleClose={handleCloseModalUser}
      />

      <AppBar sx={{ height: "4rem" }} position="fixed" open={open} id="navbar">
        <Toolbar
          sx={{
            alignItems: "centrer",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 1rem",
          }}>
          <BoxLeft>
            <IconButton
              sx={{ marginRight: "0.5rem" }}
              onClick={handleSidebarChange}
              size="large"
              edge="start"
              color="inherit">
              <MenuOutlinedIcon />
            </IconButton>

            <img
              className="logo-white-icon"
              src={logoWhiteIcon}
              alt="Logo"
              onClick={goHome}
            />
          </BoxLeft>

          <BoxRight>
            <BoxUser onClick={openModalUser}>
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                }}>
                {user ? getNameDisplay() : <PersonIconStyled />}
              </Avatar>

              <IconButton size="small" sx={{ color: "primary.contrast" }}>
                <ArrowDropDownIcon />
              </IconButton>
            </BoxUser>
          </BoxRight>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
