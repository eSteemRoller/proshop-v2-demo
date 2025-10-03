
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc GET/Read all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc GET/Read a product by its Id.
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource (Product) not found");
});

// @desc POST/Create a new product template (to be edited afterward)
// @route POST /api/products
// @access Private (Admin)
const postNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({ 
    category: 'Sample category',
    brand: 'Sample brand',
    name: 'Sample name',
    description: 'Sample description',
    price: 0,
    image: '/images/sample.jpg',
    countInStock: 0,
    numReviews: 0,
    user: req.user._id,
  })
  const newProduct = await product.save();

  res.status(201).json(newProduct);
});


export { getAllProducts, getProductById, postNewProduct };
