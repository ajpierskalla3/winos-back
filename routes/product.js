const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require("../controllers/product")
const { requireSignin, isAuth } = require("../controllers/auth") //isAdmin
const { userById } = require("../controllers/user");

router.get('/product/:productId', read)
router.post("/product/create/:userId", requireSignin, isAuth, create); //isAdmin
router.delete('product/:productId/:userId', requireSignin, isAuth, remove)
router.put('product/:productId/:userId', requireSignin, isAuth, update)
router.get('/products', list)
router.get('.products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post("/products/by/search", listBySearch)
router.get("/product/photo/:productId", photo)


router.param('userId', userById)
router.param('productId', productById)

module.exports = router;