-- SELECT properties.id as id, title, cost_per_night, start_date, avg(rating) as average_rating
-- FROM properties
-- JOIN reservations ON reservations.property_id = properties.id
-- JOIN property_reviews ON property_reviews.property_id = properties.id
-- WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
-- GROUP BY reservations.id, properties.id
-- ORDER BY start_date
-- LIMIT 10;


SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON property_id = properties.id
   JOIN reservations ON reservations.property_id = properties.id
   WHERE city LIKE '%vancouver%' AND (cost_per_night/100) < 10000 AND (cost_per_night/100) > 1
  GROUP by properties.id
HAVING avg(rating) > 2
  ORDER BY cost_per_night
   LIMIT 10;