import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";

import { BASE_URL } from "../api/util";
import { Toaster } from "react-hot-toast";

export default function Root() {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  const [routineActivity, setRoutineActivity] = useState([]);
  // console.log(localStorage);
  useEffect(() => {
    async function getActivities() {
      const response = await fetch(`${BASE_URL}/activities`);
      const activities = await response.json();
      setActivities(activities);
      // console.log(activities);
    }
    getActivities();
  }, [activities]);

  useEffect(() => {
    async function getRoutines() {
      const response = await fetch(`${BASE_URL}/routines`);
      const routines = await response.json();
      setRoutines(routines);
    }
    getRoutines();
  }, [routines]);
  useEffect(() => {
    async function getRoutineActivityById() {
      const response = await fetch(
        `${BASE_URL}/activities/${activities.id}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const routineActivity = await response.json();
      setRoutineActivity(routineActivity);
    }
    getRoutineActivityById(routines);
    // console.log(activities);
    // console.log(myRoutines);
  }, []);

  useEffect(() => {
    async function getMyRoutines(user) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        console.log(user, "user");
        const response = await fetch(
          `${BASE_URL}/users/${user.username}/routines`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
        const routines = await response.json();
        console.log("hello", routines);
        setMyRoutines(routines);
      }
    }
    getMyRoutines(user);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        if (result.id) {
          setUser(result);
        }
      }
    }
    fetchUser();
  }, [token]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} setToken={setToken} />
      <Toaster position="bottom-center" />
      <Outlet
        context={{
          user,
          token,
          activities,
          routines,
          setUser,
          setToken,
          setActivities,
          setRoutines,
          myRoutines,
          setMyRoutines,
        }}
      />
    </div>
  );
}
