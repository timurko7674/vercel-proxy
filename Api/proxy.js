// api/proxy.js

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "No URL provided." });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();

    res.setHeader("Content-Type", response.headers.get("content-type") || "text/plain");
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch target URL", details: error.message });
  }
}
