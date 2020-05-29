const fs = require('fs');
const path = require('path');

class Result {
  constructor(id) {
    this.id = id;
    this.materials = [];
    this.result = 0
  }

  toJSON() {
    return {
      id: this.id,
      materials: this.materials,
      result: this.result
    }
  }

  static async addMaterial(material) {
    const results = await Result.getAll();
    const idx =  results.findIndex(r => r.id === material.id);
    const result = results[idx];
    
    result.materials.push({
      material: material.material,
      weight: material.weight
    })

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'results.json'),
        JSON.stringify(results),
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

  async save() {
    const results = await Result.getAll();
    results.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'results.json'),
        JSON.stringify(results),
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

  static getAll() {
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

}

module.exports = Result;
