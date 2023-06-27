import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  BASE_URL,
  deleteRoutine,
  deleteRoutineActivity,
  getMyDamnRoutines,
  getMyUser,
  addActivityToRoutine,
} from "../api/util";
import { toast } from "react-hot-toast";

export default function My_Routines() {
  const [meRoutines, setMeRoutines] = useState([]);
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [goal, setGoal] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [myShit, setMyShit] = useState([]);
  const {
    user,
    routines,
    setRoutines,
    postId,
    token,
    setToken,
    activities,
    myRoutines,
    activity,
    routineId,
  } = useOutletContext();

  useEffect(() => {
    const fetchShit = async () => {
      const bofa = await getMyUser();
      const myShit = await getMyDamnRoutines(bofa);
      setMyShit(myShit);
    };
    fetchShit();
    console.log(myShit, "pppp");
  }, []);

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (!result.id) {
      toast.error("cannot add activity");
    } else {
      toast.success("Activity has been added!");
      setRoutines([result]);
      setName("");
      setGoal("");
      setIsPublic(false);
    }
  }
  async function addActivityToRoutine(e) {
    const response = await fetch(
      `${BASE_URL}/routines/${myRoutines.id}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: "",
          count: "",
          duration: "",
        }),
      }
    );
    const result = await response.json();
    console.log(myRoutines, "hey there");
    console.log(result);
    // console.log(result);
    if (!result.id) {
      toast.error("cannot add activity");
    } else {
      toast.success("Activity has been added!");
      setCount("");
      setDuration("");
    }
    return result;
  }

  return (
    <div>
      <div>
        <h2>Create routine</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Routine name"
          ></input>

          <textarea
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
            placeholder="Goal"
          ></textarea>
          <span>
            <input onClick={() => setIsPublic(!isPublic)} type="checkbox" />
            Public?
          </span>
          <button>Submit</button>
        </form>
      </div>
      <div>
        <>
          <div>
            <h1 className="heading">Welcome {user.username}</h1>
            {myShit.map((routine) => {
              const routineId = routine.id;
              if (routine.creatorId === user.id) {
                return (
                  <ul className="act-list" key={routine.id}>
                    <li>
                      <span className="activity-name">
                        <strong>Routine</strong>
                        <br />
                        {routine.name}
                      </span>
                      <br />
                      <strong>goal:</strong> {routine.goal}
                      <br />
                      <div>
                        <h3>Activities:</h3>
                        {routine.activities.map((activity) => {
                          return (
                            <ul className="act-list" key={activity.id}>
                              <li>
                                <span className="activity-name">
                                  {activity.name}
                                </span>
                                <br />
                                <strong>description:</strong>{" "}
                                {activity.description}
                                <br />
                                <strong>count:</strong> {activity.count}
                                <br />
                                <strong>duration:</strong> {activity.duration}
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                      <div>{routine.isPublic ? <>Public</> : <>Private</>}</div>
                      <strong>creator:</strong> {routine.creatorName}
                    </li>
                    <div>
                      <button
                        onClick={() => {
                          deleteRoutine(routineId);
                        }}
                      >
                        delete
                      </button>
                      <button
                        className="manage"
                        onClick={() =>
                          deleteRoutineActivity(postId, token, setToken)
                        }
                      >
                        remove activities
                      </button>
                      <button onClick={() => addActivityToRoutine(routineId)}>
                        Add Activity
                      </button>
                      <Link to={`/${routine.id}`}>
                        <button>Edit Routine and Activities</button>
                      </Link>
                    </div>
                  </ul>
                );
              }
            })}
          </div>
        </>
      </div>
    </div>
  );
}
