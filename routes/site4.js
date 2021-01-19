const {Router} = require('express')
const router = Router()
const Melt = require('../models/melt')

router.get('/', async (req, res) => {
  const allMelts = await Melt.getAll()
  const melts = allMelts.filter(m => m.site === '4')
  res.render('site', {
    title: '4 участок',
    isSite4: true,
    melts,
    site: 4
  })
});

module.exports = router;