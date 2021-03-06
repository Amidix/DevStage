import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'

// @desc Auth user & get token
// @route GET /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      cinRecto: user.cinRecto,
      cinVerso: user.cinVerso,
      image: user.image,
      address: user.address,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
// @desc rEGISTER A NEW USER
// @route POST api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, firstName, lastName } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    firstName,
    lastName,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Auth user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      cinRecto: user.cinRecto,
      cinVerso: user.cinVerso,
      image: user.image,
      address: user.address,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.image = req.body.image || user.image
    user.cinRecto = req.body.cinRecto || user.cinRecto
    user.cinVerso = req.body.cinVerso || user.cinVerso
    user.address = req.body.address || user.address
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      cinRecto: updatedUser.cinRecto,
      cinVerso: updatedUser.cinVerso,
      image: updatedUser.image,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Delete a user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Get user by ID
//@route Get /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.cinRecto = req.body.cinRecto || user.cinRecto
    user.cinVerso = req.body.cinVerso || user.cinVerso
    user.address = req.body.address || user.address
    user.image = req.body.image || user.image
    user.isAdmin = req.body.isAdmin
    user.isVerified = req.body.isVerified

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      cinRecto: updatedUser.cinRecto,
      cinVerso: updatedUser.cinVerso,
      image: updatedUser.image,
      address: updatedUser.address,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Auth user products
// @route GET /api/users/products
// @access Private
const getUserProducts = asyncHandler(async (req, res) => {
  const myproducts = await Product.find({ user: { _id: req.user._id } })
  //const user = await User.findById(req.user._id)
  if (myproducts) {
    res.json(myproducts)
  } else {
    res.status(404)
    throw new Error('No Products Found')
  }
})

// @desc Auth user products
// @route GET /api/users/products
// @access Private
const getUserProductsAndInfo = asyncHandler(async (req, res) => {
  const myproducts = await Product.find({
    user: { _id: req.params.id },
  }).populate('user', '_id name email image isVerified firstName lastName')
  //const user = await User.findById(req.user._id)
  if (myproducts) {
    res.json(myproducts)
  } else {
    res.status(404)
    throw new Error('No Products Found')
  }
})

//@desc Get all users
//@route Get /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 20
  const page = req.query.pageNumber || 1
  const count = await User.count({})
  const pages = Math.ceil(count / pageSize)
  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ users, page, pages })
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserProducts,
  getUserProductsAndInfo,
}
