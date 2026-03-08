import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about, gender } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Intereseted</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
