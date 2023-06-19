import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/util";
import { toast } from "react-hot-toast";

export default function My_Routines() {
  const { user, routines, myRoutines, setRoutines } = useOutletContext();
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [goal, setGoal] = useState("");

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
            {myRoutines.map((routine) => {
              console.log(routine);
              if (routine.creatorId === user.id) {
                return (
                  <ul className="act-list" key={routine.id}>
                    <li>
                      <span className="activity-name">{routine.name}</span>
                      <br />
                      <strong>goal:</strong> {routine.goal}
                      <br />
                      <div>{routine.isPublic ? <>Public</> : <>Private</>}</div>
                      <strong>creator:</strong> {routine.creatorName}
                    </li>
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
