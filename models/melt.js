const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

class Melt {
  constructor(name, nummelt, site, workdate, totalweigth, materials) {
    this.id = `${site}-${nanoid(10)}`;
    this.name = name;
    this.nummelt = nummelt;
    this.site = site;
    this.workdate = workdate;
    this.totalweigth = totalweigth;
    this.materials = materials;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      nummelt: this.nummelt,
      site: this.site,
      workdate: this.workdate,
      totalweigth: this.totalweigth,
      materials: this.materials,
    }
  }

  async save() {
    const melts = await Melt.getAll();
    melts.unshift(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'melts.json'),
        JSON.stringify(melts),
        (err) => {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    })
  }

  static async update(melt) {
    const melts = await Melt.getAll();
    const idx = melts.findIndex(m => m.id === melt.id);
    melts[idx] = melt;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'melts.json'),
        JSON.stringify(melts),
        (err) => {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'melts.json'),
        'utf-8',
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      )
    })
  }

  static getAllResults() {
    return new Promise((resolve, reject) => {
      fs.readFile(
          path.join(__dirname, '..', 'data', 'results.json'),
          'utf-8',
          (err, data) => {
            if(err) {
              reject(err);
            } else {
              resolve(JSON.parse(data));
            }
          }
      )
    })
  }

  static async getById(id) {
    const melts = await Melt.getAll();
    return melts.find(m => m.id === id);
  }

  static async getResultById(id) {
    const results = await Melt.getAllResults();
    return results.find(r => r.id === id);
  }

  static async getActualMelt(site, meltName) {
    const melts = await Melt.getAll();
    const actual = melts
      .filter(s => s.site == site)
      .filter(a => a.name === meltName)
    if (actual[0]) return actual[0]
  }

  static async getToDay() {
   const melts = await Melt.getAll();
   const curDate = new Date();
   const curDay = `${curDate.getFullYear()}-${('0' + (curDate.getMonth() + 1)).slice(-2)}-${('0' + curDate.getDate()).slice(-2)}`;

   return melts.filter(item => item.workdate === curDay);
  }

}

module.exports = Melt;
