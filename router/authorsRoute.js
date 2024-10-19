const express = require("express");
const authorsService = require('../services/authorsService.js');
const authorsBooksService = require('../services/authorsBooksService.js');

const router = express.Router();

router.get("/", authorsService.getAuthors);
router.post("/", authorsService.createAuthors);
router.get("/:id/books", authorsBooksService.getAllAuthorsBooks);
router.get("/:id", authorsService.getAuthors);
router.put("/:id", authorsService.updateAuthors);
router.delete("/:id", authorsService.deleteAuthors);

module.exports = router;