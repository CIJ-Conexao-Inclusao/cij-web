import React, { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { SpaceHeader } from "../PageLayout.styled";
import { Drawer, ListItemStyled } from "./Sidebar.styled";

import { CONSTS, ROUTES } from "../../../constants";

import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import { ROLES } from "../../../constants/ROLES";
import { useSidebar } from "../../../hooks/useSidebar";
import { CookieService } from "../../../services";

type TSideBarItem = {
  name: string;
  path: string;
  icon: () => ReactNode;
  roles: ROLES[];
};

const Sidebar: React.FC = () => {
  const { open, setChanged } = useSidebar();
  const [selectedPage, setSelectedPage] = React.useState<string>("");

  const navigate = useNavigate();
  const role = CookieService.getRole();

  const handleNavigate = (path: string) => {
    navigate(path);
    setSelectedPage(path);
  };

  const sidebarItems: TSideBarItem[] = useMemo(() => {
    let userRole = ROLES.PERSON;
    if (role != null) userRole = role;

    return CONSTS.sidebarItems.filter((item) => item.roles.includes(userRole));
  }, [role]);

  return (
    <Drawer
      open={open}
      variant="permanent"
      PaperProps={{
        sx: { display: "flex", justifyContent: "space-between" },
      }}
      onTransitionEnd={() => setChanged((prev) => prev + 1)}>
      <Box>
        <SpaceHeader />
        <List sx={{ paddingLeft: "0" }} id="teste">
          {sidebarItems.map((item: TSideBarItem, index: number) => {
            return (
              <ListItemStyled sx={{
                height: "4rem",
                background: selectedPage === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
              }} key={index}>
                <ListItemButton
                  sx={{
                    padding: "12px",
                    height: "100%",
                  }}
                  onClick={() => handleNavigate(item.path)}>
                  <ListItemIcon
                    sx={{
                      minWidth: "0",
                      padding: "0 12px",
                    }}>
                    {item.icon()}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      sx={{
                        whiteSpace: "pre-line",
                      }}
                      disableTypography>
                      <Typography fontSize="16px">{item.name}</Typography>
                    </ListItemText>
                  )}
                </ListItemButton>
              </ListItemStyled>
            );
          })}
        </List>
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <ListItemButton
          sx={{ padding: "12px", height: "4rem" }}
          onClick={() => handleNavigate(ROUTES.help)}>
          <ListItemIcon
            sx={{
              minWidth: "0",
              padding: "0 12px",
            }}>
            <SupportOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          {open && (
            <ListItemText
              sx={{
                whiteSpace: "pre-line",
              }}
              disableTypography>
              <Typography fontSize="16px">Ajuda</Typography>
            </ListItemText>
          )}
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
