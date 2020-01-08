const express = require("express");
const router = express.Router();

const postController = require('../controllers/postController');
const auth = require('../controllers/authenticationController');


//Insert Post
router.post('/', auth.authenticate, postController.create);

//Query all Posts from DB
router.get('/', auth.authenticate, postController.readAll);

//Query all active Posts from DB
router.get('/active', postController.readAllActive);

//Query all created Posts from DB
router.get('/created', auth.authenticate, postController.readAllCreated);

//Query all deleted Posts from DB
router.get('/deleted', postController.readAllDeleted);

//Query all archivated Posts from DB
router.get('/archivated', postController.readAllArchivated);

//Query Post by given id
router.get('/:id', postController.findById);

//Query Posts by given useremail
router.get('/user/:useremail',postController.findByUsermail);

//Query Posts by given categorieid
router.get('/categorie/:categorieid', postController.findByCategorieId);

//Update Post
router.put('/:id', auth.authenticate, postController.update);

//Delete a Post
router.delete('/:id', auth.authenticate, postController.delete);


module.exports = router;