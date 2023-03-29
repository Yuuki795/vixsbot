const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const {Hentai} = require("./models/Hentai");
const {Femboy} = require("./models/Femboy");
const {LevelCheck} = require("./models/LevelCheck");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/hentai', async (req, res) => {
  const newHentai = new Hentai({...req.body});

  const insertedHentai = await newHentai.save();

  return res.status(201).json(insertedHentai);
})

app.get('/hentai', async (req, res) => {
  const allHentai = await Hentai.find();

  return res.status(200).json(allHentai);
})

app.get("/hentai/:id", async (req, res) => {
  const { id } = req.params;

  const hentai = await Hentai.find({id: id});
  return res.status(200).json(hentai);
})

app.delete("/hentai/:id", async (req, res) => {
  const {id} = req.params;

  const deletedHentai = await Hentai.findByIdAndDelete(id);

  return res.status(200).json(deletedHentai);
})

app.post('/femboy', async (req, res) => {
  const newFemboy = new Femboy({...req.body});

  const insertedFemboy = await newFemboy.save();

  return res.status(201).json(insertedFemboy);
})

app.get('/femboy', async (req, res) => {
  const allFemboy = await Femboy.find();

  return res.status(200).json(allFemboy);
})

app.get("/femboy/:id", async (req, res) => {
  const { id } = req.params;

  const femboy = await Femboy.find({id: id});
  return res.status(200).json(femboy);
})

app.delete("/femboy/:id", async (req, res) => {
  const {id} = req.params;

  const deletedFemboy = await Femboy.findByIdAndDelete(id);

  return res.status(200).json(deletedFemboy);
})

app.post('/level', async (req, res) => {
  const newLevel = new LevelCheck({...req.body});

  const insertedLevel = await newLevel.save();

  return res.status(201).json(insertedLevel);
})

app.get('/level', async (req, res) => {
  const allLevel = await LevelCheck.find();

  return res.status(200).json(allLevel);
})

app.get("/level/:id", async (req, res) => {
  const { id } = req.params;

  const level = await LevelCheck.find({id: id});
  return res.status(200).json(level);
})

app.put("/level/:id", async (req, res) => {
  const {id} = req.params;

  await LevelCheck.updateOne({id: id}, req.body);
  const updatedLevel = await LevelCheck.find({id: id});
  return res.status(200).json(updatedLevel);
})

app.delete("/level/:id", async (req, res) => {
  const {id} = req.params;

  const deletedLevel = await LevelCheck.findByIdAndDelete(id);

  return res.status(200).json(deletedLevel);
})

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017"
    );
    app.listen(3000, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();