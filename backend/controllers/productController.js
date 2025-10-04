
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

// @desc PUT/Update a product
// @route PUT /api/products/:id
// @access Private (Admin)
const updateProduct = asyncHandler(async (req, res) => {
  const { 
      category,
      brand,
      name,
      description,
      price,
      image,
      countInStock,
    } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) { 
    product.category = category;
    product.brand = brand;
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else { 
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(products);
});



export { getAllProducts, getProductById, postNewProduct, updateProduct };
