1. To use this template, start by using it as a template on github.com. It will give you a new repo which you can clone and hook up.

2. Next create your database. To do so, run the following queries (use a different name other than boilerplate):

Create database boilerplate;

use boilerplate;

create table users(
id INT auto_increment,
email VARCHAR(60) NOT NULL UNIQUE,
password VARCHAR(60) NOT NULL,
role VARCHAR(60) NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id));

create table successful_logins(
id INT auto_increment,
user_id INT,
created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users (id)
);

GRANT ALL PRIVILEGES ON boilerplate.\* TO 'JasonLayton'@'localhost';

3. Next create a .env file, and fill in the following information:

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

JWT_SECRET=

MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAILGUN_FROM_EMAIL=

The mailgun stuff is only important if you are setting up emails.

4. That's it. You should be all set to create your application.

We left the Procfile for if you want to host it on Heroku, but it isn't necessary.

The passcode to create usernames is currently hardcoded, you can see it in CreateAccount.tsx
