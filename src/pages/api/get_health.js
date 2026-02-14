export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: "method not allowed" });
  }

  try {
    const backendUrl = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${backendUrl}/get_health`);

    // Check status before parsing JSON
    if (!response.ok) {
      return res.status(200).json({ status: "stopped", machines: {} });
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return res.status(200).json({ status: "stopped", machines: {} });
    }

    if (!data || !data.machines || typeof data.machines !== "object") {
      return res.status(200).json({ status: "stopped", machines: {} });
    }

    return res.status(200).json({ status: "connected", machines: data.machines });
  } catch (err) {
    console.warn("Backend unreachable:", err.message);
    return res.status(500).json({ status: "stopped", machines: {} });
  }
}
