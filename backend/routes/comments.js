const router = require('express').Router();
const Comments = require('../models/comments');
const Blogs = require('../models/blogs');

router.route('/').get((req, res) => {
    Comments.find()
    .populate('blogs', '_id title')
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/:blog_id').get((req, res) => {
    Comments.find({blog: req.params.blog_id})
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/count/:blog_id').get((req, res) => {
    Comments.countDocuments({blog: req.params.blog_id})
    .then(count => res.json({count: count}))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/add/:blog_id').post((req, res) => {
    const { name, email, comment } = req.body;

    if(!name || !email || !comment)
        res.json({err: 'All fields are required'});
    else
    {
        Blogs.findOne({_id: req.params.blog_id})
        .then(blog => {
            const comments = new Comments({
                name,
                email,
                comment,
                blog: blog
            });

            comments.save()
            .then(() => res.json({msg: 'Comment Added'}))
            .catch(err => res.status(400).json({err: 'Error : ' + err}));
        })
        .catch(err => res.status(400).json({err: 'Error : ' + err}));
    }
});

module.exports = router;