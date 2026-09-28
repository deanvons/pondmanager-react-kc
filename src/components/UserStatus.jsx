import { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";

export default function UserStatus() {
  const navigate = useNavigate();
  const [showFormButton, setShowFormButton] = useState(false);
   const [showAdminPageButton, setshowAdminPageButton] = useState(false);

  useEffect(() => {
    if (
      keycloak.authenticated &&
      keycloak.tokenParsed?.realm_access?.roles?.includes("DuckWrangler")
    ) {
      setShowFormButton(true);
    }

        if (
      keycloak.authenticated &&
      keycloak.tokenParsed?.realm_access?.roles?.includes("DuckAdmin")
    ) {
      setshowAdminPageButton(true);
    }
  }, []);

  function logout() {
    keycloak.logout();
  }

  function login() {
    keycloak.login();
  }

  function toProfile() {
    navigate("/profile");
  }

  function toRegisterPage() {
    navigate("/duckform");
  }

   function toAdminPage() {
    navigate("/admin");
  }

  return (
    <div className="user-status-compact">
      {keycloak.authenticated ? (
        <ul className="user-status-list">
          <li>
            <strong>{keycloak.tokenParsed.given_name}{" "}
            {keycloak.tokenParsed.family_name}</strong>
          </li>
          <li>@{keycloak.tokenParsed.preferred_username}</li>
          <li>{keycloak.tokenParsed.email}</li>
          <li className="roles">
            {keycloak.tokenParsed.realm_access.roles.join(", ")}
          </li>
        </ul>
      ) : (
        <p className="user-status-empty">Not logged in</p>
      )}

      <div className="user-status-actions">
        {!keycloak.authenticated ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <button onClick={toProfile}>Profile</button>
        {showFormButton && (
          <button onClick={toRegisterPage}>Register Duck</button>
        )}

         {showAdminPageButton && (
          <button onClick={toAdminPage}>Admin Page</button>
        )}
      </div>
    </div>
  );
}