INSERT INTO users (name, email, password) VALUES ('John Ragone', 'soccerrox50@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('David Gingrich','fishdavidg@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Ethan Hait', 'ethan@cost-benefit-analysis.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'Galiano', 'description', 'https://demolink.com', 'http://demolink2.com', 100, 2, 1, 2, 'Canada', '420 Gordon Drive', 'Burnaby', 'BC', 'V3L0E6', TRUE  );
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (2, 'Grandmas House', 'description', 'https://demolink.com', 'http://demolink2.com', 100, 2, 1, 2, 'Canada', '69 8th ave', 'Burnaby', 'BC', 'V3L0E6', TRUE  );
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (3, 'My Suite', 'description', 'https://demolink.com', 'http://demolink2.com', 100, 2, 1, 2, 'Canada', '42069 Monarch Ave', 'Burnaby', 'BC', 'V3L0E6', TRUE  );

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) VALUES (1, 1, 4, '2022-02-09', '2022-02-11');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) VALUES (2, 2, 5, '2022-02-09', '2022-02-11');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) VALUES (3, 3, 7,  '2022-02-09', '2022-02-11');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 1, 1, 5, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 2, 2, 4, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 3, 3, 3, 'messages');