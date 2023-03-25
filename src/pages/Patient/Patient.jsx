import React, { useEffect } from "react";
import { SidebarPatient } from "../../components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Patient() {
  const ABHAID = 1;
  const { isLoading, error, data } = useQuery({
    queryKey: ["consentRequests"],
    queryFn: () => {
      return axios
        .get(
          "http://localhost:9100/patient/getAllConsents?id=" + ABHAID.toString()
        )
        .then((response) => {
          return response.data;
        });
    },
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;
  return (
    <div>
      <div className="flex justify-start">
        <SidebarPatient />
        <div>{JSON.stringify(data)}</div>
      </div>
    </div>
  );
}

export default Patient;
