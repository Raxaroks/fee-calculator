const orders = require("../data/orders.json");
const fees = require("../data/fees.json");

const calculateItemPrice = (pages, prices) => {
  if (pages === 1) return prices.first;
  else {
    let sum = prices.first;
    for (let i = 1; i < pages; i++) sum += prices.later; 
    return sum;
  }
}

const printChallengeOneOutputs = () => {
  for (const order of orders) {
    let total = 0;

    console.log(`\n\nOrder ID: ${ order.order_number }`);

    order.order_items.forEach( (item, index) => {
      const { type, pages } = item;
      const prices = { first: 0, later: 0 };

      const found = fees.find( fee => fee.order_item_type === type );
      found.fees.forEach( 
        fee => (fee.type && fee.type === "flat") 
                ? prices.first = Number(fee.amount) 
                : prices.later = Number(fee.amount) 
      );

      const price = calculateItemPrice(pages, prices);
      total += price;
      console.log(`-> Order item #${index+1}: $${ price }`);      
    } );

    console.log(`--> Order total: $${ total }`);
  }
}

module.exports = { printChallengeOneOutputs, calculateItemPrice };