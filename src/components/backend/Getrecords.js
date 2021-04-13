import { API } from "../../backend";
//API is :http://localhost:5000/api

export const getRecords = (record) => {
  return fetch(`${API}/game`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(record),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
