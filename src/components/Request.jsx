import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  console.log(requests);

  if (requests?.length === 0) return <h1>No RequestFound</h1>;

  return (
    <div>
      <div className=" my-10">
        <h1 className="font-bold text-2xl text-center">Requests</h1>

        {requests &&
          requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div key={_id} className="flex justify-center">
                <div className="m-4 p-4 rounded-sm flex gap-4 items-center justify-center bg-base-300 w-2/4">
                  <img alt="image" src={photoUrl} className="1/4 h-40 " />
                  <div className="flex">
                    <div className="w-3/4">
                      <h2 className="text-lg font-bold">
                        {firstName + " " + lastName}
                      </h2>
                      {age && gender && (
                        <p className="font-semibold text-base">
                          {age + " " + gender}
                        </p>
                      )}
                      <p>{about}</p>
                    </div>
                    <div className="flex flex-col mx-4 gap-4">
                      <button className="btn btn-primary ">Ignore</button>
                      <button className="btn btn-secondary">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Request;
