const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const moment = require("moment");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// this package generates unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//sign up method
const signUp = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    address: { street, city, postalCode, province, country },
    phoneNumber,
    account: { email, password },
    confirmPassword,
  } = req.body.user;
  const { userType } = req.body;

  //this is the id that will be assigned to the new user account
  const id = uuidv4();

  const newUser = {
    _id: id,
    firstName,
    lastName,
    address: {
      street,
      city,
      postalCode,
      province,
      country,
    },
    phoneNumber,
    account: {
      email,
      password,
    },
  };

  try {
    //validation of the first and last names to ensure they only contain letters spaces and -
    if (/[^a-zA-Z-, ]/.test(firstName) || /[^a-zA-Z-, ]/.test(lastName)) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "First and last names should contain letters only!",
      });
    }

    //validation of the email address to ensure it contains @
    if (!email?.includes("@")) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "Please enter a valid email address!",
      });
    }

    //connection to MongoDB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    //connection to PetBoarding database
    const db = client.db("PetBoarding");

    //if the user is not a service provider, try to find another existing account with
    //the provided email in the customers database
    if (userType !== "host") {
      const existingUser = await db
        .collection("customers")
        .findOne({ "account.email": email });

      //if another user with the same email has been found, return error message

      if (existingUser) {
        res.status(400).json({
          status: 400,
          data: email,
          message:
            "There is already an existing account associated with this email address.",
        });

        //if there are no other users with the provided email, proceed to verifying
        //that the password and the confirmation password match
      } else if (password !== confirmPassword) {
        res.status(400).json({
          status: 400,
          message: "Passwords don't match. Please try again!",
        });

        //if the 2 passwords provided match, proceed to password encryption
      } else {
        const salt = await bcrypt.genSalt(10);
        newUser.account.password = await bcrypt.hash(
          newUser.account.password,
          salt
        );
        //insert new accoun in the customer database
        await db.collection("customers").insertOne(newUser);
      }
    }
    //if the user is a service provider, try to find another existing account with
    //the provided email in the service providers database
    else {
      const existingUser = await db
        .collection("serviceProviders")
        .findOne({ "account.email": email });
      //if a user with the same email already exists in the customers database, return error message
      if (existingUser) {
        res.status(400).json({
          status: 400,
          data: email,
          message:
            "There is already an existing account associated with this email address.",
        });
      }
      //if no other user in the customers database has the same email address,
      //verify that the password matches the conrimed password
      else if (password !== confirmPassword) {
        res.status(400).json({
          status: 400,
          message: "Passwords don't match. Please try again!",
        });

        //if the 2 passwords match, encrypt password
      } else {
        const salt = await bcrypt.genSalt(10);
        newUser.account.password = await bcrypt.hash(
          newUser.account.password,
          salt
        );
        //add new service provider to the service providers database
        await db.collection("serviceProviders").insertOne(newUser);
      }
    }
    //disconnect from MongoDB and send message that the new user has been added to the database successfully
    client.close();
    res.status(201).json({
      status: 201,
      data: newUser,
      message: "New customer successfully added!",
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const signIn = async (req, res) => {
  //deconstruct email and password from the data sent from the front end
  const { email, password } = req.body;

  //connect to MongoDB
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("PetBoarding");

  //look for an account in the customers database tied to the email provided
  const customer = await db
    .collection("customers")
    .findOne({ "account.email": email });

  //if the email is already registered, proceed to password check
  if (customer) {
    const validPassword = await bcrypt.compare(
      password,
      customer.account.password
    );

    //if a valid password is entered, send success message
    if (validPassword) {
      return res.status(200).json({
        status: 200,
        data: customer,
        message: "Signed in successfully!",
      });

      //if the password doesn;t match the one on file, send back an error message
    } else {
      return res.status(400).json({
        status: 400,
        message: "Invalid password!",
      });
    }
  }
  //if no account exists in the customers database with the email provided, look in
  //the service providers database
  else {
    const provider = await db
      .collection("serviceProviders")
      .findOne({ "account.email": email });

    //if a user account with the provided email is found in the service providers database,
    //proceed to password check
    if (provider) {
      const validPassword = await bcrypt.compare(
        password,
        provider.account.password
      );
      //if the password provided matches the one on file, send back success message
      if (validPassword) {
        return res.status(200).json({
          status: 200,
          data: provider,
          message: "Signed in successfully!",
        });
      }
      //if the password provided doesn't match the one on file, send back error message
      else {
        return res.status(400).json({
          status: 400,
          message: "Invalid password!",
        });
      }
    }
    //if no user accounts were found in any of the databases with the providd email, send back error message
    else {
      return res.status(400).json({
        status: 400,
        message: "No user found with provided email!",
      });
    }
  }
};

const updateProfile = async (req, res) => {
  const _id = req.params._id;

  //deconstruct user info from the data received from the front end
  const {
    firstName,
    lastName,
    address: { street, city, postalCode, province, country },
    phoneNumber,
    account: { email },
  } = req.body.user;

  const { userType } = req.body;

  try {
    //perform some validations for the first and last name to ensure they only contain letters, spaces and -
    if (/[^a-zA-Z-, ]/.test(firstName) || /[^a-zA-Z-, ]/.test(lastName)) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "First and last names should contain letters only!",
      });
    }

    //perform some validation on the new email address to make sure it contains at least the @ character
    if (!email?.includes("@")) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "Please enter a valid email address!",
      });
    }
    //connect to MoongoDB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    //if the user is not a service provider, find the corresponding account in the
    //customers database
    if (userType !== "host") {
      const findUser = await db.collection("customers").findOne({ _id: _id });

      //if the user with the ID provided is not found in the service providers
      //database send back error message
      if (!findUser) {
        res.status(400).json({
          status: 400,
          message: "User not found!",
        });
      }
      //if the user is found in the service providers database, update the fields of the account
      // to the info provided from the front end and send back success message
      else {
        const query = { _id };
        const newValues = {
          $set: {
            firstName: firstName,
            lastName: lastName,
            "address.street": street,
            "address.city": city,
            "address.postalCode": postalCode,
            "address.province": province,
            "address.country": country,
            phoneNumber: phoneNumber,
            "account.email": email,
          },
        };
        await db.collection("customers").updateOne(query, newValues);
        res.status(200).json({
          status: 200,
          data: { ...findUser, newData: req.body.user },
          message: "Profile update successful",
        });
      }
    }

    //close MongoDB connection
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    //connect to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    //find all customers in the custoemrs database
    const customers = await db.collection("customers").find().toArray();

    //if customers found, send success message and an array of all the customers found
    if (customers) {
      res.status(200).json({ status: 200, customers: customers });
    }
    //if no customers were found, send back error message
    else {
      res.status(404).json({ status: 404, message: "No customers found!" });
    }

    //close Mongo DB connection
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getReservationsByUserId = async (req, res) => {
  //recover the user id for the search from the front end
  const { userId } = req.params;
  let userType = "";
  try {
    //connect to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");
    //look for the user in the customers database, with the provided id
    const findCustomer = await db
      .collection("customers")
      .findOne({ _id: userId });
    //if the user is found in the customer database, set the userType to customer
    if (findCustomer) {
      userType = "customer";
    }
    //if the user is not found in the customer database, try to find him in the service providers database
    else {
      const findServiceProvider = await db
        .collection("serviceProviders")
        .findOne({ _id: userId });
      //if the user is found in the service providers database, set user type to host
      if (findServiceProvider) {
        userType = "host";
      }
      //if the user is not found in the customers or the service providers databases return error message
      else {
        return res
          .status(404)
          .json({ status: 404, message: "User not found!" });
      }
    }

    //if the user type is customer, get all the reservations in the customer's name from the reservations database
    if (userType === "customer") {
      const reservations = await db
        .collection("reservations")
        .find({ "customer._id": userId })
        .toArray();
      //if no reservations have been found on the customer's name return error message
      if (!reservations) {
        res
          .status(404)
          .json({ status: 404, message: "No reservations found!" });
      }
      //otherwise return an array with all the reservations under the customer's name
      res.status(200).json({ status: 200, reservations: reservations });
    }
    //if the user type is host, look for reservations with the specified service provider in the reservations database
    if (userType === "host") {
      const reservations = await db
        .collection("reservations")
        .find({ "provider._id": userId })
        .toArray();
      //if no reservations are found, return error message
      if (!reservations) {
        res
          .status(404)
          .json({ status: 404, message: "No reservations found!" });
      }
      //otherwise return an array with all the reservations with the specified service provider
      res.status(200).json({ status: 200, reservations: reservations });
    }
    //close Mongo DB connection
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

//when creating an acount as a customer, after personal info registration the user
//will be prompted to add pets to his account; the data collected with this method is then
//added to his account info in the customers database

const petRegistration = async (req, res) => {
  //recover the user id and the pet info from the front end
  const _id = req.params._id;
  const pets = req.body.petLibrary;
  try {
    //open a conection to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");
    //find the customer for which we are trying to register the pets info
    const customer = await db.collection("customers").findOne({ _id: _id });
    //if customer is not found, send back error message
    if (!customer) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    }
    //if customer found, add the pets info from the front end to the customer info in the customers database and send
    // back success message and the pets info
    else {
      const query = { _id };
      const newValues = {
        $set: { pets: pets },
      };
      await db.collection("customers").updateOne(query, newValues);
      res.status(200).json({
        status: 200,
        data: { ...customer, pets: pets },
        message: "Pet registration successful",
      });
      //close Mongo DB connection
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};

//when creating an acount as a service provider, after personal info registration the user
//will be prompted to add service info to his account; the data collected with this method is then
// added to his account info in the service providers database

const addServiceInfo = async (req, res) => {
  //recover service provider id and service info from the front end
  const _id = req.params._id;

  const {
    serviceInfo,
    serviceInfo: {
      capabilities: { cats, dogs, other },
    },
    serviceType,
  } = req.body;

  //convert provided cats and dogs data from string to numbers for future mathematical
  // manipulation and storage in the database
  cats.max = Number(cats.max);
  dogs.max = Number(dogs.max);

  cats.price = Number(cats.price);
  dogs.price = Number(dogs.price);
  other.price = Number(other.price);

  //store the numbers for the cats and dogs in the object that will be pushed
  //in the service providers database
  for (let i = 0; i < 7; i++) {
    cats.available?.push(cats.max);
    dogs.available?.push(dogs.max);
  }

  try {
    //conect to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");

    //find the service provider with the id provided from the front end
    const user = await db.collection("serviceProviders").findOne({ _id: _id });

    //if the service provider is not found, send back error message
    if (!user) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    }
    //if the service provider is found, add the service info provided in the front end
    // to the service provider account in the service providers database
    else {
      const query = { _id };
      const newValues = {
        $set: { ...serviceInfo, serviceType: serviceType },
      };
      await db.collection("serviceProviders").updateOne(query, newValues);
      res.status(200).json({
        status: 200,
        data: { ...user, ...serviceInfo, serviceType: serviceType },
        message: "Successful addition of service provider info",
      });

      //clode Mongo DB conection
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const getUserInfo = async (req, res) => {
  //recover the user id and the pet info from the front end
  const _id = req.params.userId;

  try {
    //open a conection to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");

    //find the customer by id
    const customer = await db.collection("customers").findOne({ _id: _id });

    //if user is found in the customers database, send back sucess message and the customer info
    if (customer) {
      res.status(200).json({
        status: 200,
        data: customer,
        message: "User found!",
      });
    }

    //if user is not found in the customers database, try to look for user in the service providers database
    else {
      const serviceProvider = await db
        .collection("serviceProviders")
        .findOne({ _id: _id });
      //if user is found in the service providers database, send back sucess message and the service provider info
      if (serviceProvider) {
        res.status(200).json({
          status: 200,
          data: serviceProvider,
          message: "User found!",
        });
      }
      //if user not found in the customer database or in the service providers database, send back error message
      else {
        res.status(400).json({
          status: 400,
          message: "User not found!",
        });
      }

      //close Mongo DB connection
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};

//this method is meant to add a picture to a customer or service provider profile
const updateAvatar = async (req, res) => {
  //recover the user id and the picture url from the front end
  const _id = req.params._id;
  const { avatarUrl } = req.body;
  let userType = "";
  try {
    //connect to Mongo DB database
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");

    //establish user type
    //attempt to find the user in the customers database
    const customer = await db.collection("customers").findOne({ _id: _id });

    if (customer) {
      userType = "customer";
    } else {
      const findServiceProvider = await db
        .collection("serviceProviders")
        .findOne({ _id: _id });

      //if the user is found in the service providers database, set user type to host
      if (findServiceProvider) {
        userType = "host";
      }
      //if the user is not found in the customers or the service providers databases return error message
      else {
        return res
          .status(404)
          .json({ status: 404, message: "User not found!" });
      }
    }

    //if the user type is customer, update the user profile with the profile picture url in
    //the customers database and send back success message
    if (userType === "customer") {
      const query = { _id };
      const newValues = {
        $set: { avatarUrl: avatarUrl },
      };
      await db.collection("customers").updateOne(query, newValues);
      res.status(200).json({
        status: 200,
        data: { avatarUrl: avatarUrl, customer_id: _id },
        message: "Avatar addition successful",
      });
    }

    //if the user type is host, update the user profile with the profile picture url in
    //the service providers database and send back success message
    if (userType === "host") {
      const query = { _id };
      const newValues = {
        $set: { avatarUrl: avatarUrl },
      };
      await db.collection("serviceProviders").updateOne(query, newValues);
      res.status(200).json({
        status: 200,
        data: { avatarUrl: avatarUrl, serviceProvider_id: _id },
        message: "Avatar addition successful",
      });
    }

    //close Mongo DB connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//this method will find all service providers matching the booking criteria provided in the front end
const findMatches = async (req, res) => {
  //extract booking criteria fron the front end
  const { pets, serviceType, area, dates } = req.body.data;

  const petsValues = Object.values(pets);
  const areaValues = Object.values(area);

  //reformat the start and end dates provided in the booking criteria for future manipulation
  const start = moment(dates.start).format("DD MM YYYY");
  const end = moment(dates.end).format("DD MM YYYY");
  const newDate = moment(new Date()).format("DD MM YYYY");

  const startSlice = start.slice(0, 2) - newDate.slice(0, 2);
  const endSlice = end.slice(0, 2) - newDate.slice(0, 2);

  try {
    //perform validation of the booking criteria provided in the front end
    //verify if at least one pet is provided
    if (petsValues.every((qty) => Number(qty) === 0)) {
      return res.status(400).json({
        status: 400,
        data: pets,
        message: "You have to enter at least one pet!",
      });
    }

    //verify if the end date is after the start date for a valid time interval
    if (dates?.start > dates?.end) {
      return res.status(400).json({
        status: 400,
        data: dates,
        message: "Start date should be before end date!",
      });
    }

    //connect to Mongo DB
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    //convert data from the front end to numbers for mathematical manipulation
    let numCats = Number(pets.cats);
    let numDogs = Number(pets.dogs);

    //find all service providers who offer the type of service specified in the booking criteria
    const stCheckedServiceProviders = await db
      .collection("serviceProviders")
      .find({
        serviceType: serviceType,
      })
      .toArray();

    //from the filtered service providers who offer the requested service,
    //filter further to providers with the appropriate availabilities
    const availabilitiesChecked = stCheckedServiceProviders.filter(
      (provider) => {
        //for each provider who offer the requested service, verify the availabilities
        //array at the indexes corresponding to the booking criteria dates

        //check the availabilities array has the appropriate number of available spots for the
        //cats specified in the booking criteria at the indexes corresponding to the dates
        //specified in the booking criteria
        if (
          provider.capabilities.cats.available
            .slice(startSlice, endSlice)
            .every((av) => {
              return av >= numCats;
            })
        ) {
          //if the availabilities array has the appropriate number of available spots for the
          //cats specified in the booking criteria at the indexes corresponding to the dates
          //specified in the booking criteria, verify that the same is true for the dogs
          if (
            provider.capabilities.dogs.available
              .slice(startSlice, endSlice)
              .every((av) => {
                return av >= numDogs;
              })
          ) {
            //if the provider has spots for all the cats and dogs for the specified period of time add provider to the matching results array
            return provider;
          }
        }
      }
    );

    //if any matches for the booking criteria are found return success message and the matches array
    if (availabilitiesChecked) {
      res.status(200).json({
        status: 200,
        data: availabilitiesChecked,
        message: "Success!",
      });
    }
    //close connection to Mongo DB
    client.close();
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  }
};

//this method is meant for adding a reservation to the reservations database
const addReservation = async (req, res) => {
  //recover all the booking details provided in the front end
  const { dates, pets, serviceType } = req.body.bookingCriteria;
  const { selectedMatch } = req.body;
  const { signedInUser } = req.body;
  const { cats, dogs } = selectedMatch.capabilities;
  const { creditCard, exYear, exMonth } = req.body.paymentInfo;

  //create an id for the new reservation
  const _id = uuidv4();

  //define the reservation object to be addd to the database
  const newReservation = {
    _id: _id,
    dates: dates,
    pets: pets,
    serviceType: serviceType,
    total: selectedMatch.total,
    customer: {
      _id: signedInUser._id,
      firstName: signedInUser.firstName,
      lastName: signedInUser.lastName,
      phoneNumber: signedInUser.phoneNumber,
      email: signedInUser.account.email,
    },
    provider: {
      _id: selectedMatch._id,
      firstName: selectedMatch.firstName,
      lastName: selectedMatch.lastName,
      phoneNumber: selectedMatch.phoneNumber,
      email: selectedMatch.account.email,
    },
    paymentInfo: {
      creditCard: creditCard,
      exMonth: exMonth,
      exYear: exYear,
    },
  };

  //some data reformatting for math manipulation
  const start = moment(dates.start).format("DD MM YYYY");
  const end = moment(dates.end).format("DD MM YYYY");
  const newDate = moment(new Date()).format("DD MM YYYY");

  try {
    //open Mongo DB connection
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    //update the availabilities array for the cats in the service providers database
    //for the corresponding service provider
    const newCatsAvailabilities = selectedMatch.capabilities.cats.available.map(
      (av, index) => {
        //for every date that corresponds to an availability array element,
        //update the availabilities by subtracting the number of cats in the reservation from the availabilities
        if (
          Number(newDate.slice(0, 2)) + index >= Number(start.slice(0, 2)) &&
          Number(newDate.slice(0, 2)) + index <= Number(end.slice(0, 2))
        ) {
          return av - pets.cats;
        } else {
          return av;
        }
      }
    );
    const newDogsAvailabilities = selectedMatch.capabilities.dogs.available.map(
      (av, index) => {
        //for every date that corresponds to an availability array element,
        //update the availabilities by subtracting the number of dogs in the reservation from the availabilities
        if (
          Number(newDate.slice(0, 2)) + index >= Number(start.slice(0, 2)) &&
          Number(newDate.slice(0, 2)) + index <= Number(end.slice(0, 2))
        ) {
          return av - pets.dogs;
        } else {
          return av;
        }
      }
    );

    //update the service provider record in the service providers database
    //with the new cats and dogs availabilities
    await db.collection("serviceProviders").updateOne(
      { _id: selectedMatch._id },
      {
        $set: {
          "capabilities.cats.available": newCatsAvailabilities,
        },
      }
    );

    await db.collection("serviceProviders").updateOne(
      { _id: selectedMatch._id },
      {
        $set: {
          "capabilities.dogs.available": newDogsAvailabilities,
        },
      }
    );

    //insert the new reservation in the reservations database and send back success message
    await db.collection("reservations").insertOne(newReservation);
    res.status(201).json({
      status: 201,
      data: newReservation,
      message: "reservation added successfully",
    });

    //close Mongo DB connection
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = {
  getCustomers,
  signUp,
  signIn,
  petRegistration,
  updateProfile,
  updateAvatar,
  addServiceInfo,
  findMatches,
  addReservation,
  getReservationsByUserId,
  getUserInfo,
};
