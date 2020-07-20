const express = require('express');
const router = express.Router();

const { userById, read, update } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth")//isAdmin

router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {//isAdmin
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

router.param('userId', userById)



module.exports = router;
