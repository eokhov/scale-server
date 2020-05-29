const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('tenso-start', {
    layout: 'empty'
  });
});

router.post('/', (req, res) => {
  const link = req.body.link;
  res.redirect(`http://192.168.192.1:8080/${link[0]}-Uchastok?Session=${link}`)
});

module.exports = router;