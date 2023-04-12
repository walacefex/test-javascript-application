import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const calculatedPercentageDiscount = (amount, item) => {
  if(item.condition?.percentage && item.quantity > item.condition.minimum) {
     return amount.percentage(item.condition.percentage);
  }
  return Money({amount: 0});
}

const calculatedQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0;
  if(item.condition?.quantity && item.quantity > item.condition.quantity){
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({amount: 0});
}

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];
  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }
  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount =  Money({ amount: 0});

      if(item.condition?.percentage){
        discount = calculatedPercentageDiscount(amount, item);
      }else if(item.condition?.quantity){
        discount = calculatedQuantityDiscount(amount, item);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
