const router = require('express').Router();
let Blogs = require('../models/blogs');
let Category = require('../models/category');

router.route('/').get((req, res) => {
    Blogs.find()
    .populate('category', '_id name')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/category/:id').get((req, res) => {
    Blogs.find({category: req.params.id})
    .populate('category', '_id name')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/:id').get((req, res) => {
    Blogs.findOne({_id: req.params.id})
    .populate('category', '_id name')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/get/related-posts/:id').get((req, res) => {
    Blogs.find({category: req.params.id})
    .populate('category', '_id name')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/count').get((req, res) => {
    Blogs.countDocuments()
    .then(count => res.json({count: count}))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/count/:id').get((req, res) => {
    Blogs.countDocuments({category: req.params.id})
    .then(count => res.json({count: count}))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/get/featured-blogs').get((req, res) => {
    Blogs.find({featured: true})
    .populate('category', '_id name')
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/add').post((req, res) => {
    const { title, description, imageUrl, featured, likes, category } = req.body;

    if(!title || !description || !imageUrl ||  !category)
        res.json({err: 'All fields are required'});
    else
    {
        Category.findOne({_id: category.id})
        .then(category => {
            const blog = new Blogs({
                title,
                description,
                imageUrl,
                featured,
                likes,
                category: category
            });
        
            blog.save()
            .then(() => res.json({msg: 'Blog Created'}))
            .catch(err => res.status(400).json({err: 'Error : ' + err}));
        })
        .catch(err => res.status(400).json({err: 'Error : ' + err}));
    }
});

router.route('/get/trending').get((req, res) => {
    Blogs.find()
    .populate('category', '_id, name')
    .sort({likes: -1})
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/get/fresh-stories').get((req, res) => {
    Blogs.find()
    .populate('category', '_id name')
    .sort({_id: -1})
    .limit(5)
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

module.exports = router;