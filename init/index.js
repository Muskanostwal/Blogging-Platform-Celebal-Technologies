const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/InkPress";
main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'6881197a0f36b5786810f37d'}));
    await Listing.insertMany(initData.data);
    console.log("data is initialised");
};

initDB();
