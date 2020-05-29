const {Router} = require('express');
const router = Router();
const Melt = require('../models/melt');

router.get('/:id', async (req, res) => {
  const melt = await Melt.getById(req.params.id);
  res.render('melt', {
    title: `Информация ${melt.name}`,
    melt,
  })
});

router.get('/print/:id', async (req, res) => {
  const melt = await Melt.getById(req.params.id);
  res.render('print', {
    layout: 'empty',
    title: `Печать ${melt.name}`,
    melt,
  })
});

router.post('/', async (req, res) => {
  const result = await Melt.getResultById(req.body.id);
  res.send(result);
});


module.exports = router;