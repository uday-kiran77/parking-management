import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Store/auth-context";
import { BiErrorAlt, BiExit } from "react-icons/bi";
import { TokenDetail } from "./TokenDetail";
import { Button, Group, Input, Loader, Modal } from "@mantine/core";
import { TokenDetails } from "../FindToken/TokenDetails";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useInputState } from "@mantine/hooks";

import SearchResults from "react-filter-search";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Notification } from "../../Notification/Notification";

export const TokenList = () => {
  const ITEM_LIMIT = 10;
  const ctx = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);

  const [itemsStart, setItemsStart] = useState(0);
  const [haveTokens, setHaveTokens] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loadingTokens, setLoadingTokens] = useState(true);

  const [searchString, setSearchString] = useInputState("");

  function fetchTokens(params) {
    var start = params.start || itemsStart;
    var reset = params.reset || false;
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tokens?start=${start}&limit=${ITEM_LIMIT}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: ctx.cookies.user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.length < ITEM_LIMIT || res.data.length === 0) {
          setHaveTokens(false);
        }
        if (reset) setTokens(res.data);
        else
          setTokens((prevState) => {
            var token = [...prevState, ...res.data];
            // setTokensCopy(token);
            return token;
            // return [];
          });
      })
      .catch((e) => {
        Notification({
          title: "Error!",
          message: "Unable t0 process the request.",
          color: "red",
          icon: <BiErrorAlt />,
        });
        setTokens([]);
      });
  }

  useEffect(() => {
    setLoadingTokens(true);

    setTimeout(() => {
      fetchTokens({ start: itemsStart });
      setLoadingTokens(false);
    }, 1000);
  }, [itemsStart]);

  function loadItemsHandler() {
    setItemsStart((prevState) => {
      return prevState + ITEM_LIMIT;
    });
  }

  const onExitIssue = () => {
    setLoadingTokens(true);
    var id = modalData.data.id;
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/token/exit/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: ctx.cookies.user.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setModalData((prev) => {
          return { exit: true, data: { ...prev.data, ...res.data } };
        });
        setLoadingTokens(false);
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
        setLoadingTokens(false);
      });
  };

  const handleTokenClick = (id) => {
    var token = tokens.filter((e) => {
      return e.id === id;
    });

    var data = { exit: false, data: token[0] };
    setModalData(data);
    // console.log(data);
    setIsModalOpen(true);
  };

  const resetData = () => {
    setIsModalOpen(false);
    setItemsStart(0);
    fetchTokens({ reset: true });
    setModalData({});
  };

  const ModalContent = () => {
    if (loadingTokens) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      );
    }
    if (modalData.exit) {
      return (
        <div className="text-center">
          <BsFillCheckCircleFill
            color="lightgreen"
            className="mx-auto"
            size={55}
          />

          <p className="text-2xl underline font-bold mt-4">Exit Success</p>
          <p className="text-lg font-bold mt-4">Please Collect The payment</p>
          <p className="text-lg font-bold mt-2 ">
            {modalData.data.amount ? modalData.data.amount : "0"} $
          </p>
          <Button
            fullWidth
            mt={25}
            mb={8}
            size="md"
            onClick={() => {
              resetData();
            }}
          >
            Done
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="text-center w-fit mx-auto ">
          {modalData.data && <TokenDetails token={modalData.data} />}
        </div>
        <Group grow className="mt-6">
          <Button
            size="md"
            color="red"
            rightIcon={<AiOutlineClose />}
            onClick={() => {
              setIsModalOpen(false);
              setModalData({});
            }}
          >
            Close
          </Button>
          {!modalData.data.exitIssued && ctx.cookies.user.role === "ADMIN" && (
            <Button size="md" rightIcon={<BiExit />} onClick={onExitIssue}>
              Issue Exit
            </Button>
          )}
        </Group>
      </>
    );
  };

  const notFoundError = (
    <p className="text-center text-xl font-semibold mt-4">No Tokens Found!</p>
  );

  if (loadingTokens && tokens.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );

  return (
    <>
      <Input
        type="text"
        value={searchString}
        onChange={setSearchString}
        autoComplete="false"
        spellCheck="false"
        placeholder="Search Token"
        size="md"
        icon={<AiOutlineSearch size={20} className="ml-2 " />}
        rightSection={
          <>
            {searchString && (
              <Button
                className="mr-10"
                color="red"
                compact
                onClick={() => {
                  setSearchString("");
                }}
              >
                Cancel
              </Button>
            )}
          </>
        }
      />
      <SearchResults
        value={searchString}
        data={tokens}
        renderResults={(results) => (
          <div>
            {results.length === 0 && notFoundError}
            {results.map((el) => (
              <TokenDetail
                token={el}
                onTokenClick={handleTokenClick}
                key={Math.random()}
              />
            ))}
          </div>
        )}
      />
      {haveTokens && tokens.length !== 0 && (
        <Button
          onClick={loadItemsHandler}
          size="md"
          fullWidth
          my={18}
          {...(loadingTokens && { loading: loadingTokens })}
        >
          Load More
        </Button>
      )}
      {isModalOpen && (
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          withCloseButton={false}
        >
          <ModalContent />
        </Modal>
      )}
    </>
  );
};
