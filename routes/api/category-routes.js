const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// This Finds All Categories
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll ({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This Finds Category by ID Value
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk (req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "Category Not Found." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This Creates a New Category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
