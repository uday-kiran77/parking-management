import React, { useContext } from "react";
import {
  Ticket,
  ListDetails,
  LayoutDashboard,
  ZoomCheck,
  Logout,
} from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

export const SideBar = ({ setOpened }) => {
  const ctx = useContext(AuthContext);

  const USER_ROLE = ctx.cookies.user.role;

  function MainLink({ icon, color, label, location, onclick }) {
    return (
      <Link to={location}>
        <UnstyledButton
          onClick={onclick}
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon color={color} variant="light" className="w-8 h-8">
              {icon}
            </ThemeIcon>

            <Text size="md">{label}</Text>
          </Group>
        </UnstyledButton>
      </Link>
    );
  }
  const closeSidebar = () => {
    setOpened((prevState) => !prevState);
  };
  const ADMIN_DASHBOARD = [
    {
      icon: <LayoutDashboard size={16} />,
      color: "pink",
      label: "Dashboard",
      location: "/",
      onclick: closeSidebar,
    },

    {
      icon: <ZoomCheck size={20} />,
      color: "blue",
      label: "Verify Token",
      location: "/verify-token",
      onclick: closeSidebar,
    },
    {
      icon: <Ticket size={16} />,
      color: "violet",
      label: "New Token",
      location: "/new-token",
      onclick: closeSidebar,
    },
    {
      icon: <ListDetails size={16} />,
      color: "teal",
      label: "Tokens",
      location: "/tokens",
      onclick: closeSidebar,
    },
    {
      icon: <Logout size={16} />,
      color: "red",
      label: "Logout",
      location: "/login",
      onclick: ctx.onLogout,
    },
  ];

  const USER_DASHBOARD = [
    {
      icon: <LayoutDashboard size={16} />,
      color: "pink",
      label: "Dashboard",
      location: "/",
      onclick: closeSidebar,
    },

    {
      icon: <Ticket size={16} />,
      color: "violet",
      label: "New Token",
      location: "/new-token",
      onclick: closeSidebar,
    },
    {
      icon: <ListDetails size={16} />,
      color: "teal",
      label: "Tokens",
      location: "/tokens",
      onclick: closeSidebar,
    },
    {
      icon: <Logout size={16} />,
      color: "red",
      label: "Logout",
      location: "/login",
      onclick: ctx.onLogout,
    },
  ];
  const data = USER_ROLE === "ADMIN" ? ADMIN_DASHBOARD : USER_DASHBOARD;
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};
