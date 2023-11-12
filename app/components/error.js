"use client";
import React from "react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div>
      Error, something went wrong{" "}
      <button onClick={() => reset()}>try again</button>
    </div>
  );
}
