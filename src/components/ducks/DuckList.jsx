import React, { useEffect, useState } from "react";
import { PM_ROOT_API_URL } from "../../api/urls";
import Duck from "./Duck";
import keycloak from "../../../keycloak";

export default function DuckList() {
  const [ducks, setDucks] = useState([]);

  useEffect(() => {
    // const headers = {
    //   'Authorization': `Bearer ${keycloak.token}`,
    //   'Content-Type': 'application/json' // Often required for POST/PUT requests
    // };

    fetch(PM_ROOT_API_URL + "/ducks")
      .then((response) => response.json())
      .then((result) => setDucks(result));
  }, []);

  const duckList = ducks.map((duck, index) => <Duck duck={duck} key={index} />);

  return <div>{duckList}</div>;
}
