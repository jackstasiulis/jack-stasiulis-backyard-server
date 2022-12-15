const router = require('express').Router();
const {show, comments, getSingleShow, addComments, addShow, deleteShow, deleteComment} = require('../controllers/showController');

router.route('/').get(show);
router.route('/').post(addShow);

router.route('/:show_id').get(getSingleShow);
router.route('/:show_id').delete(deleteShow);

router.route('/:show_id/comments').get(comments);
router.route('/:show_id/comments/').post(addComments);
router.route('/:show_id/comments/:comments_id').delete(deleteComment);

module.exports = router;


// router.route("/:inventory_id")
//   .get(getSingleInventory)
//   .put(updateInventory)
//   .delete(deleteInventory);