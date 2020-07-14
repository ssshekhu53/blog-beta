const router = require('express').Router();
let Category = require('../models/category');

router.route('/').get((req, res) => {
    Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json({err: 'Error : ' + err}));
});

router.route('/add').post((req, res) => {
    const { name } = req.body;

    if(!name)
        res.json({err: 'All fields are requires'});
    else
    {
        const category = new Category({
            name
        });
    
        category.save()
        .then(() => res.json({msg: 'Category Created'}))
        .catch(err => res.status(400).json({err: 'Error : ' + err}));
    }
});

module.exports = router;