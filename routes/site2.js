const {Router} = require('express')
const router = Router()
const Melt = require('../models/melt')

router.get('/', async (req, res) => {
  const allMelts = await Melt.getAll()
  const melts = allMelts.filter(m => m.site === '2')
  res.render('site', {
    title: '2 участок',
    isSite2: true,
    melts,
    site: 2
  })
});

module.exports = router;