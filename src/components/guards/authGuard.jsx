import { Navigate } from "react-router-dom";
import keycloak from "../../../keycloak.js";

export default function authGuard(Component) {
  function AuthenticatedComponent(props) {
    console.log("called");
    if (!keycloak.authenticated) {
      return <Navigate to="/" replace/>;
    }

    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}
