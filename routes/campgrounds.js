const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds.js')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// CAMPGROUND'S CRUD

// // GET - Show a list of campgrounds
// router.get('/', catchAsync(campgrounds.index))

// // GET - New campground page
// router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// //POST - Create a new product
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

// // GET - Show details of a campgrounds
// router.get('/:id', catchAsync(campgrounds.showCampground))

// // GET - Show edit page
// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// //UPDATE -> EDIT  UPDATE a campground
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground));

// // Delete a campground
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router