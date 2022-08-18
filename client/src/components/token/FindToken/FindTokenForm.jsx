import { Button, Group, Input, Modal, Text } from "@mantine/core";
import React, { Fragment, useEffect, useState } from "react";
import { ImQrcode } from "react-icons/im";
import { BiSearch } from "react-icons/bi";
import { QRreader } from "../QR/QRreader";

import { isMobile } from "react-device-detect";

export const FindTokenForm = ({
  tokenInput,
  updateInput,
  setTokenInput,
  getToken,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrscan, setQrscan] = useState("empty");

  useEffect(() => {
    if (qrscan !== "empty") {
      getToken(qrscan);
    }
    return () => {
      setIsScanning(false);
    };
  }, [qrscan]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getToken(tokenInput);
  };
  return (
    <div className="w-full">
      <Text className="text-2xl font-semibold mb-3">Find Token</Text>

      <div>
        <form
          action=""
          className="flex justify-between gap-2 md:gap-3"
          onSubmit={handleFormSubmit}
        >
          <Input
            className="w-full"
            placeholder="Token Number"
            value={tokenInput}
            onChange={updateInput}
            size="lg"
            rightSection={
              <Button
                className="mr-20"
                leftIcon={<BiSearch size={18} />}
                size="md"
                type="submit"
                compact
              >
                Search
              </Button>
            }
          />
        </form>
        {isMobile && (
          <>
            <p className="text-center py-3 font-bold">Or</p>
            <Button
              onClick={() => {
                setIsScanning(true);
              }}
              fullWidth
              size="md"
              leftIcon={<ImQrcode size={22} />}
            >
              Scan QR Code
            </Button>
            <Modal centered opened={isScanning} withCloseButton={false}>
              <p className="text-lg text-center font-medium">
                Align QR Code in the frame.
              </p>
              <QRreader
                setQrscan={setQrscan}
                getToken={getToken}
                setIsScanning={setIsScanning}
              />
              <Button
                fullWidth
                size="lg"
                className="mt-2"
                color="red"
                onClick={() => {
                  setIsScanning(false);
                }}
              >
                Cancel
              </Button>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
