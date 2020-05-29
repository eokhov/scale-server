const {Router} = require('express')
const router = Router()
const Melt = require('../models/melt')
const Settings =require('../models/settings')

function concatArr(arr1, arr2) {
  let result = [];
  let i = 0;
  arr1.forEach((item) => {
    let objArr = {[item]: arr2[i]};
    result.push(objArr);
    i++;
  });
  
  return result;
}

router.get('/', async (req, res) => {
  res.render('create', {
    layout: 'form-layout',
    title: 'Новое задание',
    isCreate: true,
  })
});

router.post('/', async (req, res) => {
  const materials = concatArr(req.body.material, req.body.weigth);
  const quantityLoop = req.body.quantity;
  
  for(let i=0; i<quantityLoop; i++) {
    const melt = new Melt(req.body.name, +req.body.nummelt+i, req.body.site, req.body.workdate, req.body.totalweigth, materials);
    await melt.save();
  }

  res.redirect('/');
});

router.post('/settings', async (req, res) => {
  const nameForCreate = req.body.set

  const settings = await Settings.getByName(nameForCreate)
  const actual = await Melt.getActualMelt(settings.site, settings.melt)
  
  template = (actual) ? actual : settings
  template.nummelt = (actual) ? actual.nummelt+1 : 1

  res.send(template)
})

module.exports = router;