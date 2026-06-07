const express = require("express");
const router = express.Router();
const { z } = require("zod");
const Bacalla = require("../models/Bacalla");

let localBacallaStore = [
  {
    id: "1",
    name: "Bacallà salat tradicional",
    origin: "Atlàntic Nord",
    type: "salat",
    description: "Salaó clàssica utilitzada per conservar el peix. Molt habitual en la cuina mediterrània."
  },
  {
    id: "2",
    name: "Bacallà esqueixat",
    origin: "Catalunya",
    type: "esqueixat",
    description: "Bacallà dessalat i esmicolat, ideal per amanides i plats freds."
  },
  {
    id: "3",
    name: "Bacallà fresc",
    origin: "Islàndia",
    type: "fresc",
    description: "Tall net i suau, apte per cuina ràpida, forn o planxa."
  },
  {
    id: "4",
    name: "Morro de bacallà",
    origin: "Portugal",
    type: "peça noble",
    description: "Part gruixuda i gelatinosa, molt apreciada per la seva textura."
  },
  {
    id: "5",
    name: "Bacallà dessalat",
    origin: "Galícia",
    type: "dessalat",
    description: "A punt per cuinar, amb gust equilibrat i ús molt versàtil."
  },
  {
    id: "6",
    name: "Bacallà fumat",
    origin: "Noruega",
    type: "fumat",
    description: "Presentació amb aroma intensa, ideal per aperitius i receptes creatives."
  }
];

const BacallaInputSchema = z.object({
  name: z.string().min(2),
  origin: z.string().min(2),
  type: z.string().min(2),
  description: z.string().min(5),
  image: z.string().optional()
});

const isDbConnected = () => {
  const mongoose = require("mongoose");
  return mongoose.connection.readyState === 1;
};

// GET all
router.get("/", async (req, res) => {
  try {
    const { search, origin, type } = req.query;
    let items = [];

    if (isDbConnected()) {
      let query = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      if (origin && origin !== "Tots") {
        query.origin = origin;
      }
      if (type && type !== "Tots") {
        query.type = type;
      }
      items = await Bacalla.find(query);
      items = items.map(item => ({
        id: item._id.toString(),
        name: item.name,
        origin: item.origin,
        type: item.type,
        description: item.description,
        image: item.image || ""
      }));
    } else {
      items = localBacallaStore;
      if (search) {
        const lowerSearch = search.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(lowerSearch) || 
          item.description.toLowerCase().includes(lowerSearch)
        );
      }
      if (origin && origin !== "Tots") {
        items = items.filter(item => item.origin === origin);
      }
      if (type && type !== "Tots") {
        items = items.filter(item => item.type === type);
      }
    }
    res.json(items);
  } catch (error) {
    console.error("Error GET /api/bacalla:", error);
    res.status(500).json({ error: "Error intern del servidor" });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const mongoose = require("mongoose");
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const localItem = localBacallaStore.find(item => item.id === id);
        if (localItem) return res.json(localItem);
        return res.status(404).json({ error: "Varietat de bacallà no trobada" });
      }
      const item = await Bacalla.findById(id);
      if (!item) return res.status(404).json({ error: "Varietat de bacallà no trobada" });
      return res.json({
        id: item._id.toString(),
        name: item.name,
        origin: item.origin,
        type: item.type,
        description: item.description,
        image: item.image || ""
      });
    } else {
      const item = localBacallaStore.find(i => i.id === id);
      if (!item) return res.status(404).json({ error: "Varietat de bacallà no trobada" });
      return res.json(item);
    }
  } catch (error) {
    console.error("Error GET /api/bacalla/:id:", error);
    res.status(500).json({ error: "Error intern" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const parseResult = BacallaInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: "Dades de formulari invàlides", details: parseResult.error.flatten().fieldErrors });
    }
    const { name, origin, type, description, image } = parseResult.data;

    if (isDbConnected()) {
      const newBacalla = new Bacalla({ name, origin, type, description, image: image || "" });
      const saved = await newBacalla.save();
      return res.status(201).json({
        message: "Creat a la BD",
        data: { id: saved._id.toString(), name: saved.name, origin: saved.origin, type: saved.type, description: saved.description }
      });
    } else {
      const newId = String(localBacallaStore.length + 1);
      const newBacalla = { id: newId, name, origin, type, description, image: image || "" };
      localBacallaStore.push(newBacalla);
      return res.status(201).json({ message: "Creat en memòria", data: newBacalla });
    }
  } catch (error) {
    console.error("Error POST /api/bacalla:", error);
    res.status(500).json({ error: "Error intern" });
  }
});

module.exports = router;
