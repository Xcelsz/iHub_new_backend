const initializeDatabase = require('../../config/db');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const { log } = require('console');
// const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator');

const generateUserId = () => {
  return crypto.randomUUID();
};

const onboard = async (req, res) => {
  const { email, password,role_id } = req.query;
  if (!email) {
      return res.status(400).send('Email parameter is required.');
  }
  if (!password) {
      return res.status(400).send({ error: 'Password parameter is required.'});
  }
  if (!role_id) {
      return res.status(400).send({ error: 'Role_id parameter is required.'});
  }
    try {
        const connection = await initializeDatabase();
        const [rows, fields] = await connection.execute('SELECT * FROM staff WHERE email = ?', [email]);
        if (rows.length > 0) {
          return res.status(500).send({ error: "Please use unique Email" });
        }
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
        const userId = generateUserId();
        const [result] = await connection.execute('INSERT INTO staff (staff_id,email, password,status, role_id, permission_id) VALUES (?,?, ?, ?, ?, ?)', 
          [
            userId,
            email,
            encryptedPassword,
            'active',
            role_id,
            '2'
          ]);

        return res.status(201).send({ status:'success', msg: "User Register Successfully", result });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};


const login = async (req, res) => {
  const { email, password } = req.query;
  if (!email) {
    return res.status(400).send('Email parameter is required.');
  }
  if (!password) {
      return res.status(400).send({ error: 'Password parameter is required.'});
  }

  try {
    const connection = await initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM staff WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).send({ error: "Email not Found" });

    const user = rows[0];
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json({ error:"Wrong Password"});
    }

    // const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SEC, { expiresIn: "3d" });

    // return res.status(200).send({ msg: "Login Successful...!", email: user.email, accessToken });
    return res.status(200).send({ msg: "Login Successful...!", user: user });
  } catch (error) {
    return res.status(500).send({ error });
  }
};


const updateStaff = async (req, res) => {
  if (req.query.password) {
    req.query.password = CryptoJS.AES.encrypt(req.query.password, process.env.PASS_SEC).toString();
  }

  try {
    const connection = await initializeDatabase();
    const updates = req.query;
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = [...Object.values(updates), req.params.id];
    const [result] = await connection.execute(
      `UPDATE staff SET ${fields} WHERE staff_id = ?`,
      values
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const terminateStaff = async (req, res) => {
  console.log(req.params.id);
  try {
    const connection = await initializeDatabase();
    const [result] = await connection.execute('DELETE FROM staff WHERE staff_id = ?', [req.params.id]);
    res.status(200).json({ status:'success', msg: "Staff has been terminate..." });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStaff = async (req, res) => {
  try {
    const connection = await initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM staff WHERE staff_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = rows[0];
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};


const allStaff = async (req, res) => {
  try {
    const connection = await initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM staff');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.query;
  console.log(email);
  try {
    const connection = await initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM staff WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).send("Email Not found!!!!");

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    await connection.execute('UPDATE staff SET password = ? WHERE email = ?', [encryptedPassword, email]);
    return res.status(201).send({ status:'success', msg: "Password Updated...!" });
  } catch (error) {
    return res.status(500).send({ error: "Not found!!!" });
  }
};




module.exports = {
    login,
    onboard,
    updateStaff,
    terminateStaff,
    getStaff,
    allStaff,
    resetPassword
  };
  