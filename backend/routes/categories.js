const express = require("express");
const Category = require("../models/CategoryModel");
const router = express.Router();

router.get("/", (req, res) => {
    Category.find()
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Server error"});
        });
});

router.get("/:categoryId", (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).json({error: "Category not found"});
            }
            res.status(200).json(category);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({error: "Category not found"});
        });
});

router.post("/", (req, res) => {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });

    newCategory.save()
        .then(savedCategory => {
            res.status(201).json(savedCategory);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Server error"});
        });
});

router.put("/:categoryId", (req, res) => {
    Category.findById(req.params.categoryId)
        .then(existingCategory => {
            if (!existingCategory) {
                return res.status(400).json({ error: "Category not found" });
            }

            Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true })
                .then(updatedCategory => {
                    res.status(200).json(updatedCategory);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error: "Users error" });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: "Users error" });
        });
});

router.delete("/:categoryId", (req, res) => {
    Category.findOneAndDelete(req.params.categoryId)
        .then(deletedCategory => {
            if (!deletedCategory) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.status(200).json(deletedCategory);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });
});

module.exports = router;
