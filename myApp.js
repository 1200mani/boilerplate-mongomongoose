require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose

// Connect to MongoDB using the URI from the environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define the schema and model for a Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteFood: { type: String }
});

const Person = mongoose.model("Person", personSchema); // Create Person model from schema

// Create and Save a Person
const createAndSavePerson = (done) => {
  const person = new Person({ name: "John Doe", age: 25, favoriteFood: "Pizza" });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data); // Return saved person data
  });
};

// Create Many People
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return array of saved people data
  });
};

// Find People by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return people with the given name
  });
};

// Find One by Food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFood: food }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return first person with the given food
  });
};

// Find Person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return person with the given ID
  });
};

// Find, Edit and Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFood = foodToAdd;

    person.save((err, data) => {
      if (err) return done(err);
      done(null, data); // Return updated person data
    });
  });
};

// Find and Update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return done(err);
      done(null, data); // Return updated person data
    }
  );
};

// Remove by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return removed person data
  });
};

// Remove Many People
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return result of deletion
  });
};

// Query Chain
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFood: foodToSearch })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(5) // Limit to 5 results
    .select("name favoriteFood") // Only return name and favoriteFood fields
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data); // Return queried data
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
