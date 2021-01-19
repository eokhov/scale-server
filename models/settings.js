const fs = require('fs')
const path = require('path')

class Setting {

  constructor(name, melt, site, materials) {
    this.name = name;
    this.melt = melt;
    this.site = site;
    this.materials = materials; 
  }

  toJSON() {
    return {
      name: this.name,
      melt: this.melt,
      site: this.site,
      materials: this.materials,
    }
  }

  static async getByName(name) {
    const settings = await Setting.getAll()
    return settings.find(s => s.name === name)
  }
  
  static async getNameList(name) {
    const settings = await Setting.getAll()
    return settings.find(s => s.name === name)
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'settings.json'),
        'utf-8',
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(data))
          }
        }
      )
    })
  }

  async save() {
    const settings = await Setting.getAll();
    settings.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'settings.json'),
        JSON.stringify(settings),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    })
  }
}

module.exports = Setting