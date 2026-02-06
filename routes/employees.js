const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// Add employee
router.post("/", async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

// Delete employee
router.delete("/:id", async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } });
  res.json({ message: "Employee deleted" });
});

module.exports = router;
