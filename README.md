I did several commmits. Felt i probably missed something so added them  here....

The Hybrid Athlete's Blog — README

Overview

Welcome to The Hybrid Athlete's Blog — a personal platform to share insights on fitness, nutrition, and performance. It includes interactive tools, informative content, and a snapshot of my fitness journey.
________________________________________

Features
•	Home Page: Introduction to the blog and featured sections.
•	Fitness Video Section: Curated videos showcasing workout routines and exercises.
•	Diet Plan: A structured plan aligned with fitness goals.
•	BMR Calculator: Calculates Basal Metabolic Rate and daily calorie needs.
•	About Me: A personal profile with biography, photo, and accomplishments.
•	Contact Form: Submit messages directly via a built-in form with confirmation feedback.
•	Weather & Stock Tracker: Check the weather or monitor stock prices (optional tools).
•	Fitness Challenge: Join a 30-day push-up challenge with progress tracking.
________________________________________ 

Tech Stack
•	HTML: Content structure and page layout.
•	CSS: Responsive design with support for dark and light themes.
•	JavaScript: Handles interactivity, animations, and data visualization.
•	Chart.js: Renders dynamic charts for BMR/macros.
•	Responsive Design: Optimized for desktop, tablet, and mobile devices.
•	Dark Mode: Toggleable UI theme for better readability and user comfort.
________________________________________

Pages Breakdown

.html
•	Homepage introducing the blog and linking to all key sections.
about.html
•	Two-column layout with:
o	A profile photo.
o	Personal biography.
o	List of achievements.
•	Fully responsive for all devices.
bmr.html
•	Interactive BMR calculator form.
•	Inputs: Age, weight, height, gender, and activity level.
•	Outputs: BMR, calorie needs, macronutrient breakdown.
•	Includes:
o	Summary box
o	Chart display (optional)
o	Dark mode support
________________________________________ 

JavaScript Modules
Dark Mode Toggle.
•	darkModeButton: Toggles light/dark theme
•	isDark: Boolean flag for theme state
 BMR Calculator
Class: BMRCalculator
•	Inputs: weight, height, age, gender, goal
•	Methods: calculateBMR(), calculateMacros(), getResult()
DOM Elements:
•	form, result, bmr, macrosValue, activity levels
Charts:
•	macroChartInstance (Chart.js)
•	 activityChartInstance
 Contact Form
•	Fields: name, email, comment
•	Form submission with confirmation message
Meal Plan Renderer
•	Renders a meal list from an array of meals
•	Dynamically generates <ul> content
Fitness Challenge
Class: Challenge
•	Metadata: name, description, target, duration, startDate
•	Tracks participants and progress


Class: UI
•	Methods: registerParticipant, updateProgress, displayLeaderboard


DOM:
•	progress-bar
•	leaderboard

Weather Checker
•	Inputs: city
•	API: OpenWeatherMap
•	Displays weather data with loading/error states

Stock Tracker
•	Inputs: stock symbol
•	API: Alpha Vantage
•	Outputs: stock price and latest time
________________________________________
CSS & Styles

Global Styles

•	Font: Jost from Google Fonts
•	Color variables and base resets
•	Responsive layout with flexbox and media queries
•	Full dark mode support via .dark-mode class
Component-Specific Styles
•	Header & Navigation
•	Diet / Meal Plan
•	BMR Result & Summary Box
•	About Section
•	Video Grid Section
•	Contact Form
•	Index Image Grid
•	Weather & Stock Tracker
•	Fitness Challenge Progress

