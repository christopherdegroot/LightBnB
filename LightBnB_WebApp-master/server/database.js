const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
return pool.query(` SELECT * 
FROM users
WHERE users.email = $1`,[email])
.then((result) => {
  const users = result.rows
  if (users.length === 0) {return null}
  else {return result.rows[0]}
})
.catch((err) => {
  console.log('error happened!:', err.message);
});
}


exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `,[id])
  .then((response) =>{
    if (response.rows[0].length === 0) {return null}
    else {return response.rows[0]}
  });

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [`${user.name}`, `${user.email}`, `${user.password}`];
  return pool
  .query(`INSERT INTO users (name, email, password)
   VALUES ($1, $2, $3)
   RETURNING *`, values)
  .then((result) => {return result.rows[0]})
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const variables = [`${guest_id}`,`${limit}`]
  return pool.query (`
  SELECT reservations.*, properties.*, avg(rating) as average_rating
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;`
  , variables)
  .then((result) => {return result.rows})
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {

   const values = []
   let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON property_id = properties.id
   JOIN reservations ON reservations.property_id = properties.id
   `;

if (options.owner_id) {

  values.push(`${options.owner_id}`);
  queryString += `WHERE owner_id = $${values.length} `;

  values.push(limit);
  queryString += `
  GROUP by properties.id
  ORDER BY cost_per_night
  LIMIT $${values.length}`;

  return pool
  .query(queryString, values)
  .then((result) =>  result.rows)
  .catch((err) => {
    console.log(err.message);
  });

} else {

if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${values.length} `;
  }

if (options.minimum_price_per_night) {
  values.push(`${options.minimum_price_per_night}`);
  queryString += `AND (cost_per_night/100) > $${values.length} `
}

if (options.maximum_price_per_night) {
  values.push(`${options.maximum_price_per_night}`);
  queryString += `AND (cost_per_night/100) < $${values.length}
  `
}

queryString += `GROUP by properties.id
`


if (options.minimum_rating) {
  values.push(`${options.minimum_rating}`);
  queryString += `HAVING avg(rating) > $${values.length}
  `
}

   values.push(limit);
   queryString += `ORDER BY cost_per_night
   LIMIT $${values.length}`;

   return pool
    .query(queryString, values)
    .then((result) =>  result.rows)
    .catch((err) => {
      console.log(err.message);
    });
  }
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [  
    `${property.title}`,
    `${property.description}`,
    `${property.number_of_bedrooms}`,
    `${property.number_of_bathrooms}`,
    `${property.parking_spaces}`,
    `${property.cost_per_night}`,
    `${property.thumbnail_photo_url}`,
    `${property.cover_photo_url}`,
    `${property.street}`,
    `${property.country}`,
    `${property.city}`,
    `${property.province}`,
    `${property.post_code}`,
    `${property.owner_id}`
  ];
  console.log(values)

  const queryString = `INSERT INTO properties (
    title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id) 
    VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `
    return pool
    .query(queryString, values)
    .then((result) =>  result.rows)
    .catch((err) => {
      console.log(err.message);
    });

}

exports.addProperty = addProperty;
