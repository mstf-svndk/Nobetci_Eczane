export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ success: false, error: "Method Not Allowed" });
      return;
    }

    const city = (req.query?.il || "").toString().trim();
    if (!city) {
      res.status(400).json({ success: false, error: "Missing 'il' query param" });
      return;
    }

    const key = process.env.COLLECTAPI_KEY;
    if (!key) {
      res.status(500).json({ success: false, error: "Server is missing COLLECTAPI_KEY" });
      return;
    }

    const url = `https://api.collectapi.com/health/dutyPharmacy?il=${encodeURIComponent(city)}`;

    const upstream = await fetch(url, {
      method: "GET",
      headers: {
        authorization: key,
        "content-type": "application/json",
      },
    });

    const text = await upstream.text();
    // CollectAPI returns JSON; keep raw in case of non-JSON errors.
    let data;
    try { data = JSON.parse(text); } catch { data = { success: false, raw: text }; }

    // Avoid caching on the edge/CDN unless you explicitly want it.
    res.setHeader("Cache-Control", "no-store");

    // Pass through upstream HTTP status if it looks like an error; otherwise 200.
    const status = upstream.ok ? 200 : upstream.status || 502;
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error", detail: String(err?.message || err) });
  }
}
