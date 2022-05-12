const express = require('express');
const router = express.Router();
// database schema
const User = require('../model/userModel');
const Post = require('../model/postModel');
// multer upload
const upload = require('./mediaHandling');
// password encryption
const bcrypt = require('bcryptjs');
// json web token authentication
const jwt = require('jsonwebtoken');
// verify token
const verify = require('./verifyToken');
// jwt decoder
const jwt_decode = require('jwt-decode');
// jwt secret ket
const secretKey = require('../model/keys').secretKey;
// validation
const { check, validationResult }  = require('express-validator');


/* GET users listing. */
router.get('/', verify, function(req, res, next) {
  Post.find()
    .then( user => {
        res.status(200).json(user);
    })
    .catch( err => res.json({message: err}));

});   

/* POST register route */
router.post('/register', [

  check('name').isLength({ min: 4 }).withMessage('name is required and have atleat 4 characters'),
  check('username').isLength({ min: 3 }).withMessage('username is required and have atleat 3 characters'),
  check('city').isLength({ min: 3 }).withMessage('city is required and have atleat 3 characters'),
  check('email').isEmail(),
  check('phone').isLength({ min: 10 }).withMessage('contact is required and have atleat 10 characters'),
  check('password').isLength({ min: 6 }).withMessage('password is required and have atleat 6 characters')

], function (req, res) {
const errors = validationResult(req);
  if (!errors.isEmpty())  return res.status(401).json(errors.errors);

  User.findOne({username: req.body.username})
    .then( user => {
      if(user) return res.status(401).json('user exists')
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          city: req.body.city,
          about: req.body.about,
          email: req.body.email,
          gender: req.body.gender,
          phone: req.body.phone
        });
        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(req.body.password, salt, (err, hash) =>{
            if(err) throw err;    
            newUser.password = hash;
            newUser.save()
              .then( registeredUser => res.json(registeredUser))
              .catch( err => res.status(401).json(err));
            })); 
      });  
});

/* POST login page */
router.post('/login', [

  check('username').isLength({ min: 3 }).withMessage('username is required and have atleat 3 characters'),
  check('password').isLength({ min: 6 }).withMessage('password is required and have atleat 6 characters')

], (req, res, next) => {
const errors = validationResult(req);
  if (!errors.isEmpty())  return res.status(401).json(errors.errors);

  User.findOne({username: req.body.username})
    .then( user => {
        if(!user) return res.status(404).json({username: 'User Not Found'});
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if(!valid) return res.status(401).json({password: 'Password Incorrect'})
            const token = jwt.sign({user}, secretKey, { expiresIn: '3600s' });
            res.header('auth-token', token).json({token});
          })
          .catch(err => res.status(401).json(err));    
    })
    .catch( err => req.status(401).json(err));      
});

/* POST update route */
router.post('/update', verify, [

  check('name').isLength({ min: 4 }).withMessage('name is required and have atleat 4 characters'),
  check('username').isLength({ min: 3 }).withMessage('username is required and have atleat 3 characters'),
  check('city').isLength({ min: 3 }).withMessage('city is required and have atleat 3 characters'),
  check('phone').isLength({ min: 10 }).withMessage('contact is required and have atleat 10 characters')

], verify, function (req, res) {
const errors = validationResult(req);
  if (!errors.isEmpty())  return res.status(401).json(errors.errors);
  let updateUser = {
    name: req.body.name,
    username: req.body.username,
    about: req.body.about,
    city: req.body.city,
    phone: req.body.phone,
  };
  User.findOneAndUpdate({ _id: req.user._id }, updateUser, { new: true })
    .then( updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(401).json(err));
});

/* GET love route */
router.get('/love/:postid', verify, function(req, res) {
  User.findOne({_id: req.user._id})
    .then(function (userDetails) {
      Post.findOne({ _id: req.params.postid })
      .then( lovedPost => {
          if (lovedPost.loves.indexOf(userDetails._id) === -1) lovedPost.loves.push(userDetails);
          lovedPost.save()
            .then( data => res.status(200).json(data))
            .catch( err => res.status(401).json(err));
          })
        .catch( err => res.status(401).json(err));
    })
    .catch( err => res.status(401).json(err));
});

/* GET like route */
router.get('/like/:postid', verify, function (req, res) {
  User.findOne({_id: req.user._id})
    .then(userDetails => {
      Post.findOne({ _id: req.params.postid })
        .then(likedPost => {
          if (likedPost.likes.indexOf(userDetails._id) == -1) likedPost.likes.push(userDetails)
          likedPost.save()
          .then( data => res.status(200).json(data))
          .catch( err => res.status(401).json(err));
        })
        .catch( err => res.status(401).json(err));
    })
    .catch( err => res.status(401).json(err));
})

/* GET dislike route */
router.get('/dislike/:postid', verify, function (req, res) {
  User.findOne({_id: req.user._id})
    .then(userDetails => {
      Post.findOne({ _id: req.params.postid })
        .then( dislikedPost => {
          if (dislikedPost.dislikes.indexOf(userDetails._id) == -1) dislikedPost.dislikes.push(userDetails)
          dislikedPost.save()
          .then( data => res.status(200).json(data))
          .catch( err => res.status(401).json(err));    
        })        
          .catch( err => res.status(401).json(err));
        })
        .catch( err => res.status(401).json(err));
})

/* POST timeline route */
router.get('/timeline', verify, function (req, res) {
  Post.find().populate('postedBy').exec(function (err, posts) {
    User.findOne({ _id: req.user._id })
      .then(user => res.status(200).json({posts, details: user, isLoggedIn: true}))
      .catch( err => res.status(401).json(err));
  })
});

router.get('/profile', verify, function (req, res) {
  User.findOne({ _id: req.user._id }).populate('posts')
    .exec(function (err, user) {
      console.log(user);
      res.json({ details: user, isUser: true, isLoggedIn: true });
    })
});

/* POST post route */
router.post('/post', verify, function (req, res) {
  Post.create({
    postText: req.body.post,
  }).then( postedPost => {
    User.findOne({ _id: req.user._id })
      .then(loggedInUser => {
        loggedInUser.posts.push(postedPost);
        postedPost.postedBy = loggedInUser;
        loggedInUser.save().then( () => {
          postedPost.save().then( () => {
            res.json(postedPost);
          })
        })
      })
  })
})

// profilePic
router.post('/profilepic', verify, function (req, res) {
  upload(req, res, (err) => {
    if(err) return res.status(401).json(err);
    User.findOne({ _id: req.user._id })
    .then(loggedInUser => {
      loggedInUser.profilePic = '../images/uploads/' + req.file.filename;
      loggedInUser.save().then(updatedPic => res.status(200).json(updatedPic))
      .catch(err => res.status(401).json(err))
    }).catch(err => res.status(401).json(err));
    
  })
});

module.exports = router;