import { Divider, Paper, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TbTicket } from "react-icons/tb";

import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";
import { BiErrorAlt } from "react-icons/bi";
import { Notification } from "../Notification/Notification";

export const UserDashboard = () => {
  const ctx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState({
    todayCount: "0",
    totalCount: "0",
  });

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/dashboard`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: ctx.cookies.user.token,
        },
      })
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch((e) => {
        // console.log(e);
        Notification({
          title: "Error!",
          message: "Unable to process the request.",
          color: "red",
          icon: <BiErrorAlt />,
        });
      });

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <p className="text-2xl font-semibold">Dashboard</p>
      <Divider size="xs" className="my-2" />
      <p className="text-xl font-semibold capitalize">
        Hello, {ctx.cookies.user.name}
        &nbsp;👋
      </p>

      <div className="mt-4 flex flex-col md:flex-row max-w-screen-md gap-5">
        <Paper shadow="md" radius="md" p="lg" withBorder className="flex-1">
          <div className="flex justify-between items-center pb-4 ">
            <TbTicket size="32" />
            <p className="text-2xl font-semibold ml-12">Todays Tickets</p>
          </div>
          <Divider />
          <div className="pt-4 flex justify-end items-center">
            {loading ? (
              <Skeleton height={22} radius="xl" className="w-12" />
            ) : (
              <p className="text-3xl font-semibold font-mono ">
                {dashboard.todayCount}
              </p>
            )}
          </div>
        </Paper>
        <Paper shadow="md" radius="md" p="lg" withBorder className="flex-1">
          <div className="flex justify-between items-center pb-4 ">
            <TbTicket size="32" />
            <p className="text-2xl font-semibold ml-12">My Total Tickets</p>
          </div>
          <Divider />
          <div className="pt-4 flex justify-end items-center">
            {loading ? (
              <Skeleton height={22} radius="xl" className="w-12" />
            ) : (
              <p className="text-3xl font-semibold font-mono ">
                {dashboard.totalCount}
              </p>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};
