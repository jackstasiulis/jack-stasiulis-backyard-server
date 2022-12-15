const knex = require('knex')(require('../knexfile'));

const show = (_req, res) => {
  knex('show_data')
    // .innerJoin('comments_data', 'comments_data.show_id', 'show_data.show_id')
    .then((data) => {
        // console.log(data);
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving show: ${err}`)
    );
};

const addShow = (req, res) => {
    if (
        !req.body.show_id ||
        !req.body.image ||
        !req.body.artist ||
        !req.body.date ||
        !req.body.venue ||
        !req.body.address ||
        !req.body.doors ||
        !req.body.genre ||
        !req.body.description
    ) {
        return res.status(400).send('Please fill in all the fields backend')
    } else {
    knex('show_data')
    .insert(req.body)
    .then((data) => {
        res.status(201).send('Show added!')
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send('Could not add show')
    });
    }
}

const deleteShow = (req, res) => {
    knex('show_data')
    .where({ show_id: req.params.show_id })
    .del()

    .then((data) => {
        res.status(200).json(data);

    })
    .catch((err) =>
    res.send(`Error deleting show: ${err} ==> ${req.params}`)
    );
};


const comments = (req, res) => {
    // console.log('params', req.params.show_id)
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
    // console.log(req.body)
    if (
        !req.body.comments_body
    ) {
        return res.status(400).send('Please enter a comment!');
    } else{
    knex('comments_data')
    .insert(req.body)
    .then((data) => {
        res.status(201).send('Comment added!')
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send('Could not add comment.')
    });
    }
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
    addComments,
    addShow,
    deleteShow
}