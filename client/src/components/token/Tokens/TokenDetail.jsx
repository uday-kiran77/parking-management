import { Box, Container, Group, Modal, Paper, Text } from "@mantine/core";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { TbMotorbike } from "react-icons/tb";
import date from "date-and-time";
import { TokenDetails } from "../FindToken/TokenDetails";

export const TokenDetail = ({ token, onTokenClick }) => {
  var vehIcon;

  switch (token.vehType) {
    case "bike":
      vehIcon = <TbMotorbike className="text-4xl" />;
      break;
    case "car":
      vehIcon = <AiOutlineCar className="text-4xl" />;
      break;
    case "truck":
      vehIcon = <FiTruck className="text-4xl" />;
      break;

    default:
      break;
  }
  const handleViewTokenDetails = () => {
    onTokenClick(token.id);
  };
  return (
    <Paper
      shadow="md"
      p="lg"
      my="md"
      withBorder
      onClick={handleViewTokenDetails}
      className="cursor-pointer"
    >
      <Group position="apart">
        <div className="flex flex-col">
          <Text className="font-semibold text-xl mb-2">{token.vehNumber}</Text>
          <Text className=""> #{token.id}</Text>
          <Text className="">
            {date.format(new Date(token.createdAt), "ddd, MMM DD YYYY")}
          </Text>
          {token.createdBy && <Text className="">{token.createdBy}</Text>}{" "}
          {token.exitIssued !== 0 && (
            <Text className="font-semibold " color="green">
              {token.exitIssued ? "Exit Issued" : ""}
            </Text>
          )}
        </div>
        <Group>{vehIcon}</Group>
      </Group>
    </Paper>
  );
};
