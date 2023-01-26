const knex = require('knex')(require('../knexfile'));

const show = (_req, res) => {
  knex('show_data')
    .then((data) => {
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


const deleteComment = (req, res) => {
    knex('comments_data')
    .where({
        show_id: req.params.show_id,
    })
    .andWhere({
        comments_id: req.params.comments_id
    })
    .del()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        `error deleting comment ${err}`;
    })
}




const comments = (req, res) => {
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
    console.log(req.body)
    if (
        !req.body.comments_body
    ) {
        return res.status(400).send('Please enter a comment!');
    } else{
    console.log(req.body.comments_body)

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
    deleteShow,
    deleteComment
}