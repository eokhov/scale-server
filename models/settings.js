const fs = require('fs')
const path = require('path')

class Setting {

  static async getByName(name) {
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
}

module.exports = Setting