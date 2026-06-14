USE ms_dryfruit;
--1.categories table
CREATE TABLE IF NOT EXISTS categories (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--2.users table
CREATE TABLE IF NOT EXISTS users(
    id  INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    role ENUM('user','admin') DEFAULT'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--3.product table
CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name    VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) on delete set NULL
);
--4.cart table
CREATE TABLE IF NOT EXISTS cart(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) on delete CASCADE,
    Foreign Key (product_id) REFERENCES products(id) on delete CASCADE
);
--5.order table
CREATE Table if not exists orders(
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int not null,
    total_amount DECIMAL(10,2) not null,
    status ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT'pending',
    address TEXT not null,
    created_at TIMESTAMP default current_timestamp,
    foreign key(user_id)REFERENCES users(id)on delete CASCADE
);
--6.order_item table
CREATE Table if not exists order_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id int not null,
    product_id int not null,
    quantity int not null,
    price decimal(10,2) not null,
    Foreign Key (order_id) REFERENCES orders(id)on delete CASCADE,
    Foreign Key (product_id) REFERENCES products(id)on delete CASCADE 
);