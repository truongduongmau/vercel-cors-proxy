export default async function handler(req, res) {
  const { url } = req.query

  if (!url) {
    res.status(400).json({ error: "Missing url" })
    return
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
      }
    })

    const data = await response.text()

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "*")

    res.status(200).send(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
