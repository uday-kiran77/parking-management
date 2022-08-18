import React, { useContext, useState } from "react";
import { VehicleType } from "./VehicleType";
import { Button, Divider, Group, Input, Modal } from "@mantine/core";
import AuthContext from "../../../Store/auth-context";
import { AiOutlineClose, AiOutlineNumber } from "react-icons/ai";
import { useInputState } from "@mantine/hooks";
import { BiPrinter } from "react-icons/bi";
import { FaReceipt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import date from "date-and-time";
import QRCode from "qrcode";
import { Notification } from "../../Notification/Notification";

export const NewToken = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [token, setToken] = useState();

  const [vehicleNum, setVehicleNum] = useInputState("");
  const [vehicleType, setVehicleType] = useInputState("bike");

  // const [entryDate, setEntryDate] = useInputState(new Date());
  // const [entryTime, setEntryTime] = useInputState(new Date());

  const submitHandler = (e) => {
    e.preventDefault();
    var token = {};
    // validate
    if (!vehicleNum || !vehicleType) {
      return Notification({
        title: "Error!",
        message: "Please Fillout all fields",
        color: "red",
        icon: <AiOutlineClose />,
      });
    }
    token.vehNum = vehicleNum;
    token.vehType = vehicleType;
    // token.entryDate = entryDate;
    // token.entryTime = entryTime;

    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/new-token`, token, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: ctx.cookies.user.token,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setModalOpened(true);

          var data = response.data;
          setToken(data);

          QRCode.toDataURL(data.id, { margin: 1 }, function (err, url) {
            if (err) throw err;
            setToken((prev) => {
              return { ...prev, qr: url };
            });
          });
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const printServiceCall = () => {
    Notification({
      title: "Printing Token",
      message: '"Call Print Service in function..."',
      color: "green",
      icon: <BiPrinter />,
    });
    setModalOpened(false);
    navigate("/");
  };
  const resetForm = () => {
    navigate("/");
  };

  const clearForm = () => {
    setModalOpened(false);
    setVehicleNum("");
    setVehicleType("bike");
    // setEntryDate(new Date());
    // setEntryTime(new Date());
  };
  return (
    <>
      <form
        className="flex flex-col gap-5 max-w-screen-sm mx-2"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl">New Token</h2>
        <Input
          icon={<AiOutlineNumber />}
          placeholder="Vehicle Number"
          size="md"
          value={vehicleNum}
          onChange={setVehicleNum}
        />
        <VehicleType value={vehicleType} setValue={setVehicleType} />

        {/* <DatePicker
          placeholder="Pick date"
          label="Entry Date"
          required
          size="md"
          value={entryDate}
          onChange={setEntryDate}
        />

        <TimeInput
          label="Entry Time"
          format="12"
          value={entryTime}
          onChange={setEntryTime}
          size="md"
          required
        /> */}

        <Button type="submit" size="md">
          Submit
        </Button>
      </form>
      {token && (
        <Modal
          opened={modalOpened}
          withCloseButton={false}
          onClose={() => {
            return false;
          }}
        >
          <div className=" mx-auto flex flex-col">
            <h2 className="text-xl font-bold pb-2 underline text-center">
              Parking Systems
            </h2>
            <h4 className=" text-lg text-center font-medium">Token</h4>
            <Divider my="sm" />
            <table className="text-left w-fit  mx-auto">
              <tbody>
                <tr>
                  <th>Token Id</th>
                  <th className="font-light pl-2">{token.id}</th>
                </tr>
                <tr>
                  <th>Vehicle Number</th>
                  <th className="font-light pl-2">{token.vehNumber}</th>
                </tr>
                <tr>
                  <th>Vehicle Name</th>
                  <th className="font-light pl-2">{token.vehType}</th>
                </tr>
                <tr>
                  <th>Entry Date</th>
                  <th className="font-light pl-2">
                    {date.format(new Date(token.entry), "ddd, MMM DD YY")}
                  </th>
                </tr>
                <tr>
                  <th>Entry Time</th>
                  <th className="font-light pl-2">
                    {date.format(new Date(token.entry), "hh:mm A")}
                  </th>
                </tr>
              </tbody>
            </table>

            <img src={token.qr} alt="" className="w-32 m-4 mx-auto" />
            <Group position="center" grow className="mt-2">
              <Button
                leftIcon={<BiPrinter size={20} />}
                onClick={printServiceCall}
              >
                Print
              </Button>
              <Button
                leftIcon={<AiOutlineClose size={20} />}
                color="red"
                onClick={() => {
                  setModalOpened(false);
                  resetForm();
                }}
              >
                Close
              </Button>
            </Group>
            <Button mt={12} leftIcon={<FaReceipt />} onClick={clearForm}>
              New Token
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
