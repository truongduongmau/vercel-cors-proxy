export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing url" });
    return;
  }

  const response = await fetch(url);
  const data = await response.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(data);
}
