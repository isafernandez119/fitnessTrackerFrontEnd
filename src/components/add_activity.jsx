import { useState } from "react";
import { BASE_URL } from "../api/util";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Add_Activity() {
  const { setActivities, token } = useOutletContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function getActivities() {
    const response = await fetch(`${BASE_URL}/activities`);
    const activities = await response.json();
    setActivities(activities);
  }

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const result = await response.json();
    if (result.id) {
      toast.success("Added Activity");
    }
    if (!result.id) {
      toast.error("Cannot add activity!");
    }
    getActivities();
    setName("");
    setDescription("");
  }

  return (
    <div>
      {token && (
        <>
          <h2>Create activity</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Activity name"
            ></input>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            ></textarea>
            <button>Submit</button>
          </form>
        </>
      )}
    </div>
  );
}
