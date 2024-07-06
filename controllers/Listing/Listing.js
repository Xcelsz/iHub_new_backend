const initializeDatabase = require('../../config/db');

const upListing = async (req, res) => {
    const { deal_type_id, description,media_url,payment_mode } = req.query;
    console.log();

    const sql = "INSERT INTO PropertyDeals (deal_type_id,description, media_url,report, payment_mode, create_at) VALUES (?,?, ?, ?, ?, ?)'";
    const connection = await initializeDatabase();
    try {
      const [rows, fields] = await connection.execute(sql,[
        deal_type_id, 
        description,
        media_url,
        payment_mode
      ])
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
    upListing
};
  
