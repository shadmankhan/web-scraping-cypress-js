const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (_, res) => {
  const data = await fs
    .readFile("./collection.json")
    .then((res) => JSON.parse(res));

  res.send(data);
});

app.listen(1234, () => {
  console.log("listening on 1234");
});
