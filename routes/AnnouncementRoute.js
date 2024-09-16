const express = require("express")
const { createAnnouncement, updateAnnouncement } = require("../controllers/AnnouncementController")
const router = express.Router()

router.post("/admin/createAnnouncement",createAnnouncement)
router.put("/admin/updateAnnouncement",updateAnnouncement)

module.exports = router

