const express = require('express');
const path = require('path');
const multer = require('multer');
const { handleUserSignup, handleUserlogin, handlergetLogin, handlergetSignup } = require('../controllers/user');
const { getDataset, renderAddBuilder, createDatasetFromBuilder, listMyDatasets, updateMyDataset, deleteMyDataset, updateMyDatasetData } = require('../controllers/dataset');
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');

const router = express.Router();
// Configure multer to store uploads in public/uploads so they are web-accessible
const upload = multer({ dest: path.join(__dirname, '..', 'public', 'uploads') });

router.get('/login', handlergetLogin)
router.get('/signup', handlergetSignup)
router.post('/login', handleUserlogin)
router.post('/signup', handleUserSignup)

// Create API page
router.get('/createjson', (req, res) => {
    return res.render('users/createjson', { title: 'Create Json' });
});

// Dummy JSON generator page
router.get('/dummyjson', (req, res) => {
    return res.render('users/dummyjson', { title: 'Dummy Json' });
});

// Data API (scoped to logged-in user)
router.get('/api/data/:slug', restrictToLoggedinUserOnly, getDataset);

// Add Data builder (protected)
router.get('/adddata', restrictToLoggedinUserOnly, renderAddBuilder);
router.post('/adddata', restrictToLoggedinUserOnly, upload.any(), createDatasetFromBuilder);

// My datasets
router.get('/my/datasets', restrictToLoggedinUserOnly, listMyDatasets);
router.post('/my/datasets/update', restrictToLoggedinUserOnly, updateMyDataset);
router.post('/my/datasets/delete', restrictToLoggedinUserOnly, deleteMyDataset);
router.post('/my/datasets/update-data', restrictToLoggedinUserOnly, updateMyDatasetData);

module.exports = router;
