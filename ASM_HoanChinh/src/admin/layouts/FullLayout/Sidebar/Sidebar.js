import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";

import Menuitems from "./data";
import { useCookies } from "react-cookie";

const Sidebar = (props) => {
  const [cookie] = useCookies(["role"]);
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const filteredMenuitems = useMemo(() => {
    return Menuitems.filter((item) => {
      if (accounts.vai_tro === 2 && item.key === 2) {
        return false;
      }
      return true;
    }).map((item) => {
      return item;
    });
  }, [accounts.vai_tro, Menuitems]);

  const SidebarContent = (
      <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
        <Link to="/admin">
          <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
          >
            <h1 className="text-primary fw-bold">
              Food<span className="text-dark">S</span>
            </h1>
          </Box>
        </Link>

        <Box>
          <List
              sx={{
                mt: 0,
              }}
          >
            {filteredMenuitems.map((item, index) => (
                <div key={item.title}>
                  <List component="li" disablePadding>
                    <ListItem
                        button
                        component={NavLink}
                        to={item.href}
                        selected={window.location.pathname === item.href}
                        onClick={() => handleClick(index)}
                        sx={{
                          mb: 1,
                          ...(window.location.pathname === item.href && {
                            color: "white",
                            backgroundColor: (theme) =>
                                `${theme.palette.primary.main}!important`,
                          }),
                        }}
                    >
                      <ListItemIcon
                          sx={{
                            ...(window.location.pathname === item.href && {
                              color: "white",
                            }),
                          }}
                      >
                        <item.icon width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                      {item.children &&
                          item.title === "Giới thiệu" &&
                          (open[index] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItem>
                    {cookie.role === 0
                        ? item.children &&
                        item.title === "Giới thiệu" && (
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {item.children.map((child) => (
                                    <ListItem
                                        key={child.title}
                                        button
                                        component={NavLink}
                                        to={child.href}
                                        sx={{ pl: 4 }}
                                        selected={window.location.pathname === child.href}
                                    >
                                      <ListItemIcon
                                          sx={{
                                            ...(window.location.pathname ===
                                                child.href && {
                                                  color: "white",
                                                }),
                                          }}
                                      >
                                        <child.icon width="20" height="20" />
                                      </ListItemIcon>
                                      <ListItemText
                                          primary={child.title}
                                          style={{ fontWeight: "bold" }}
                                      />
                                    </ListItem>
                                ))}
                              </List>
                            </Collapse>
                        )
                        : item.children && (
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.children.map((child) => (
                                <ListItem
                                    key={child.title}
                                    button
                                    component={NavLink}
                                    to={child.href}
                                    sx={{ pl: 4 }}
                                    selected={window.location.pathname === child.href}
                                >
                                  <ListItemIcon
                                      sx={{
                                        ...(window.location.pathname ===
                                            child.href && {
                                              color: "white",
                                            }),
                                      }}
                                  >
                                    <child.icon width="20" height="20" />
                                  </ListItemIcon>
                                  <ListItemText
                                      primary={child.title}
                                      style={{ fontWeight: "bold" }}
                                  />
                                </ListItem>
                            ))}
                          </List>
                        </Collapse>
                    )}
                  </List>
                </div>
            ))}
          </List>
        </Box>
      </Box>
  );
  if (lgUp) {
    return (
        <Drawer
            anchor="left"
            open={props.isSidebarOpen}
            variant="persistent"
            PaperProps={{
              sx: {
                width: SidebarWidth,
              },
            }}
        >
          {SidebarContent}
        </Drawer>
    );
  }
  return (
      <Drawer
          anchor="left"
          open={props.isMobileSidebarOpen}
          onClose={props.onSidebarClose}
          PaperProps={{
            sx: {
              width: SidebarWidth,
            },
          }}
          variant="temporary"
      >
        {SidebarContent}
      </Drawer>
  );
};

export default Sidebar;