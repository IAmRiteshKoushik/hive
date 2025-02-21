import express, { Request, Response } from "express";

const app = express()

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is LIVE"
  });
  return;
});

app.listen(3000, () => console.log("Server is running"))
