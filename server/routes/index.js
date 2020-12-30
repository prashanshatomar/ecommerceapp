var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var product = require("../schema/productSchema");
var order = require("../schema/orderSchema");

/* GET products */
router.get("/", function (req, res, next) {
  console.log("=======================get product --");
  try {
    product.find((err, result) => {
      console.log("Error get product=v==========", err, result);

      if (err) {
        console.log("Error get product=v==========", err);
        res.status(400).send({
          status: 0,
          payload: null,
          err: "Error while getting product",
        });
      }
      if (result) {
        res.status(200).send({ status: 1, payload: result });
      }
    });
  } catch (e) {
    res.status(400).send({
      status: 0,
      payload: null,
      err: "Error while getting product",
    });
  }
});
// get single product
router.post("/product/:id", function (req, res, next) {
  console.log("Get product data", req.params.id);
  product
    .findById({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      }
    })
    .catch((e) => {
      res.status(400).send({
        status: 0,
        payload: null,
        err: "Error while getting product",
      });
    });
});

/* add products */

router.post("/", (req, res, next) => {
  console.log("Adding propduct ", req.body);
  var newProduct = new product({
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
  });
  newProduct.save((err, result) => {
    if (err) {
      console.log("Error while adding product===========", err);
      res.status(400).json("Error while adding product ");
    }
    if (result) {
      res.status(200).json("Product added succesfully");
    }
  });
});

/* delete products */

router.delete("/:id", (req, res, next) => {
  console.log("get param id ", req.params.id);
  product.remove({ _id: req.params.id }, (err, result) => {
    console.log("err --- ", err);
    if (err) {
      console.log(err);
      res.status(400).send({ err: "Error delete" });
    } else {
      res.status(200).send(result);
    }
  });
});

/* update products */

router.patch("/:id", (req, res) => {
  console.log("inside update api --- ", req.body);

  try {
    let d = {};
    if (req.body.name) {
      d["name"] = req.body.name;
    }
    if (req.body.discount) {
      d["discount"] = req.body.discount;
    }
    if (req.body.price) {
      d["price"] = req.body.price;
    }

    product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: d },
      { upsert: true },
      (err, result) => {
        console.log("err in udpate == > ", err);
        if (err) {
          console.log(err);
          res.status(400).send({ err: "Error delete" });
        } else {
          res.status(200).send(result);
        }
      }
    );
  } catch (e) {
    console.log("server -- > ", e);
    res.status(400).send("Server error");
  }
});

/* GET sort products */
router.post("/sort", function (req, res) {
  console.log("=======================get product --", req.body);
  let sortFil = { [req.body.keyName]: req.body.keyValue };
  console.log("sort filter -- > ", sortFil);
  product
    .find()
    .sort(sortFil)
    .then((result) => {
      if (result) {
        res.status(200).send({ status: 1, payload: result });
      }
    })
    .catch((err) => {
      if (err) {
        console.log("Error get product=v==========", err);
        res.status(400).send({
          status: 0,
          payload: null,
          err: "Error while getting product",
        });
      }
    });
  // product.find((err, result) => {
  //   console.log("Error get product=v==========", err, result);

  //   if (err) {
  //     console.log("Error get product=v==========", err);
  //     res.status(400).send({
  //       status: 0,
  //       payload: null,
  //       err: "Error while getting product",
  //     });
  //   }
  //   if (result) {
  //     res.status(200).send({ status: 1, payload: result });
  //   }
  // });
});

router.post("/order", (req, res, next) => {
  console.log("Adding propduct ", req.body);
  var newOrder = new order({
    product: req.body.product,
  });
  newOrder.save((err, result) => {
    if (err) {
      res.status(400).json("Error while adding order ");
    }
    if (result) {
      res.status(200).json("Orcer created succesfully");
    }
  });
});

module.exports = router;
