require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Connect to MongoDB using the URI from the environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name field is required
  age: { type: Number, required: true },  // Age field is required
  favoriteFoods: { type: [String], required: true }  // favoriteFoods is an array of strings and is required
});

// Create a model from the schema and assign it to the Person variable
const Person = mongoose.model('Person', personSchema);

// Function to create and save a new person
const createAndSavePerson = (done) => {
  // Create a new instance of the Person model with name, age, and favoriteFoods fields
  const person = new Person({
    name: "John Doe", // Name of the person
    age: 25,          // Age of the person
    favoriteFoods: ["Pizza", "Burgers"] // Array of favorite foods
  });

  // Save the created person document to the database
  person.save(function(err, data) {
    if (err) {
      return done(err); // Pass any errors to the callback
    }
    done(null, data); // Pass the saved data to the callback
  });
};

// Function to create many people
const createManyPeople = (arrayOfPeople, done) => {
  // Use the Person model to create multiple people by passing the arrayOfPeople
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err); // If there's an error, pass it to the callback
    }
    done(null, data); // Pass the saved data to the callback if successful
  });
};

// Function to find people by their name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return people with the given name
  });
};

// Function to find a person by their favorite food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return the first person who has the given food
  });
};

// Function to find a person by their ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return person with the given ID
  });
};

// Function to find, edit and save a person
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd); // Add the food to the list

    person.save((err, data) => {
      if (err) return done(err);
      done(null, data); // Return updated person data
    });
  });
};

// Function to find and update a person by their name
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, // Return the updated document
    (err, data) => {
      if (err) return done(err);
      done(null, data); // Return updated person data
    }
  );
};

// Function to remove a person by their ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return removed person data
  });
};

// Function to remove many people with the name "Mary"
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    done(null, data); // Return the result of the deletion
  });
};

// Function to chain a query (e.g., searching for a food)
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(5) // Limit to 5 results
    .select("name favoriteFoods") // Only return name and favoriteFoods fields
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
