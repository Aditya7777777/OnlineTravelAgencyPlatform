const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(()=>console.log("connection successful"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
   item:String,
   price:Number,
});

const customerSchema = new Schema({
    name:String,
    orders:[
        {
            type: Schema.Types.ObjectId, //this is used to define ObjectId  as an type 
            ref:"Order" //collection name needed to be written while defining object Id as an type refer mongoose documentation populate
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async() =>{
//   console.log("PRE,MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async(customer) =>{
  if(customer.orders.length){
    let res = Order.deleteMany({_id:{$in: customerSchema.orders}});
    console.log(res);
  }
});

const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

const findCustomer = async() =>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}


const addCustomer = async() =>{
    // let cust1 = new Customer({
    //     name : "Rahul Kumar",
    // });

    // let order1 = await Order.findOne({item:"chips"});
    // let order2 = await Order.findOne({item:"chocolate"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let result = await cust1.save();   
    // console.log(result);

    let newCust = new Customer({
      name: "Karan Arjun"
    });

    let newOrder = new Order({
      item :"Pizza",
      price: 250
    });

    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();

    console.log("added new customer");

  };

  const delCust = async() =>{
    const data = await Customer.findByIdAndDelete("679e33cbf1f87ed9effef7d7");
    console.log(data);
  }


  // addCustomer();
  delCust();


   


// const addOrders = async ()=>{
//    let res = await Order.insertMany([
//     {item : "Samosa",price:12},
//     {item:"chips",price:12},
//     {item:"chocolate",price:40}    
//    ]);
//    console.log(res);
// };




/*************************NOTE******************************************/
// FIRST NOTE
 /* here when you will run the above code mongoose will show that inside 
 the customer collections data in orders shows the whole orders has been 
 stored as it was present in order collection 
 but if we check the customers collection in orders only object Id 
 is stored 
 */



// PS C:\Users\adity\OneDrive\Desktop\Major_Project\Relationships>node customers.js
// connection successful
// {
//   name: 'Rahul Kumar',
//   orders: [
//     {
//       item: 'chips',
//       price: 12,
//       _id: new ObjectId('679dba412dd3dff0f62f4775'),
//       __v: 0
//     },
//     {
//       item: 'chocolate',
//       price: 40,
//       _id: new ObjectId('679dba412dd3dff0f62f4776'),
//       __v: 0
//     }
//   ],
//   _id: new ObjectId('679dbd2adef9856cab7a0d85'),
//   __v: 0
// }


// SECOND NOTE
/* [
  {
    _id: new ObjectId('679dbd2adef9856cab7a0d85'),
    name: 'Rahul Kumar',
    orders: [
      new ObjectId('679dba412dd3dff0f62f4775'),
      new ObjectId('679dba412dd3dff0f62f4776')
    ],
    __v: 0
  }
]

now in the above array is we want the whole data of the orders  instead of only Id 
then we will use method populate :
let result = await Customer.find({}).populate("orders");

after using populte we will get the result :
[
  {
    _id: new ObjectId('679dbd2adef9856cab7a0d85'),
    name: 'Rahul Kumar',
    orders: [ [Object], [Object] ],
    __v: 0
  }
]


 */



