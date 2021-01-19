const {Router} = require('express')
const router = Router()
const Setting = require('../models/settings');

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
  res.render('add-material', {
    layout: 'form-layout',
    title: 'Добавить материал',
    addMaterial: true,
  })
});

router.post('/', async (req, res) => {
  const { name, site, material, weigth } = req.body;
  const materials = concatArr(material, weigth);
  
  const settings = new Setting(name.toLowerCase(), name, site, materials)
  await settings.save();

  res.redirect('/');
});

module.exports = router;