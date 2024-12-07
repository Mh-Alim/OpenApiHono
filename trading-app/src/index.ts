import express from "express";
import { DefaultService } from "./generated";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "server is working fine",
  });
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  const rs = await DefaultService.getUsers(id as string);
  res.json({
    message: "from trading app",
    rs,
  });
});

app.listen(3000, () => {
  console.log("Trading app is running on 3000");
});
