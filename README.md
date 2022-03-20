# Welcome to PETsonalities!

#### Live Link: [PETsonalities](https://petsonalities.herokuapp.com/)

PETsonalities, inspired by [Product Hunt](https://www.producthunt.com/), is an online application that allows users to create pet pages as well as view and comment other users' created pet pages.

## Table of contents

- [Key Features](#Key-Features)
- [Technologies](#technologies)
- [Overview of application architecture](#overview-of-application-architecture)

## Key Features
* Utilizes API routes to render elements, such as, updating and removing a user's comment asynchronously. 

## Technologies
Frontend
* JavaScript
* PUGjs
* CSS

Backend
* Sequelize(PostgresQL)
* Express
* cookie-parser/csurf
* bcrypt.js

Deployed on
* Heroku


#### Overview of application architecture
![image](https://user-images.githubusercontent.com/40069890/159184193-5a1e7ace-d330-4f85-b5c5-b2f7994695b5.png)

## Front End Overview
Our front end was built out using PUGjs as our structure for HTML and CSS was utilized for styling. Our front end also has some DOM manipulation elements that allow the page to be responsive to user input. these features are comment edit, and delete, like creation and deletion, and in the profile page for viewing the users pets owned, pets liked, and pets commented on. 

## Back End Overview
Our backend was built using express, and is a collection of routes that serves information to the client and intercats with our databse. 

Sequelize is the ORM we utlized to interact with our database, we generated models with associations to one another that allows the sharing of data and the ownership of pets, like, comments. We seeded data to fill out the site for demonstration purposes using sequelize. 

## PETsonalities Contributors
* [@andrew](https://github.com/bandrewi)
* [@huyen](https://github.com/huyennguuyen)
* [@rami](https://github.com/rammartinez00)
* [@vee](https://github.com/vee-alianza)
