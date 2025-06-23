import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.listen(PORT, () => {
  console.log(`Backend running at http://0.0.0.0:${PORT}`);
});
