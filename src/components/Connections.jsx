import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnecions = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnecions();
  }, []);

  if (connections?.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className=" my-10">
      <h1 className="font-bold text-2xl text-center">Connections</h1>

      {connections &&
        connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div className="flex justify-center">
              <div className="m-4 p-4 rounded-sm flex gap-4 items-center justify-center bg-base-300">
                <img
                  alt="image"
                  src={photoUrl}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-bold">
                    {firstName + " " + lastName}
                  </h2>
                  <p className="font-semibold text-base">
                    {age + " " + gender}
                  </p>
                  <p>{about}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
