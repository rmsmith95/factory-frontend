import { useEffect, useState } from "react";

export const useMachineStatus = (intervalMs = 5000) => {
  const [serverStatus, setServerStatus] = useState({
    status: "stopped",
    machines: {},
  });

  useEffect(() => {
    const fetchStatus = async () => {
      // setServerStatus((prev) => ({ ...prev, status: "loading" }));

      try {
        const res = await fetch("/api/get_health");
        // console.log("get_health.js res", res);

        if (!res.ok) {
          // Treat any non-200 response as stopped
          setServerStatus({ status: "stopped", machines: {} });
          return;
        }

        const data = await res.json();
        // console.log("get_health.js data", data);

        // Use API-provided status if it exists, fallback to "stopped"
        setServerStatus({
          status: data.status === "connected" ? "connected" : "stopped",
          machines: data.machines || {},
        });
      } catch (err) {
        // Network error or fetch failure → stopped
        console.warn("Failed to fetch /api/get_health:", err);
        setServerStatus({ status: "stopped", machines: {} });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return serverStatus;
};
