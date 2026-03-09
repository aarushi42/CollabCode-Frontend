import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Photo" />
        </figure>
        <div className="card-body">
          <div className="card-title text-xl">{firstName + " " + lastName}</div>
          {age && gender && (
            <div className="text-base">{age + " " + gender}</div>
          )}
          <div className="text-sm">{about}</div>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Intereseted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
