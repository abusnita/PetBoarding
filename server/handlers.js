const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const moment = require("moment");
require("dotenv").config();
//const cloudinary = require("cloudinary").v2;
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const profilePictureUpload = async(req, res) =>{
//     cloudinary.uploader.upload("")
// }
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
//const { flights, reservations } = require("./data");

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
    //pets: [],
  };
  try {
    if (/[^a-zA-Z-, ]/.test(firstName) || /[^a-zA-Z-, ]/.test(lastName)) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "First and last names should contain letters only!",
      });
    }
    //console.log(newUser);
    if (!email?.includes("@")) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "Please enter a valid email address!",
      });
    }

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    if (userType !== "host") {
      const existingUser = await db
        .collection("customers")
        .findOne({ "account.email": email });

      if (existingUser) {
        res.status(400).json({
          status: 400,
          data: email,
          message:
            "There is already an existing account associated with this email address.",
        });
      } else if (password !== confirmPassword) {
        res.status(400).json({
          status: 400,
          message: "Passwords don't match. Please try again!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        newUser.account.password = await bcrypt.hash(
          newUser.account.password,
          salt
        );

        await db.collection("customers").insertOne(newUser);
      }
    } else {
      const existingUser = await db
        .collection("serviceProviders")
        .findOne({ "account.email": email });

      if (existingUser) {
        res.status(400).json({
          status: 400,
          data: email,
          message:
            "There is already an existing account associated with this email address.",
        });
      } else if (password !== confirmPassword) {
        res.status(400).json({
          status: 400,
          message: "Passwords don't match. Please try again!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        newUser.account.password = await bcrypt.hash(
          newUser.account.password,
          salt
        );

        await db.collection("serviceProviders").insertOne(newUser);
      }
    }
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
  const { email, password } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("PetBoarding");

  const customer = await db
    .collection("customers")
    .findOne({ "account.email": email });

  if (customer) {
    const validPassword = await bcrypt.compare(
      password,
      customer.account.password
    );
    if (validPassword) {
      return res.status(400).json({
        status: 200,
        data: customer,
        message: "Signed in successfully!",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Invalid password!",
      });
    }
  } else {
    return res.status(401).json({
      status: 400,
      message: "User doesn't exist!",
    });
  }
};
const getCustomers = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");
    const customers = await db.collection("customers").find().toArray();

    if (customers) {
      res.status(200).json({ status: 200, customers: customers });
    } else {
      res.status(404).json({ status: 404, message: "No customers found!" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const petRegistration = async (req, res) => {
  console.log(req.params);
  const _id = req.params._id;
  const pets = req.body.petLibrary;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");
    const customer = await db.collection("customers").findOne({ _id: _id });
    console.log(_id);
    if (!customer) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    } else {
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
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};
const addServiceInfo = async (req, res) => {
  console.log(req.params);

  const _id = req.params._id;

  const {
    serviceInfo,
    serviceInfo: {
      capabilities: { cats, dogs, other },
    },
    serviceType,
  } = req.body;
  // console.log("line 243", serviceInfo);
  // console.log("line 244", available);
  cats.max = Number(cats.max);
  dogs.max = Number(dogs.max);

  cats.price = Number(cats.price);
  dogs.price = Number(dogs.price);
  other.price = Number(other.price);

  for (let i = 0; i < 7; i++) {
    cats.available?.push(cats.max);
    dogs.available?.push(dogs.max);
  }
  //console.log("line 265", cats.available);
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");
    const user = await db.collection("serviceProviders").findOne({ _id: _id });
    //console.log(_id);
    if (!user) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    } else {
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
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const updateProfile = async (req, res) => {
  console.log(req.params);
  const _id = req.params._id;
  const avatarUrl = req.body.avatarUrl;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("PetBoarding");
    const customer = await db.collection("customers").findOne({ _id: _id });
    console.log(_id);
    if (!customer) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    } else {
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
      client.close();
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const findMatches = async (req, res) => {
  console.log(req.body);
  const { pets, serviceType, area, dates } = req.body.data;
  const petsValues = Object.values(pets);
  const areaValues = Object.values(area);
  //console.log("line 300", Number(""));
  //console.log("line 301", pets);
  const start = moment(dates.start).format("DD MM YYYY");
  const end = moment(dates.end).format("DD MM YYYY");
  const newDate = moment(new Date()).format("DD MM YYYY");

  const startSlice = start.slice(0, 2) - newDate.slice(0, 2);
  const endSlice = end.slice(0, 2) - newDate.slice(0, 2);
  console.log(start);
  console.log(end);
  console.log("startSlice", startSlice);
  console.log("endSlice", endSlice);
  try {
    if (petsValues.every((qty) => Number(qty) === 0)) {
      return res.status(400).json({
        status: 400,
        data: pets,
        message: "You have to enter at least one pet!",
      });
    }

    // if (areaValues.every((value) => value === "")) {
    //   return res.status(400).json({
    //     status: 400,
    //     data: area,
    //     message: "You have to fill in at least one input field!",
    //   });
    // }

    if (dates?.start > dates?.end) {
      return res.status(400).json({
        status: 400,
        data: dates,
        message: "Start date should be before end date!",
      });
    }

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");
    //const petKeys = Object.keys(pets);
    //looking for service providers who can take care of the provided cats
    let numCats = Number(pets.cats);
    let numDogs = Number(pets.dogs);
    //console.log(numCats);
    const stCheckedServiceProviders = await db
      .collection("serviceProviders")
      .find({
        // "capabilities.cats.available": { $gte: numCats },
        // "capabilities.dogs.available": { $gte: numDogs },
        serviceType: serviceType,
      })
      .toArray();

    const availabilitiesChecked = stCheckedServiceProviders.filter(
      (provider) => {
        if (
          provider.capabilities.cats.available
            .slice(startSlice, endSlice)
            .every((av) => {
              console.log("cats", av);
              return av >= numCats;
            })
        ) {
          if (
            provider.capabilities.dogs.available
              .slice(startSlice, endSlice)
              .every((av) => {
                console.log("dogs", av);
                return av >= numDogs;
              })
          ) {
            return provider;
          }
        }
      }
    );

    console.log("line 391", availabilitiesChecked);
    if (availabilitiesChecked) {
      res.status(200).json({
        status: 200,
        data: availabilitiesChecked,
        message: "Success!",
      });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  }
};

const addReservation = async (req, res) => {
  const { dates, pets, serviceType } = req.body.bookingCriteria;
  const { selectedMatch } = req.body;
  const { signedInUser } = req.body;
  const { cats, dogs } = selectedMatch.capabilities;
  const { creditCard, exYear, exMonth } = req.body.paymentInfo;

  //console.log(req.body);
  const _id = uuidv4();
  const newReservation = {
    _id: _id,
    dates: dates,
    pets: pets,
    serviceType: serviceType,
    total: selectedMatch.total,
    customer: {
      _id: signedInUser._id,
      firstName: signedInUser.firstName,
      lastName: signedInUser.lastname,
      phoneNumber: signedInUser.phoneNumber,
      email: signedInUser.email,
    },
    provider: {
      _id: selectedMatch._id,
      firstName: selectedMatch.firstName,
      lastName: selectedMatch.lastname,
      phoneNumber: selectedMatch.phoneNumber,
      email: selectedMatch.email,
    },
    paymentInfo: {
      creditCard: creditCard,
      exMonth: exMonth,
      exYear: exYear,
    },
  };

  const start = moment(dates.start).format("DD MM YYYY");
  const end = moment(dates.end).format("DD MM YYYY");
  const newDate = moment(new Date()).format("DD MM YYYY");

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    //await db.collection("reservations").insertOne(newReservation);

    const newCatsAvailabilities = selectedMatch.capabilities.cats.available.map(
      (av, index) => {
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
    console.log("line 493", newCatsAvailabilities);
    console.log("line 494", newDogsAvailabilities);

    await db.collection("serviceProviders").updateOne(
      { _id: selectedMatch._id },
      {
        $set: {
          "capabilities.cats.available": newCatsAvailabilities,
        },
        // $set: {
        //   "dogs.available": newDogsAvailabilities,
        // },
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

    await db.collection("reservations").insertOne(newReservation);
    res.status(201).json({
      status: 201,
      data: newReservation,
      message: "reservation added successfully",
    });

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
  addServiceInfo,
  findMatches,
  addReservation,
};
