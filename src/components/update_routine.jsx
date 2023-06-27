import { useState } from "react";
import { BASE_URL } from "../api/util";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UpdateRoutine() {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const { user, routines, token, setToken, activities } = useOutletContext();
  const { setRoutines } = useOutletContext();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [activityGoal, setActivityGoal] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityCount, setActivityCount] = useState("");

  async function handleSubmitRoutine(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.id) {
      toast.error("cannot update routine");
    } else {
      toast.success("Routine has been updated!");
      setRoutines([result]);
      //   setRoutineId("");
      setName("");
      setGoal("");
    }
    // navigate("/my_routines");
  }

  async function handleSubmitActivity(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
        body: JSON.stringify({
          count: "",
          duration: "",
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    if (!result.id) {
      toast.error("cannot update Routine Activity");
    } else {
      toast.success("Routine Activity has been updated!");
      setActivityCount("");
      setActivityName("");
      setActivityGoal("");
    }
  }

  return (
    <div>
      <div>
        <h2>Update routine</h2>
        <form className="form" onSubmit={handleSubmitRoutine}>
          <input
            onChange={(e) => setRoutines(e.target.value)}
            value={routineId}
            placeholder="Routine ID"
          ></input>
          <br />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Update routine name"
          ></input>
          <br />
          <input
            onChange={(e) => setGoal(e.target.value)}
            value={goal}
            placeholder="Update routine goal"
          ></input>
          <button>Submit</button>
        </form>
        <h2>Update Activity</h2>

        <form className="form" onSubmit={handleSubmitActivity}>
          <input
            onChange={(e) => setActivityName(e.target.value)}
            value={activities.name}
            placeholder="Activity Name"
          ></input>
          <br />
          <input
            type="text"
            onChange={(e) => setActivityCount(e.target.value)}
            value={activities.count}
            placeholder="Update Count"
          ></input>
          <br />
          <input
            onChange={(e) => setActivityGoal(e.target.value)}
            value={activities.duration}
            placeholder="Update Duration"
          ></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
