import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function deleteRoutine(routineId) {
  const localToken = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
  });
  const result = await response.json();
  console.log(result);

  if (result.success) {
    toast.success("Routine Deleted!");
  } else {
    toast.error("cannot delete routine");
    console.log(result.error);
  }
}

// useEffect(() => {
//   async function deleteRoutineActivity(postId) {
//     const localToken = localStorage.getItem("token");

//     console.log(postId);
//     const response = await fetch(`${BASE_URL}/routine_activities/${postId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localToken}`,
//       },
//     });
//     const result = await response.json();
//     console.log(result);
//   }
//   deleteRoutineActivity();
// }, []);
export async function deleteRoutineActivity() {
  const localToken = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/routine_activities/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
  });
  const result = await response.json();
  console.log(result);
}

export async function getMyUser() {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    const result = await response.json();
    if (result.id) {
      return result;
    }
  }
}

export async function getMyDamnRoutines(user) {
  const localToken = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users/${user.username}/routines`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
  });
  const routines = await response.json();

  return routines;
}

export async function editActivity() {
  const response = await fetch(`${BASE_URL}/activities`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
    method: "PATCH",
    body: JSON.stringify({
      name: "",
      description: "",
    }),
  });

  const result = await response.json();
  console.log(result);
  if (result.id) {
    toast.success("Added Activity");
  }
  if (!result.id) {
    toast.error("Cannot add activity!");
  }
  return result;
}

// useEffect(() => {
//   async function addActivityToRoutine(e) {
//     const response = await fetch(
//       `${BASE_URL}/routines/${routineId}/activities`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           activityId: "",
//           count: "",
//           duration: "",
//         }),
//       }
//     );
//     const result = await response.json();
//     console.log(result);
//     // console.log(result);
//     if (!result.id) {
//       toast.error("cannot add activity");
//     } else {
//       toast.success("Activity has been added!");
//       setCount("");
//       setDuration("");
//     }
//   }
//   addActivityToRoutine(routineId);
// }, []);

export async function addActivityToRoutine(e) {
  const { routines, routineId } = useOutletContext();
  const response = await fetch(
    `${BASE_URL}/routines/${routines.id}/activities`,
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
