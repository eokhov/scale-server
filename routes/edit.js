const {Router} = require('express');
const router = Router();
const multer = require('multer');
const upload = multer();
const Melt = require('../models/melt');

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

router.get('/:id', async (req, res) => {
  if(!req.query.allow) {
    return res.redirect('/');
  }
  const melt = await Melt.getById(req.params.id);
  res.render('edit', {
    layout: 'form-layout',
    title: `Править ${melt.name}`,
    isEdit: true,
    melt,
  })
});

router.post('/', upload.none(), async (req, res) => {
  const reqData = req.body
  const materials = concatArr(req.body.material, req.body.weigth)
  
  delete reqData.material
  delete reqData.weigth

  reqData.nummelt = +reqData.nummelt
  reqData.materials = materials

  await Melt.update(reqData)
  res.sendStatus(200)
});

module.exports = router;