import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Add_Activity from "./add_activity";

export default function Activities() {
  // activities include = id, name, description
  const { user, token, activities, setActivities } = useOutletContext();
  // const navigate = useNavigate();
  return (
    <>
      <aside id="create-form">
        <Add_Activity />
      </aside>
      <h1 className="profile">Activities</h1>
      <div className="page-body">
        <div className="activities">
          {activities.map((activity) => (
            <div className="activity-post" key={activity.id}>
              <h2>{activity.name}</h2>
              <p className="description">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
