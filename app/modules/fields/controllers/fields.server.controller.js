var Field = require("mongoose").model("Field");
var Count = require("mongoose").model("Count");
var _ = require("lodash");

//create new Field
exports.createField = async function (req, res) {
  try {
    const field = new Field({
      name: req.body.name,
      age: req.body.age,
      about: req.body.about,
    });
    await field.save();
    const count = await manageCount("create");
    res.status(200).send({ status: "success", count });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// update Particular field
exports.updateField = async function (req, res) {
  const { _id, name, age, about } = req.body;
  try {
    const field = await Field.findById(_id);
    if (field.name !== name) {
      field.name = name;
    }
    if (field.age !== age) {
      field.age = age;
    }
    if (field.about !== about) {
      field.about = about;
    }
    await field.save();
    const count = await manageCount("update");
    res.status(200).send({ status: "success", count });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//get all Fields
exports.getFields = async function (req, res) {
  const fields = await Field.find();
  const count = await manageCount("");
  res.status(200).send({ fields: fields, count });
};

//for updating request count
const manageCount = async function (countName) {
  const countList = await Count.findOne();
  if (_.isEmpty(countList)) {
    const count = new Count({
      createCount: 0,
      updateCount: 0,
    });
    await count.save();
    return { createCount: 0, updateCount: 0 };
  } else {
    if (countName === "create") {
      countList.createCount = countList.createCount + 1;
      await countList.save();
    } else if (countName === "update") {
      countList.updateCount = countList.updateCount + 1;
      await countList.save();
    }
    delete countList._id;
    return countList;
  }
};
