
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
  throw new Error("Product not found");
});

// @desc POST/Create a new product template (to be edited afterward)
// @route POST /api/products
// @access Private, Admin
const postNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({ 
    category: "Sample category",
    brand: "Sample brand",
    name: "Sample name",
    description: "Sample description",
    price: 0,
    image: "/images/sample.jpg",
    countInStock: 0,
    numReviews: 0,
    user: req.user._id,
  })
  const newProduct = await product.save();

  res.status(201).json(newProduct);
});

// @desc PUT/Update a product
// @route PUT /api/products/:id
// @access Private, Admin
const putProduct = asyncHandler(async (req, res) => {  // aka updateProduct
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

    const updatedAProduct = await product.save();
    res.json(updatedAProduct);
  } else { 
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc DELETE/Remove a product
// @route DELETE /api/products/:id
// @access Private, Admin
const deleteProduct = asyncHandler(async (req, res) => {  // aka deleteProduct
  const product = await Product.findById(req.params.id);

  if (product) { 
    await Product.deleteOne({_id: product._id});
    res.status(200).json({ message: `Success: Product ${product._id} ${product.name} deleted`});
  } else { 
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a new product review
// @route POST /api/products/:id/reviews
// @access Private
const postProductReview = asyncHandler(async (req, res) => {  // aka deleteProduct
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) { 
    const alreadyReviewed = product.reviews.find( 
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) { 
      res.status(400);
      throw new Error(`Error: Product ${product._id} ${product.name} already reviewed`);
    }

    if (!req.user.firstName || !req.user.lastName) {
      res.status(400);
      throw new Error("Please, complete your profile with first and last name before submitting a review");
    }

    const review = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = 
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / 
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: `Success: Review created for ${product._id} ${product.name}`});
  } else { 
    res.status(404);
    throw new Error("Product not found");
  }
});


export { 
  getAllProducts, 
  getProductById, 
  postNewProduct, 
  putProduct, 
  deleteProduct, 
  postProductReview
};
