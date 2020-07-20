const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require("../controllers/category")
const { requireSignin, isAuth } = require("../controllers/auth")//isAdmin
const { userById } = require("../controllers/user");

router.get('/category/:categoryId', read)
router.post("/category/create/:userId", requireSignin, isAuth, create);//isAdmin
router.put("/category/:categoryId/:userId", requireSignin, isAuth, update);//isAdmin
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, remove);//isAdmin
router.get("/categories", list);//isAdmin




router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router;
