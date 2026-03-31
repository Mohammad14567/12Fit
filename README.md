# 12Fit - AI Powered Sports & Fitness Platform

## Overview
12Fit is a full-stack web application that helps users create personalized workout and diet plans in a simple and user-friendly way.

## Tech Stack
- Frontend: React + Bootstrap
- Backend: Node.js + Express
- Database: MySQL
- Authentication: JWT
- HTTP Client: Axios

## Main Features
- User registration and login
- Personalized workout plans
- Personalized diet plans
- Dashboard for tracking progress
- Sports products page
- Clean team-based architecture

## Team Members
- Mohammad Jamous: Homepage, Login, Register, Auth
- Mohammad Dawood: Dashboard
- Bahaa Al-Shami: Workout Page
- Mohammad Hakim: Diet Page
- Diaa Al-Khaldi: Products Page

## Project Structure
- client/: frontend app
- server/: backend app

## API Endpoints
### Auth
- POST /auth/register
- POST /auth/login

### Workout
- GET /workouts
- POST /workouts

### Diet
- GET /diet
- POST /diet

### Products
- GET /products
- POST /products

## Database
Main tables:
- users
- workouts
- diets
- products

## Run Project

### Backend
```bash
cd server
npm install
npm run dev
