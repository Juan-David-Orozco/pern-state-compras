const { Router } = require("express");
const pool = require('../db')
const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuario");
    const users = result.rows
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM usuario WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
    const user = result.rows[0]
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;