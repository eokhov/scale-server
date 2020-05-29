const {Router} = require('express');
const router = Router();
const cors = require('cors');
const Melt = require('../models/melt');

router.options('/', cors());

router.get('/:id', cors(), async (req, res) => {
  const melt = await Melt.getById(req.params.id);
  res.json(melt);
});

router.post('/', cors(), async (req,res) => {
  const id = req.body.id
  const counter = +req.body.counter
  
  const melt = await Melt.getById(id)
  
  const result = [melt.materials[counter], melt.materials[counter+1]]
  
  res.send(result)
})

module.exports = router;