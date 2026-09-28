import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PM_ROOT_API_URL } from "../../api/urls";
import keycloak from "../../../keycloak";

export default function DuckRegisterForm({ onCreated }) {
  const [serverError, setServerError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickName: "",
      age: 0,
      weight: 0,
      pondId: "", // optional UI field; we will convert "" -> null
    },
  });

  const onSubmit = async (data) => {
    setServerError(null);
    setIsSaving(true);

    // Build the JSON your API expects (id omitted for POST)
    const payload = {
      nickName: data.nickName.trim(),
      age: Number(data.age),
      weight: Number(data.weight),
      pondId: data.pondId === "" ? null : Number(data.pondId),
    };

    try {
      const res = await fetch(`${PM_ROOT_API_URL}/ducks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`
          // If you later secure POST with Keycloak, you can add:
          // Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      const createdDuck = await res.json();

      reset();              // clear form
      onCreated?.(createdDuck); // optional callback to refresh list
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ width: 360 }}>
      <h2 style={{ marginTop: 0 }}>Register Duck</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12 }}>
        {/* Nickname */}
        <label style={{ display: "grid", gap: 6 }}>
          <span>Nickname</span>
          <input
            type="text"
            placeholder="Quackers"
            {...register("nickName", {
              required: "Nickname is required",
              minLength: { value: 2, message: "Min 2 characters" },
            })}
          />
          {errors.nickName && (
            <small style={{ color: "tomato" }}>{errors.nickName.message}</small>
          )}
        </label>

        {/* Age */}
        <label style={{ display: "grid", gap: 6 }}>
          <span>Age</span>
          <input
            type="number"
            step="1"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 0, message: "Age must be ≥ 0" },
              max: { value: 100, message: "Age seems… suspicious 🦆" },
            })}
          />
          {errors.age && <small style={{ color: "tomato" }}>{errors.age.message}</small>}
        </label>

        {/* Weight */}
        <label style={{ display: "grid", gap: 6 }}>
          <span>Weight</span>
          <input
            type="number"
            step="0.1"
            {...register("weight", {
              required: "Weight is required",
              valueAsNumber: true,
              min: { value: 0.1, message: "Weight must be > 0" },
              max: { value: 200, message: "Weight seems… suspicious 🦆" },
            })}
          />
          {errors.weight && (
            <small style={{ color: "tomato" }}>{errors.weight.message}</small>
          )}
        </label>

        {/* PondId (optional) */}
        <label style={{ display: "grid", gap: 6 }}>
          <span>Pond Id (optional)</span>
          <input
            type="number"
            step="1"
            placeholder="leave blank for unassigned"
            {...register("pondId", {
              validate: (value) => {
                if (value === "" || value === null || value === undefined) return true;
                const n = Number(value);
                if (Number.isNaN(n)) return "Pond Id must be a number";
                if (!Number.isInteger(n)) return "Pond Id must be an integer";
                if (n < 1) return "Pond Id must be ≥ 1";
                return true;
              },
            })}
          />
          {errors.pondId && (
            <small style={{ color: "tomato" }}>{errors.pondId.message}</small>
          )}
        </label>

        {serverError && (
          <div style={{ color: "tomato", fontSize: 14 }}>
            {serverError}
          </div>
        )}

        <button type="submit" disabled={!isValid || isSaving}>
          {isSaving ? "Saving..." : "Create Duck"}
        </button>
      </form>
    </div>
  );
}