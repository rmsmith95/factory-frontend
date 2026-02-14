// pages/api/jobs/run-job.js
export default async function handler(req, res) {
  console.log("Received request to /api/jobs/run-job", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ status: "method not allowed" });
  }

  let { job_id } = req.body;
  job_id = job_id != null ? String(job_id) : "";

  try {
    const backendUrl = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${backendUrl}/jobs/run_job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id }),
    });

    const data = await response.json();
    console.log("FastAPI response:", data);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error forwarding to FastAPI:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
