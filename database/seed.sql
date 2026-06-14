USE ms_dryfruit;
--1.categories
INSERT INTO categories (name,description)VALUES
('Nuts',    'premium quality nuts including almonds,cashews and walnuts'),
('Dried fruits','Natural dried fruits including raisins,dates and cranberries'),
('Seeds','Healthy seeds including pumpkin,flax and sunflower seeds');
--2.products
INSERT INTO products(category_id,name,description,price,stock,image_url)VALUES
(1,'premium almonds','fresh california almonds rich in vitamin E',     699.00, 50, 'almonds.jpg'),
(1, 'Cashews',          'Creamy whole cashews lightly salted',            850.00, 30, 'cashews.jpg'),
(1, 'Walnuts',          'Rich omega-3 walnuts great for brain health',    950.00, 25, 'walnuts.jpg'),
(2, 'Raisins',          'Sun-dried golden raisins naturally sweet',       299.00, 80, 'raisins.jpg'),
(2, 'Dates',            'Soft Medjool dates rich in natural sugar',       399.00, 60, 'dates.jpg'),
(2, 'Cranberries',      'Dried cranberries tangy and sweet',              549.00, 35, 'cranberries.jpg'),
(3, 'Pumpkin Seeds',    'Raw pumpkin seeds high in zinc and magnesium',   449.00, 40, 'pumpkin.jpg'),
(3, 'Flax Seeds',       'Cold pressed flax seeds rich in omega-3',       349.00, 55, 'flax.jpg');

--3.admin user
INSERT INTO users(name,email,password,phone,address,role) VALUES
('Admin',        'admin@msdryfruit.com',  'hashed_password_here', '9999999999', 'Chennai, Tamil Nadu',  'admin'),
('Shoaib',       'shoaib@gmail.com',      'hashed_password_here', '9876543210', 'Arni, Tamil Nadu',     'user'),
('Test User',    'test@gmail.com',        'hashed_password_here', '9876543211', 'Chennai, Tamil Nadu',  'user');