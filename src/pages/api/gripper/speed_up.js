// pages/api/gripper/speed_up.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  try {
    const backendUrl = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${backendUrl}/gripper/speed_up`, {method: "POST"});

    const text = await response.text();   // ← never assume JSON

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Forward failed:", err);

    // ✅ do NOT return 500 for device faults
    return res.status(200).json({
      ok: false,
      error: "device_no_response"
    });
  }
}
