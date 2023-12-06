"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Switch } from "@mui/material";
import { useTheme } from "next-themes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import UserMenu from "./UserMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import AuthButton from "./AuthButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useBetwixtAuth } from "@/hooks/useBetwixtAuth";

const pages = ["Products", "Pricing", "Blog"];

function ResponsiveAppBar() {
    const DARK = "dark";
    const LIGHT = "light";

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    // const [theme, setTheme] = React.useState<"dark" | "light" | null>(null);
    const { theme, setTheme } = useTheme();
    const cartContext = React.useContext(SlidingCartContext);
    const {user, loading, error, authToken} = useBetwixtAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenCart = () => {
        console.log(cartContext);
        cartContext.onClose(cartContext.open);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleTheme = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        console.log(theme);
        if (theme === DARK) {
            localStorage.setItem("theme", LIGHT);
            setTheme(LIGHT);
            return;
        }
        localStorage.setItem("theme", DARK);
        setTheme(DARK);
    };

    return (
        <AppBar
            position="static"
            className="bg-blue-600 dark:bg-gray-950 dark:border-gray dark:shadow-none"
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters variant="dense">
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiMenu-paper": {
                                    backgroundColor:
                                        theme === DARK ? "#212121" : "white",
                                    color: theme === DARK ? "white" : "black",
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                        className="px-3 mx-3 dark:bg-slate-900 dark:rounded-lg"
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 0.5,
                                    color: "white",
                                    display: "block",
                                }}
                                className="hover:underline"
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            sx={{
                                my: 0.5,
                                color: "white",
                                display: "block",
                                right: 0
                            }}
                            onClick={handleTheme}
                        >
                            <LightModeIcon
                                sx={{ fontSize: 30 }}
                                className="
                                dark:hidden
                                text-cyan-5 hover:text-gray-300
                                hover:cursor-pointer
                                "
                            />
                            <DarkModeIcon
                                sx={{ fontSize: 30 }}
                                className="
                                hidden dark:flex
                                text-cyan-50
                                hover:text-gray-300
                                hover:cursor-pointer
                                "
                            />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            !loading && <UserMenu
                                theme={theme}
                                anchorElUser={anchorElUser}
                                onOpenCart={() => handleOpenCart()}
                                onOpenUserMenu={(
                                    event: React.MouseEvent<HTMLElement>
                                ) => handleOpenUserMenu(event)}
                                onCloseUserMenu={() => handleCloseUserMenu()}
                                onChangeTheme={(e: React.SyntheticEvent) =>
                                    handleTheme(e)
                                }
                            />
                        ) : (
                            !loading && <AuthButton />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
