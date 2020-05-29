const {Router} = require('express');
const router = Router();
const cors = require('cors');
const Result = require('../models/result');

router.options('/', cors());
router.options('/material', cors());

// Creating an object at start 
router.post('/', cors(), async (req, res) => {

  const result = new Result(req.body.id);
  await result.save();

  res.sendStatus(200);
});

// Save information about materials
router.post('/material', cors(), async (req,res) => {
  await Result.addMaterial(req.body);
  res.sendStatus(200);
})

module.exports = router;
