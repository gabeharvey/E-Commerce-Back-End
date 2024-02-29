const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// This Gets All Tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll ({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tag Not Found." });
  }
});

// This Finds Single Tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "Tag Not Found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tag Not Found."});
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
