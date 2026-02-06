const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

/**
 * POST /api/attendance
 * Mark attendance
 */
router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const record = await Attendance.create({
      employeeId,
      date,
      status,
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/attendance/:employeeId
 * Get attendance for an employee
 */
router.get("/:employeeId", async (req, res) => {
  try {
    const records = await Attendance.findAll({
      where: { employeeId: req.params.employeeId },
      order: [["date", "DESC"]],
    });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
