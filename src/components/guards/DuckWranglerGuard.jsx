import { Navigate } from "react-router-dom";
import keycloak from "../../../keycloak.js";

export default function wranglerGuard(Component) {
  function AuthenticatedComponent(props) {
    console.log("called");
    if (!keycloak.tokenParsed.realm_access.roles.includes("DuckWrangler")) {
      return <Navigate to="/" replace/>;
    }

    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}
