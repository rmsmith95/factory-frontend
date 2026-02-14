export default async function handler(req, res) {
  try {
    // Forward request to FastAPI backend
    const backendUrl = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${backendUrl}/cobot280/get_position`);

    const res = await response.json();
    console.log("✅ Backend get_position response:", res);

  } catch (err) {
    console.error("❌ Error fetching position:", err);
  }
}
