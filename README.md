# MIS Portal Project

## Overview
MIS Portal is a backend system built using Node.js, Express.js, and MySQL. 
It handles Users, Products, Sales Targets, Achievements, Regions, and MIS Dashboard analytics.

## Tech Stack
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Swagger API Docs

## Project Setup

### 1. Install dependencies
cd backend
npm install

### 2. Setup database
Create database:
CREATE DATABASE mis_portal;

Import schema:
mysql -u root -p mis_portal < database/schema.sql

### 3. Environment variables (.env)
PORT=4000  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_password  
DB_NAME=mis_portal  
JWT_SECRET=secretkey  

### 4. Run server
node server.js

## API Access

Backend:
http://localhost:4000

Swagger UI:
http://localhost:4000/api-docs


## Features

- Login / JWT Auth
- User Management
- Product Management
- Sales Tracking
- Targets & Achievements
- Region Management
- Dashboard Analytics
- Reports (Variance & Achievement)cd 

## Note
Swagger documentation is available at /api-docs