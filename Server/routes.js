const express = require("express");
const router = express.Router();

const ctrlUser = require("./controllers/ctrlUser");
const cntrlSequence = require("./controllers/cntrlSequence");
const cntrlClick = require("./controllers/cntrlClick");

router.post("/addUser", ctrlUser.addUser);
router.post("/addSequence", cntrlSequence.addSequence);
router.get("/getSequence", cntrlSequence.getSequence);
router.get("/getUnusualSequence", cntrlClick.getUnusualSequence);
router.get("/getUnusualSequenceById/:id", cntrlClick.getUnusualSequenceById);
router.post("/onClickTile", cntrlClick.onClickDiv);

module.exports = router;
