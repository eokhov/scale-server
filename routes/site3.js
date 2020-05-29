const {Router} = require('express')
const router = Router()
const Melt = require('../models/melt')

router.get('/', async (req, res) => {
  const allMelts = await Melt.getAll()
  const melts = allMelts.filter(m => m.site === '3')
  res.render('site', {
    title: '3 участок',
    isSite3: true,
    melts,
    site: 3
  })
});

module.exports = router;