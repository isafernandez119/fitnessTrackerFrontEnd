import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/util";

export default function Routines() {
  const { user, token, routines, setRoutines } = useOutletContext();
  const [content, setContent] = useState("");

  if (routines === undefined) {
    return <div></div>;
  }
  return (
    <>
      <h1 className="heading">Routines</h1>
      <div className="page-body">
        <div className="posts">
          {routines.map((routine) =>
            routine.isPublic ? (
              <div className="post" key={routine.id}>
                <h2>{routine.name}</h2>
                <p className="description">Goal: {routine.goal}</p>
                <div>
                  created by:{" "}
                  <Link to={`/activities/${routine.creatorId}`}>
                    {routine.creatorName}
                  </Link>
                </div>
                {routine.activities.length > 0 ? (
                  <>
                    <h3>Activities:</h3>
                    {routine.activities.map((activity) => {
                      return (
                        <ul className="act-list" key={activity.id}>
                          <li>
                            <span className="activity-name">
                              {activity.name}
                            </span>
                            <br />
                            <strong>description:</strong> {activity.description}
                            <br />
                            <strong>count:</strong> {activity.count}
                            <br />
                            <strong>duration:</strong> {activity.duration}
                          </li>
                        </ul>
                      );
                    })}
                  </>
                ) : null}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
