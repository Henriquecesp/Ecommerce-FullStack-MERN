const Category = require('../models/categorySchema')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.categoryById = (request, response, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return response.status(400).json({
        error: 'Category does not exist',
      })
    }
    request.category = category
    next()
  })
}

exports.create = (request, response) => {
  const category = new Category(request.body)
  category.save((err, data) => {
    if (err) {
      return response.status(400).json({
        error: errorHandler(err),
      })
    }
    response.json({ data })
  })
}

exports.read = (request, response) => {
  return response.json(request.category)
}

exports.update = (request, response) => {
  const category = request.category
  category.name = request.body.name
  category.save((err, data) => {
    if (err) {
      return response.status(400).json({
        error: errorHandler(err),
      })
    }
    response.json(data)
  })
}

exports.remove = (request, response) => {
  const category = request.category
  category.remove((err) => {
    if (err) {
      return response.status(400).json({
        error: errorHandler(err),
      })
    }
    response.json({
      message: 'Category deleted',
    })
  })
}

exports.list = (request, response) => {
  Category.find().exec((err, data) => {
    if (err) {
      return response.status(400).json({
        error: errorHandler(err),
      })
    }
    response.json(data)
  })
}
