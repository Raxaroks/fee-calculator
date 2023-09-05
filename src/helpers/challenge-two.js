const orders = require("../data/orders.json");
const fees = require("../data/fees.json");
const { calculateItemPrice } = require("./challenge-one");

const printChallengeTwoOutputs = () => {
  const total_distributions = [];

  for (const order of orders) {
    let total_order = 0;
    const order_distributions = [];

    console.log(`\n\nOrder ID: ${ order.order_number }`);

    for (const item of order.order_items) {
      const { type, pages } = item;
      const prices = { first: 0, later: 0 };

      const fee = fees.find( fee => fee.order_item_type ===   type );
      fee.fees.forEach( 
        fee => (fee.type && fee.type === "flat") 
                ? prices.first = Number(fee.amount) 
                : prices.later = Number(fee.amount) 
      );     

      const price = calculateItemPrice(pages, prices);
      total_order += price;

      const raw_distr = fee.distributions.map( d => ({ name: d.name, amount: Number(d.amount)}));

      for (const distr of raw_distr) {
        const index = order_distributions.findIndex( od => distr.name === od.name );
        if (index < 0) order_distributions.push(distr);   
        else order_distributions[index].amount += distr.amount     
      }
    }

    let total_fund = 0;
    for (const distr of order_distributions) {
      total_fund += distr.amount;
      console.log(`-> Fund - ${distr.name}: $${distr.amount}`);

      const index = total_distributions.findIndex(td => td.name === distr.name);
      if (index < 0) total_distributions.push(distr);
      else total_distributions[index].amount += distr.amount;
    }

    if (total_order !== total_fund) {
      const diff = total_order - total_fund;
      console.log(`-> Fund - Other: $${diff}`);

      const idx = total_distributions.findIndex( td => td.name === "Other" );
      if (idx < 0) total_distributions.push({ name: "Other", amount: diff });
      else total_distributions[idx].amount += diff;
    }
      
  }

  console.log("\n Total distributions:");
  for (const distr of total_distributions) {
    console.log(`-> Fund: ${distr.name}: $${distr.amount}`);
  }
};

module.exports = { printChallengeTwoOutputs };