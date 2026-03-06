export default async function handler(req, res) {

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "*")

  // Preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  const target = req.query.url

  if (!target) {
    res.status(400).json({
      error: "Missing url parameter"
    })
    return
  }

  try {

    const response = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Accept":
          "text/html,application/json,application/xhtml+xml"
      }
    })

    const body = await response.text()

    res.status(response.status).send(body)

  } catch (err) {

    res.status(500).json({
      error: "Proxy request failed",
      message: err.message
    })

  }
}
