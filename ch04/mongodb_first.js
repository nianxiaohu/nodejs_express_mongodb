const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { Schema , model} = mongoose;
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

/*   // the following code examples can be pasted here...
  await db.collection('inventory').insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' }
}); */
//await db.collection('animals').insertOne({_id:2,name:'mimi',type:'dog'});


/* 
// By default, Mongoose adds an _id property to your schemas
const schema = new mongoose.Schema();
console.log(schema.path('_id'));
const Model = mongoose.model('Test', schema);
const doc = new Model();
console.log(doc._id instanceof mongoose.Types.ObjectId); 
*/



await mongoose.connect('mongodb://127.0.0.1:27017/myProject');

/* // You can also overwrite Mongoose's default _id with your own _id. Just be careful: Mongoose will refuse to save a top-level document that doesn't have an _id, so you're responsible for setting _id if you define your own _id path.
const schema = new Schema({
  _id: Number, // <-- overwrite Mongoose's default `_id`
 name: String,
 type: String,
});
const Model = model('Animal', schema);
const doc = new Model();
//await doc.save(); // Throws "document must have an _id before saving"
doc._id = 6;
doc.name='roger';
doc.type='rabbit';
await doc.save();
console.log("Document saved!"); // Executes after the save */


//Instance methods
//Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods.
// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // Assign a function to the "methods" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
    methods: {
      findSimilarTypes(cb) {
        return mongoose.model('Animal').find({ type: this.type }, cb);
      }
    }
  });

/* // Or, assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb);
}; */
const Animal = mongoose.model('Animal', animalSchema);
const dog = new Animal({ type: 'dog', name:'mongoose_dog' });
const wolf = new Animal({type:'dog',name:'seal_dog'});
await wolf.save();
await dog.save();


console.log(dog.findSimilarTypes());
//await doc.save(); // works  buffering timed out after 10000ms





  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {client.close(); mongoose.disconnect();});