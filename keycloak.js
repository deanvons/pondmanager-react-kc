import Keycloak from "keycloak-js";

const keycloak = new Keycloak("/assets/keycloak.json");

export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
  };
  return keycloak.init(config);
};

export default keycloak;
