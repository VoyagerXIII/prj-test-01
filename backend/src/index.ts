import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
