import { Center, SegmentedControl } from "@mantine/core";
import { AiOutlineCar } from "react-icons/ai";
import { TbMotorbike } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";

export const VehicleType = ({ value, setValue }) => {
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      fullWidth
      data={[
        {
          value: "bike",
          label: (
            <Center>
              <TbMotorbike className="text-2xl " />
              <p className="text-lg ml-2 ">Bike</p>
            </Center>
          ),
        },
        {
          value: "car",
          label: (
            <Center>
              <AiOutlineCar className="text-2xl " />
              <p className="text-lg  ml-2">Car</p>
            </Center>
          ),
        },
        {
          value: "truck",
          label: (
            <Center>
              <FiTruck className="text-2xl " />
              <p className="text-lg ml-2">Truck</p>
            </Center>
          ),
        },
      ]}
    />
  );
};
