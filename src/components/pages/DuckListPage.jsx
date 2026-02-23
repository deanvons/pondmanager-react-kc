import { useEffect, useRef } from "react";
import DuckList from "../ducks/DuckList";
import keycloak from "../../../keycloak";
import {apiProfileGet, apiProfilePost } from "../../api/profileHelper.js";
import { PM_ROOT_API_URL } from "../../api/urls";

export default function DuckListPage() {
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (!keycloak.authenticated) return;

    // run once per mount even if React re-renders
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;

    apiProfileGet(PM_ROOT_API_URL+"/profile")
      .then(() => {
        console.log("✅ Profile exists");
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log("🆕 No profile found → creating...");
          return apiProfilePost(PM_ROOT_API_URL+"/profile", {});
        }
        throw err;
      })
      .then((createdProfile) => {
        if (createdProfile) console.log("✅ Profile created", createdProfile);
      })
      .catch((err) => {
        console.error("❌ Ensure profile failed:", err);
        // optional: reset ref so user can retry by refresh
        // bootstrappedRef.current = false;
      });
  }, []);

  return (
    <div>
      <DuckList/>
    </div>
  );
}