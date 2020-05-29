const {Router} = require('express')
const router = Router()
const Melt = require('../models/melt')

router.get('/', async (req, res) => {
  const allMelts = await Melt.getAll()
  const melts = allMelts.filter(m => m.site === '1')
  res.render('site', {
    title: '1 участок',
    isSite1: true,
    melts,
    site: 1
  })
});

module.exports = router;