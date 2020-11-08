const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const products = require('../mocks/products.json');

class ProductsService {
  fields = ["name", "description", "price"];

  getAll = () => {
    return products;
  }

  get = id => {
    return products.find(product => product.id === id);
  }

  create = product => {
    product.id = uuidv4();
    products.push(product);
    fs.writeFileSync('mocks/products.json', JSON.stringify(products));
    return product;
  }

  update = product => {
    const productIndex = products.findIndex(pProduct => pProduct.id === product.id);
    if (productIndex === -1) {
      return null;
    }
    products[productIndex] = product;
    fs.writeFileSync('mocks/products.json', JSON.stringify(products));
    return product;
  }

  delete = id => {
    const productIndex = products.findIndex(pProduct => pProduct.id === id);
    if (productIndex === -1) {
      return null;
    }
    products.splice(productIndex, 1);
    fs.writeFileSync('mocks/products.json', JSON.stringify(products));
    return true;
  }
}

module.exports = new ProductsService();
