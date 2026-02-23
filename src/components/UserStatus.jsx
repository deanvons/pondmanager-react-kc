import React from "react";
import keycloak from "../../keycloak";

export default function UserStatus() {
  function logout() {
    keycloak.logout();
  }

  function login() {
    keycloak.login();
  }

  return (
    <div>
        
      {keycloak.authenticated ? <ul>
        <li>Logged in: {String(keycloak.authenticated)}</li>
        <li>Welcome {keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name}</li>
        <li>Username: {keycloak.tokenParsed.preferred_username}</li>
        <li>Email: {keycloak.tokenParsed.email}</li>
        <li>KC Id: {keycloak.tokenParsed.sub}</li>
      </ul>: <p>No user logged in </p>}
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
