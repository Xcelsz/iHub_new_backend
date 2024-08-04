const initializeDatabase = require('../../config/db');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djnfym2fq',
  api_key: '265956861479175',
  api_secret: 'xdv_Ibr8RfH5fevaIt56izVStA4' // Click 'View Credentials' below to copy your API secret
});


// const upListing = async (req, res) => {
//   const { deal_type_id, description, media_url, payment_mode } = req.query;
//   console.log();

//   const sql = "INSERT INTO PropertyDeals (deal_type_id,description, media_url,report, payment_mode, create_at) VALUES (?,?, ?, ?, ?, ?)'";
//   const connection = await initializeDatabase();
//   try {
//     const [rows, fields] = await connection.execute(sql, [
//       deal_type_id,
//       description,
//       media_url,
//       payment_mode
//     ])
//     if (rows.length > 0) {
//       return res.status(200).json(rows);
//     } else {
//       return res.status(403).json("Failed");
//     }
//   } catch (error) {
//     return res.status(403).json("error");
//   }

// };

const upListing = async (req, res) => {
  let val = Math.floor(1000 + Math.random() * 9000);
  console.log(req.body);
  let result
  try {
    result = await cloudinary.uploader.upload(`${req.body.file}`,
      { public_id: `ihub_listing_img${val}` }

    );
  } catch (error) {
    console.log(error);
  }

  const { uuid, deal_type_id, propertyName, propertyType, propertyCategory, propertySize, propertyPrice, propertyUse, room, beds, parkingSpace, furnishedStatus, residentialAddress, googleMapsAddress, summary, keywords, file } = req.body;

  const sql = `INSERT INTO listeddeals (
        uuid,
        deal_type_id,
        propertyName,
        propertyType,
        propertyCategory,
        propertySize,
        propertyPrice,
        propertyUse,
        room,
        beds,
        parkingSpace,
        furnishedStatus,
        residentialAddress,
        googleMapsAddress,
        media_url,
        summary,
        keywords
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const connection = await initializeDatabase();
  try {
    const outcome = await connection.execute(sql, [
      uuid,
      deal_type_id,
      propertyName,
      propertyType,
      propertyCategory,
      propertySize,
      propertyPrice,
      propertyUse,
      room,
      beds,
      parkingSpace,
      furnishedStatus,
      residentialAddress,
      googleMapsAddress,
      result.url,
      summary,
      keywords
    ])
    return res.status(200).json(outcome);
    // if (rows.length > 0) {
    //   console.log(rows);
    // } else {
    //   return res.status(403).json("Failed");
    // }
  } catch (error) {
    console.log(error);
    return res.status(403).json(error);
  }
  // res.status(201).json(newPost);};
}


const getAllListing = async (req, res)=>{
  const sql = "SELECT * FROM listeddeals";
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
} 
const getListByDealType = async ()=>{
  const sql = `SELECT * FROM listeddeals WHERE propertyType = ${req.params.id}`;
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
}


const getPropertySummary = async ()=>{

}

const deleteListing = async (req, res)=>{
  console.log(req.params.id);
  const sql = `DELETE FROM listeddeals WHERE _id = ${req.params.id}`;
  const connection = await initializeDatabase();
  try {
    const outcome = await connection.execute(sql)
    return res.status(200).json(outcome);
    // if (rows.length > 0) {
    // } else {
    //   return res.status(403).json("Failed");
    // }
  } catch (error) {
    return res.status(403).json(error);
  }
}

const editListing = async (req, res)=>{
  const sql = `UPDATE listeddeals
SET ${req.body}
WHERE _id = ${req.params.id};`;
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
}


const archiveListing = async (req, res)=>{
  const sql = `UPDATE listeddeals
  SET status = ${req.body.status}
  WHERE _id = ${req.params.id};`;
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
}


module.exports = {
  upListing,
  getAllListing,
  getListByDealType,
  deleteListing,
  editListing,
  archiveListing
};

