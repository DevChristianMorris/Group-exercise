const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate"); //
const app = express();
const ChirpsModel = require("./models/ChirpModel");
const formatChirp = require("./formatChirp");

app.use(cors());
app.use(express.json());

app.get("/chirps", async (request, response) => {
  const chirps = await ChirpsModel.find({});
  const formattedChirps = chirps.map((chirp) => formatChirp(chirp));

  response.send(formattedChirps);
});

app.get("/chirps/:id", async (request, response) => {
  const { id } = request.params;
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if (isIdValid) {
    const chirp = await ChirpsModel.findById(id);
    if (chirp) {
      return response.status(200).send(formatChirp(chirp));
    } else {
      return response.status(404).send({ message: "Chirp not found" });
    }
  } else {
    return response.status(400).send({ message: "Invalid chirp id" });
  }
});

app.post(
  "/chirps",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      text: Joi.string().required(),
      username: Joi.string().required(),
      avatar: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const chirp = new ChirpsModel(body);
      await chirp.save();
      return res.status(201).send(formatChirp(chirp));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

app.use(errors());

module.exports = app;
