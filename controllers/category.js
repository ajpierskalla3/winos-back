const Category = require('../models/category');
const { errorHandler } = require("../helpers/errorHandlers");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "category was not found"
            })
        }
        req.category = category;
        next();
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorhandler(err)
            });
        }

        res.json({ data })
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "there was an error"
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "there was an error"
            })
        }
        res.json({
            message: 'Category was successfully deleted'
        })
    })
}


exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'There was an error displaying the categories'
            })
        }
        res.json(data)
    })
}