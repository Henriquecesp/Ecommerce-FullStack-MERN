const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/productSchema')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.productById = (request, response, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      response.satus(400).json({
        error: 'Product not found',
      })
    }
    request.product = product
    next()
  })
}

exports.read = (request, response) => {
  request.product.photo = undefined
  return response.json(request.product)
}

exports.create = (request, response) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(request, (err, fields, files) => {
    if (err) {
      response.satus(400).json({
        error: 'Image could not be uploaded',
      })
    }
    //check for all fields
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      bonusProvider,
      available,
    } = fields

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping ||
      !bonusProvider ||
      !available
    ) {
      return response.status(400).json({
        error: 'All fields are required',
      })
    }

    let product = new Product(fields)

    //1kb = 1000
    //1mb - 1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return response.status(400).json({
          error: 'Image should be less than 1mb size',
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save((err, result) => {
      if (err) {
        return response.status(400).json({
          error: errorHandler(err),
        })
      }
      response.json(result)
    })
  })
}

exports.remove = (request, response) => {
  let product = request.product
  product.remove((err) => {
    if (err) {
      return response.status(400).json({
        error: errorHandler(err),
      })
    }
    response.json({
      message: 'Product deleted successfully',
    })
  })
}

exports.update = (request, response) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(request, (err, fields, files) => {
    if (err) {
      response.satus(400).json({
        error: 'Image could not be uploaded',
      })
    }
    // //check for all fields
    // const {
    //   name,
    //   description,
    //   price,
    //   category,
    //   quantity,
    //   shipping,
    //   bonusProvider,
    //   available,
    // } = fields

    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !quantity ||
    //   !shipping ||
    //   !bonusProvider ||
    //   !available
    // ) {
    //   return response.status(400).json({
    //     error: 'All fields are required',
    //   })
    // }

    let product = request.product
    product = _.extend(product, fields)

    //1kb = 1000
    //1mb - 1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return response.status(400).json({
          error: 'Image should be less than 1mb size',
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save((err, result) => {
      if (err) {
        return response.status(400).json({
          error: errorHandler(err),
        })
      }
      response.json(result)
    })
  })
}

// sell / arrival
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
//if no params are sent, then all products are returned

exports.list = (request, response) => {
  let order = request.query.order ? request.query.order : 'asc'
  let sortBy = request.query.sortBy ? request.query.sortBy : '_id'
  let limit = request.query.limit ? parseInt(request.query.limit) : 6

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return response.status(400).json({
          error: 'Products not found',
        })
      }
      response.json(data)
    })
}

// find product based on req product category

exports.listRelated = (request, response) => {
  let limit = request.query.limit ? parseInt(request.query.limit) : 6

  Product.find({
    _id: { $ne: request.product },
    category: request.product.category,
  })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, data) => {
      if (err) {
        return response.status(400).json({
          error: 'Products not found',
        })
      }
      response.json(data)
    })
}

exports.listCategories = (request, response) => {
  Product.distinct('category', {}, (err, data) => {
    if (err) {
      return response.status(400).json({
        error: 'Products not found',
      })
    }
    response.json(data)
  })
}

// list products by search
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        })
      }
      res.json({
        size: data.length,
        data,
      })
    })
}

exports.photo = (request, response, next) => {
  if (request.product.photo.data) {
    response.set('Content-Type', request.product.photo.contentType)
    return response.send(request.product.photo.data)
  }
  next()
}

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {}
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }
    // assigne category value to query.category
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        })
      }
      res.json(products)
    }).select('-photo')
  }
}

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }
  })

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update product',
      })
    }
    next()
  })
}
