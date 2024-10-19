const express = require("express");
const booksService = require('../services/booksService.js');

const router = express.Router();

router.get("/", booksService.getBooks);
router.post("/", booksService.createBooks);
router.get("/:id", booksService.getBooks);
router.put("/:id", booksService.updateBooks);
router.delete("/:id", booksService.deleteBooks);

module.exports = router;