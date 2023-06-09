import * as fs from 'fs';
import express from "express";
import { alfanumeric } from './generateID';

const rawData = fs.readFileSync('./pcs.json');
const data = JSON.parse(rawData.toString());
//console.log(data)

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "si" });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

app.get("/register", async (req, res) => {
  let id = alfanumeric(5);
  if(id in data){
    id = alfanumeric(5);
  }
  data[id] = {
    "PcName": `nombre de pc${id}`,
    "IdPc": id,
    "publicURL": "publicurl.com"
  };
  // Guardar los cambios en el archivo JSON
  fs.writeFileSync('./pcs.json', JSON.stringify(data));
  res.json({ id: id });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
