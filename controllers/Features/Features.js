const initializeDatabase = require('../../config/db');

// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator');

const getAllRoles = async (req, res) => {
    const sql = "SELECT * FROM Roles";
    const connection = await initializeDatabase();
    try {
      const [rows, fields] = await connection.execute(sql)
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        return res.status(403).json("Failed");
      }
    } catch (error) {
      return res.status(403).json("error");
    }
};
const getAllTeams = async (req, res) => {
    const sql = "SELECT * FROM Teams";
    const connection = await initializeDatabase();
    try {
      const [rows, fields] = await connection.execute(sql)
      if (rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        return res.status(403).json("Failed");
      }
    } catch (error) {
      return res.status(403).json("error");
    }
  
};




module.exports = {
    getAllRoles,
    getAllTeams
  };
  
