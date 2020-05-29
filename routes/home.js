const {Router} = require('express');
const router = Router();
const Melt = require('../models/melt');

router.get('/', async (req, res) => {
  const melts = await Melt.getToDay();
  const site1Melts = melts.filter(s => s.site === '1').reverse()
  const site2Melts = melts.filter(s => s.site === '2').reverse()
  const site3Melts = melts.filter(s => s.site === '3').reverse()
  res.render('index', {
    title: 'Весовой терминал',
    isHome: true,
    site1Melts,
    site2Melts,
    site3Melts,
  })
});

router.get('/print/:site', async (req, res) => {
  const allMelts = await Melt.getToDay();
  const melts = allMelts.filter(s => s.site === req.params.site).reverse()
  res.render('print', {
    layout: 'empty',
    title: 'Печать',
    melts,
  })
});

module.exports = router;