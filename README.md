#README - The Hybrid Athlete's Blog#

#Overview#

Welcome to The Hybrid Athlete's Blog! This website is designed to share personal fitness insights, workouts, nutrition plans, and tools to help athletes achieve their 
optimal physical condition. The blog includes features like a fitness video section, a diet plan, a BMR (Basal Metabolic Rate) calculator, and an about me section that details my journey as a hybrid athlete.

Features
>  Home Page: An introduction to the Hybrid Athlete Blog and its content.
>  Fitness Video: A section showcasing videos related to fitness routines and exercises.
>  Diet Plan: A comprehensive diet plan to complement your fitness goals.
>  BMR Calculator: A tool that helps you calculate your BMR and daily calorie requirements.
>  About Me: A personal page detailing my fitness journey, accomplishments, and how I maintain my physical health.
>  Contact Form: A simple form for users to contact and interact with me, with a message submission confirmation.

Tech Stack
>  HTML: Used for structuring the content and pages.
>  CSS: For styling the website with responsive and adaptive layouts.
>  JavaScript: Adds interactive elements like dark mode toggle, form submission handling, and BMR calculator functionality.
>  Responsive Design: The website is optimized for various screen sizes and devices (desktop, tablet, mobile).
>  Dark Mode Toggle: A user-friendly option for switching between light and dark themes.

# UPDATED 2025/04/19

## Overview
This project is a website for tracking fitness, diet, and other personal goals. It includes features such as a BMR calculator, fitness challenges, weather updates, and stock tracking.

## Features
- **BMR Calculator:** Calculates basal metabolic rate based on user's input.
- **Fitness Challenge:** Join a 30-day push-up challenge and track progress.
- **Weather Checker:** Get the current weather for your location.
- **Stock Tracker:** Track live stock prices.

## Upcoming Features
- Dark Mode
- Additional fitness challenges
- Meal tracking system





 Dark Mode Toggle

    darkModeButton: Button that toggles dark mode

    isDark: Boolean state of the theme (true if dark)

BMR Calculator
Classes:

    BMRCalculator:

        weight, height, age, gender, goal: User inputs

        calculateBMR(): Returns BMR value

        calculateMacros(): Returns recommended macros

        getResult(): Returns full result (BMR, activity levels, macros)

Elements:

    selectors: Object holding DOM references:

        form, result, bmr, macrosValue, sedentary, light, moderate, veryActive, extremelyActive

Chart Instances:

    macroChartInstance: Stores Chart.js instance for macros

    activityChartInstance: Stores Chart.js instance for activity levels

📬 Contact Form

    contactForm: Form element for contact

    responseMessage: Element to show submission response

    nameField, emailField, commentField: Input fields

    name, email, comment: Values from fields

🍽️ Meal Plan Renderer

    mealPlan: Array of meals with descriptions

    container: DOM element for rendering the meal list

    mealList: <ul> list element generated dynamically

Fitness Challenge
Classes:

    Challenge:

        name, description, target, duration, startDate: Challenge metadata

        participants: Array of participants with progress

    UI:

        Uses challenge instance to manage UI

        Methods: registerParticipant, updateProgress, displayLeaderboard

Instances:

    challenge: New Challenge object

    ui: UI manager tied to the challenge

DOM:

    progress-bar: Element updated with user progress

    leaderboard: <ul> for listing participants

Weather Checker

    city: Input value from weather form

    loading, error, empty, weatherData: Various display elements

    apiKey: OpenWeatherMap API key

Stock Price Tracker

    symbol: Input symbol from user

    loading, error, empty, dataBox: DOM feedback elements

    apiKey: Alpha Vantage API key

    price, latestTime: Extracted stock data
