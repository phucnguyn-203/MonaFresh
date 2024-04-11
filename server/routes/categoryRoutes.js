/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

const express = require("express");
const router = express.Router();
const {
    getOneCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    updateManyCategory,
    deleteCategory,
    deleteManyCategory,
} = require("../controllers/categoryControllers");

const { authenticate } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A list of categories
 */
router.get("/", getAllCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category found
 *       '404':
 *         description: Category not found
 */
router.get("/:id", getOneCategory);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Created category
 */
router.post("/", authenticate, createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated category
 *       '404':
 *         description: Category not found
 */
router.patch("/:id", authenticate, updateCategory);

router.patch("/", authenticate, updateManyCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Category deleted
 *       '404':
 *         description: Category not found
 */
router.delete("/:id", authenticate, deleteCategory);
router.delete("/", authenticate, deleteManyCategory);

module.exports = router;
