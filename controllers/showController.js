const knex = require('knex')(require('../knexfile'));

const show = (_req, res) => {
  knex('show_data')
    // .innerJoin('comments_data', 'comments_data.show_id', 'show_data.show_id')
    .then((data) => {
        console.log(data);
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving show: ${err}`)
    );
};

const comments = (req, res) => {
    console.log('params', req.params.show_id)
    knex('comments_data')
    .where('show_id', req.params.show_id )
    .then((data) => {
        res.status(200).json(data);
    }) 
    .catch((err) =>
        res.status(400).send(`Error retrieving comments: ${err}`)
    );
};

const addComments = (req, res) => {
    if (
        !req.body.comment_body
    ) {
        return res.status(400).send('Please enter a comment!');
    }
    knex('comments_data')
    .insert(req.body)
    .then((data) => {
        res.status(201).send('Comment added!')
    })
    .catch((err) => {
        res.status(500).send('Could not add comment.')
    });
};

const getSingleShow = (req, res) => {
    knex('show_data')
    // .join('comments_data', {'comments_data.show_id': 'show_data.show_id'})
    .where('show_data.show_id', req.params.show_id)
        .then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving single show: ${err}`);
        })
};

module.exports ={
    show,
    comments, 
    getSingleShow,
    addComments
}