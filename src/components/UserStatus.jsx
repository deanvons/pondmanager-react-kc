import React from "react";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";

export default function UserStatus() {
const navigate = useNavigate()


  function logout() {
    keycloak.logout();
  }

  function login() {
    keycloak.login();
  }

   function toProfile() {
    navigate("/profile")
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
      <button onClick={toProfile}>Go to Profile</button>
    </div>
  );
}
