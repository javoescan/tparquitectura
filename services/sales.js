const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const sales = require("../mocks/sales.json");
const usersService = require("./users");
const productsService = require("./products");

class SalesService {
  fields = ["products", "userId", "date", "totalPrice"];

  productFields = ["id", "price"];

  getAll = () => {
    return sales;
  }

  get = id => {
    return sales.find(sale => sale.id === id);
  }

  create = sale => {
    const dataErrorMessage = this.dataErrorMessage(sale);
    if (dataErrorMessage) {
      return {
        message: dataErrorMessage,
      }
    }
    sale.id = uuidv4();
    sales.push(sale);
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return {
      sale,
    };
  }

  update = sale => {
    const saleIndex = sales.findIndex(pSale => pSale.id === sale.id);
    if (saleIndex === -1) {
      return null;
    }
    const dataErrorMessage = this.dataErrorMessage(sale);
    if (dataErrorMessage) {
      return {
        message: dataErrorMessage,
      };
    }
    sales[saleIndex] = sale;
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return {
      sale,
    };
  }

  delete = id => {
    const saleIndex = sales.findIndex(pSale => pSale.id === id);
    if (saleIndex === -1) {
      return null;
    }
    sales.splice(saleIndex, 1);
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return true;
  }

  dataErrorMessage = sale => {
    let message = "";
    sale.products.forEach(product => {
      const exists = productsService.get(product.id);
      if (!exists) {
        message += `Product ${product.id} doesn"t exist | `;
      }
    });
    const userExists = usersService.get(sale.userId);
    if (!userExists) {
      message += `User ${sale.userId} doesn"t exist`;
    }
    return message;
  }
}

module.exports = new SalesService();
