import React, { useState, useContext } from "react";
import {
  AppShell,
  Navbar,
  Text,
  Group,
  ThemeIcon,
  Switch as SW,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { SideBar } from "../components/Dashboard/SideBar";
import { Route, Router, Routes, Switch } from "react-router-dom";
import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";

import AuthContext from "../Store/auth-context";
import { NewToken } from "../components/token/newToken/NewToken";
import { FindToken } from "../components/token/FindToken/FindToken";
import { AdminDashboard } from "../components/Dashboard/AdminDashboard";
import { UserDashboard } from "../components/Dashboard/UserDashboard";
import { TokenList } from "../components/token/Tokens/TokenList";
import { Moon } from "tabler-icons-react";

const Dashboard = ({ theme, setTheme }) => {
  const [opened, setOpened] = useState(false);
  const ctx = useContext(AuthContext);
  const USER_ROLE = ctx.cookies.user.role;
  const themeSwitchState = theme === "dark" ? true : false;

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 280, lg: 300 }}
        >
          <Navbar.Section>
            <SideBar setOpened={setOpened} />
          </Navbar.Section>
          <Navbar.Section grow mt="md"></Navbar.Section>
          <Navbar.Section>
            <Divider />
            <UnstyledButton
              onClick={onclick}
              sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              })}
            >
              <Group position="apart">
                <Group>
                  <ThemeIcon
                    color="transparent"
                    variant="light"
                    className="w-8 h-8"
                  >
                    <Moon />
                  </ThemeIcon>
                  <Text size="md">Darkmode</Text>
                </Group>
                <SW
                  color="gray"
                  checked={themeSwitchState}
                  onChange={setTheme}
                />
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      // footer={<Footer />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Routes>
        <Route
          path="/"
          exact
          element={
            USER_ROLE === "ADMIN" ? <AdminDashboard /> : <UserDashboard />
          }
        />
        <Route path="/verify-token" element={<FindToken />} />
        <Route path="/new-token" element={<NewToken />} />
        <Route path="/tokens" element={<TokenList />} />
        <Route path="*" element={<p>fgyhuji</p>} />
      </Routes>
    </AppShell>
  );
};

export default Dashboard;
