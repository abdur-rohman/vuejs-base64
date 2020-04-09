const model = require("../models/posts");
const response = require("../helper/response");
const { promises } = require("fs");

exports.getAllPost = async (req, res) => {
  try {
    const data = await model.find();
    response.success(res, data);
  } catch (error) {
    response.failed(res, 500, error);
  }
};

exports.createPost = async (req, res) => {
  try {
    if (req.body && req.body.attributes) {
      req.body.attributes.created_ad = new Date().toISOString();

      const data = await model.create(req.body.attributes);

      const byte = req.body.attributes.image
        ? Buffer.from(req.body.attributes.image, "base64")
        : undefined;

      const name = data.id;

      if (byte) await promises.writeFile(`upload/images/${name}.png`, byte);

      response.success(res, data);
    } else {
      response.failed(res, 400, "Some field is empty");
    }
  } catch (error) {
    response.failed(res, 500, error);
  }
};

exports.getPostImage = async (req, res) => {
  try {
    const name = req.params.id;

    const uploads = await promises.readdir(`upload/images`);

    const image = uploads.includes(`${name}.png`)
      ? await promises.readFile(`upload/images/${name}.png`)
      : await promises.readFile(`upload/images/default.png`);

    res.set({
      "Content-Type": "image/png",
      "Content-Length": image.length,
    });

    res.send(image);
  } catch (error) {
    response.failed(res, 500, error);
  }
};
