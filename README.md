# Contact Me — Portfolio & Contact Application

A Node.js/Express web application serving as a personal portfolio and contact form for Mason Sabin.

## Features
- **Resume Page** — Home page displaying a full professional resume
- **Portfolio Page** — Showcases projects from Systems Programming and Web Dev Fundamentals and personal work with live iframe previews
- **Contact Form** — Collects visitor info with both client-side and server-side validation, stores submissions in MySQL
- **Admin Page** — View all contact submissions with DataTables sorting/searching

## Tech Stack
- Node.js, Express 5, EJS templating
- MySQL2 for database
- Client-side and server-side form validation
- Responsive CSS (mobile, tablet, desktop)

## Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with your database credentials:
   ```
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_PORT=your_port
   ```
4. Run `node app.js` or `npx nodemon app.js`

## Deployed URL
[64.23.157.215:3007/](http://64.23.157.215:3007/)

## Repository
[github.com/sabinMas/contact-me](https://github.com/sabinMas/contact-me)
