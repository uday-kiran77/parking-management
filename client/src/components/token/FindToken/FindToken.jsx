import React, { useContext, useState } from "react";
import { FindTokenForm } from "./FindTokenForm";
import axios from "axios";
import AuthContext from "../../../Store/auth-context";
import { TokenDetails } from "./TokenDetails";
import { AiOutlineClose } from "react-icons/ai";
import { BiExit, BiErrorAlt } from "react-icons/bi";
import { Button, Modal } from "@mantine/core";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Notification } from "../../Notification/Notification";

export const FindToken = () => {
  const ctx = useContext(AuthContext);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenDetails, setTokenDetails] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateInput = (e) => {
    setTokenInput(e.target.value);
  };
  const getTokenHandler = (tokenId) => {
    setTokenDetails();
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/token/${tokenId}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: ctx.cookies.user.token,
        },
      })
      .then((res) => {
        setTokenDetails(res.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          return Notification({
            title: "Unable to Find Token",
            message: "Please Check the Token ID",
            color: "red",
            icon: <AiOutlineClose />,
          });
        }

        Notification({
          title: "Error!",
          message: "Unable to process the request.",
          color: "red",
          icon: <BiErrorAlt />,
        });
      });
  };
  const vehOnExit = () => {
    const id = tokenDetails.id;
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/token/exit/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: ctx.cookies.user.token,
        },
      })
      .then((res) => {
        setTokenDetails((prev) => {
          return { ...prev, ...res.data };
        });
        setIsModalOpen(true);
      })
      .catch((e) => {
        // console.log(e);
        if (e.response.status === 404) {
          return Notification({
            title: "Unable to Find Token",
            message: "Please Check the Token ID",
            color: "red",
            icon: <AiOutlineClose />,
          });
        }

        Notification({
          title: "Error!",
          message: "Unable to process the request.",
          color: "red",
          icon: <BiErrorAlt />,
        });
      });
  };

  const handleCloseModal = () => {
    setTokenInput("");
    setTokenDetails();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg">
      <FindTokenForm
        tokenInput={tokenInput}
        updateInput={updateInput}
        setTokenInput={setTokenInput}
        getToken={getTokenHandler}
      />
      {tokenDetails && (
        <>
          <TokenDetails token={tokenDetails} />
          {!tokenDetails.exitIssued && (
            <Button
              fullWidth
              onClick={vehOnExit}
              className="w-60 my-4"
              size="md"
              rightIcon={<BiExit size={22} />}
              color="red"
            >
              Issue Exit
            </Button>
          )}
        </>
      )}

      {isModalOpen && tokenDetails && (
        <Modal
          opened={isModalOpen}
          className="text-center"
          withCloseButton={false}
          onClose={() => {
            return false;
          }}
        >
          <BsFillCheckCircleFill
            color="lightgreen"
            className="mx-auto"
            size={55}
          />

          <p className="text-2xl underline font-bold mt-4">Exit Success</p>
          <p className="text-lg font-bold mt-4">Please Collect The payment</p>
          <p className="text-lg font-bold mt-2 ">
            {tokenDetails.amount ? tokenDetails.amount : "0"} $
          </p>
          <Button fullWidth mt={25} mb={8} size="md" onClick={handleCloseModal}>
            Done
          </Button>
        </Modal>
      )}
    </div>
  );
};
