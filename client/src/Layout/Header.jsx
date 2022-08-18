import { Link } from "react-router-dom";
import { Button, Group, Header as MantineHeader } from "@mantine/core";
import AuthContext from "../Store/auth-context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { Text, MediaQuery, Burger } from "@mantine/core";
export const Header = ({ opened, setOpened }) => {
  const ctx = useContext(AuthContext);
  const location = useLocation().pathname;
  return (
    <MantineHeader height={60}>
      <div className=" flex justify-between items-center px-4 py-3">
        <div className="flex items-center h-full">
          {ctx.isLoggedIn && (
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((prevState) => !prevState)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
          )}

          <p>Parking System</p>
        </div>
        <div>
          {!ctx.isLoggedIn && location === "/login" && (
            <Link to="/register" className="">
              <Button className="text-md">Register</Button>
            </Link>
          )}
          {!ctx.isLoggedIn && location === "/register" && (
            <Link to="/login" className="">
              <Button className="text-md">Login</Button>
            </Link>
          )}

          {ctx.isLoggedIn && location !== "/login" && location !== "/login" && (
            <Button className="text-md" onClick={ctx.onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </MantineHeader>
  );
};
