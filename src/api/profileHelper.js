// api.js

import keycloak from "../../keycloak";


export function apiProfileGet(path) {
  return fetch(path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  }).then((res) => {
    if (res.ok) return res.json().catch(() => null);
    const err = new Error(`GET ${path} failed: ${res.status}`);
    err.status = res.status;
    throw err;
  });
}

export function apiProfilePost(path, body) {
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${keycloak.token}`,
    },
    body: JSON.stringify(body ?? {}),
  }).then((res) => {
    if (res.ok) return res.json().catch(() => null);
    const err = new Error(`POST ${path} failed: ${res.status}`);
    err.status = res.status;
    throw err;
  });
}