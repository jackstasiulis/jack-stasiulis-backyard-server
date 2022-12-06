const router = require('express').Router();
const {show, comments, getSingleShow} = require('../controllers/showController');

router.route('/').get(show);


router.route('/:show_id').get(getSingleShow);
router.route('/:show_id/comments').get(comments);

module.exports = router;


// router.route("/:inventory_id")
//   .get(getSingleInventory)
//   .put(updateInventory)
//   .delete(deleteInventory);