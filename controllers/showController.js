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

const comments = (req, res) =>{
    knex('comments_data')
    .then((data) => {
        res.status(200).json(data);
    }) 
    .catch((err) =>
        res.status(400).send(`Error retrieving comments: ${err}`)
    );
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
    getSingleShow
}