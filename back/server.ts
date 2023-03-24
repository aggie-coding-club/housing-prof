
// import express from "express";

// console.log('Kotda');

// const app = express();
// app.use(express.json());

// const PORT = 8000;

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Server running",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`[server] Server running at http://localhost:${PORT}.`);
// });

import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 8000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
    res.status(200).json({
    message: "Server running",
  });
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000!");
});
