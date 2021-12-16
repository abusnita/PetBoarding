const path = require("path");
const express = require("express");
const {
  getCustomers,
  signUp,
  signIn,
  petRegistration,
  updateProfile,
  addServiceInfo,
  findMatches,
  addReservation,
} = require("./handlers");

const PORT = 8000;

express()
  .use(express.json())

  .get("/customers", getCustomers)
  .post("/signUp", signUp)
  .post("/signIn", signIn)
  .put("/petRegistration/:_id", petRegistration)
  .put("/updateProfile/:_id", updateProfile)
  .put("/serviceProviderInfo/:_id", addServiceInfo)
  .post("/bookingCriteria/matches/", findMatches)
  .post("/reservations", addReservation)
  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
