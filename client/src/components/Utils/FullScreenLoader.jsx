import { LoadingOverlay } from "@mantine/core";
import React from "react";

export const FullScreenLoader = ({ visible }) => {
  return (
    <div className="h-screen w-screen">
      <LoadingOverlay visible={visible} />
    </div>
  );
};
