const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` Endpoint
// This Gets All Products from Database
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll ({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This Gets One Product from Database
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk (req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: "No Product Found."});
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This Creates New Product in Database
router.post("/", async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// This Updates Product in Database
router.put("/:id", async (req, res) => {
  try {
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (req.body.tags && req.body.tags.length > 0) {
    const productTags = await ProductTag.findAll ({ where: { product_id: req.params.id }});
    const productTagIds = productTags.map (({ tag_id }) => tag_id);
    const newProductTags = req.body.tags
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
      .map(({ id }) => id);
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  }
    const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }]});
    return res.json(product);
} catch (error) {
  console.log(error);
  return res.status(500).json(error);
}
});

// This Deletes One Product by ID
router.delete('/:id', (req, res) => {
  
});

module.exports = router;
