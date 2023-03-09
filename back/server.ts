import express from "express";

const app = express();
app.use(express.json());

const PORT = 8000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Server running",
  });
});

app.listen(PORT, () => {
  console.log(`[server] Server running at http://localhost:${PORT}.`);
});
