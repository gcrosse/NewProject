document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.dark-mode-toggle');

    // Dark Mode - Load saved state
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (darkModeButton) {
            darkModeButton.textContent = "☀️";
            darkModeButton.setAttribute("aria-label", "Switch to Light Mode");
        }
    }

    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem("theme", isDark ? "dark" : "light");
            darkModeButton.textContent = isDark ? "☀️" : "🌙";
            darkModeButton.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // BMR Calculator with Charts
    class BMRCalculator {
        constructor(weight, height, age, gender, goal) {
            this.weight = weight;
            this.height = height;
            this.age = age;
            this.gender = gender;
            this.goal = goal;
        }

        calculateBMR() {
            let bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age;
            return this.gender === 'male' ? bmr + 5 : bmr - 161;
        }

        calculateMacros() {
            const protein = this.weight * 2.2;
            const carbs = this.weight * 3;
            let fats = this.goal === "looseFat" ? this.weight * 0.8 : this.weight * 1.0;
            return { protein, carbs, fats };
        }

        getResult() {
            const bmr = this.calculateBMR();
            const activityLevels = {
                sedentary: bmr * 1.2,
                light: bmr * 1.375,
                moderate: bmr * 1.55,
                veryActive: bmr * 1.725,
                extremelyActive: bmr * 1.9
            };
            const macros = this.calculateMacros();
            return { bmr, activityLevels, macros };
        }
    }

    const selectors = {
        form: document.getElementById('calculator'),
        result: document.querySelector('.results-container'),
        bmr: document.getElementById('bmr'),
        macrosValue: document.getElementById('macrosValue'),
        sedentary: document.getElementById('sedentary'),
        light: document.getElementById('light'),
        moderate: document.getElementById('moderate'),
        veryActive: document.getElementById('veryActive'),
        extremelyActive: document.getElementById('extremelyActive')
    };

    let macroChartInstance = null;
    let activityChartInstance = null;

    const render = ({ bmr, activityLevels, macros }) => {
        selectors.bmr.textContent = Math.round(bmr).toLocaleString("en");

        for (const key in activityLevels) {
            if (selectors[key]) {
                selectors[key].textContent = Math.round(activityLevels[key]).toLocaleString("en");
            }
        }

        selectors.macrosValue.innerHTML = `
            <h3>Recommended Macros</h3>
            <p>Protein: ${macros.protein.toFixed(2)}g</p>
            <p>Carbs: ${macros.carbs.toFixed(2)}g</p>
            <p>Fats: ${macros.fats.toFixed(2)}g</p>
        `;

        if (macroChartInstance) macroChartInstance.destroy();
        if (activityChartInstance) activityChartInstance.destroy();

        const macroChartCtx = document.getElementById('macroChart')?.getContext('2d');
        if (macroChartCtx) {
            macroChartInstance = new Chart(macroChartCtx, {
                type: 'pie',
                data: {
                    labels: ['Protein (g)', 'Carbs (g)', 'Fats (g)'],
                    datasets: [{
                        data: [macros.protein, macros.carbs, macros.fats],
                        backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        const activityChartCtx = document.getElementById('activityChart')?.getContext('2d');
        if (activityChartCtx) {
            activityChartInstance = new Chart(activityChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Sedentary', 'Light', 'Moderate', 'Very Active', 'Extremely Active'],
                    datasets: [{
                        label: 'Calories/day',
                        data: Object.values(activityLevels).map(cals => Math.round(cals)),
                        backgroundColor: '#4bc0c0'
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const weight = parseFloat(form.weight.value);
        const height = parseFloat(form.height.value);
        const age = parseInt(form.age.value, 10);
        const gender = form.gender.value;
        const goal = form.goal.value;

        if (isNaN(weight) || isNaN(height) || isNaN(age) || gender === "select" || goal === "select") {
            alert("Please enter valid information.");
            return;
        }

        selectors.result.classList.remove("show");

        const calc = new BMRCalculator(weight, height, age, gender, goal);

        setTimeout(() => {
            render(calc.getResult());
            selectors.result.classList.add("show");
        }, 400);
    };

    const onFormReset = () => {
        selectors.form.reset();
        selectors.result.classList.remove("show");
        selectors.bmr.textContent = '0';
        selectors.macrosValue.innerHTML = '';
        ['sedentary', 'light', 'moderate', 'veryActive', 'extremelyActive'].forEach(key => {
            selectors[key].textContent = '0';
        });
        if (macroChartInstance) macroChartInstance.destroy();
        if (activityChartInstance) activityChartInstance.destroy();
    };

    if (selectors.form) {
        selectors.form.addEventListener('submit', onFormSubmit);
        selectors.form.addEventListener('reset', onFormReset);
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

if (contactForm) {
    const nameField = document.getElementById('full-name');
    const emailField = document.getElementById('email');
    const commentField = document.getElementById('comment');

    // Autofill if saved
    if (localStorage.getItem("contactName")) nameField.value = localStorage.getItem("contactName");
    if (localStorage.getItem("contactComment")) commentField.value = localStorage.getItem("contactComment");

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const comment = commentField.value.trim();

        if (!name || !email || !comment) {
            alert("Please fill out all fields.");
            return;
        }

        // Save input to localStorage
        localStorage.setItem("contactName", name);
        localStorage.setItem("contactComment", comment);

        responseMessage.style.display = 'block';
        responseMessage.innerHTML = `<p>Message sent successfully! ✅</p>`;
        contactForm.reset();

        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    });
}

// Meal Plan Renderer
const mealPlan = [
    { meal: "Breakfast", items: "Oatmeal with fruits, nuts, and a cup of green tea." },
    { meal: "Mid-Morning Snack", items: "Greek yogurt with a handful of mixed berries." },
    { meal: "Lunch", items: "Grilled chicken breast, quinoa, and a large mixed salad with olive oil dressing." },
    { meal: "Afternoon Snack", items: "A small apple and a handful of almonds." },
    { meal: "Dinner", items: "Baked salmon with roasted vegetables (e.g., broccoli, sweet potatoes) and brown rice." },
    { meal: "Evening Snack", items: "A piece of dark chocolate and herbal tea." }
];

const container = document.getElementById("meal-plan-container");
if (container) {
    const mealList = document.createElement("ul");
    mealList.classList.add("dynamic-meal-list");
    mealPlan.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${entry.meal}:</strong> ${entry.items}`;
        mealList.appendChild(li);
    });
    container.appendChild(mealList);
}

// Fitness Challenge
class Challenge {
    constructor(name, description, target, duration, startDate) {
        this.name = name;
        this.description = description;
        this.target = target;
        this.duration = duration;
        this.startDate = startDate;
        this.participants = [];
    }

    registerParticipant(name) {
        if (!this.participants.find(p => p.name === name)) {
            this.participants.push({ name, progress: 0 });
        }
    }

    updateProgress(name, progress) {
        const p = this.participants.find(p => p.name === name);
        if (p) p.progress = progress;
    }

    getLeaderboard() {
        return this.participants.sort((a, b) => b.progress - a.progress);
    }
}

class UI {
    constructor(challenge) {
        this.challenge = challenge;
    }

    registerParticipant(name) {
        this.challenge.registerParticipant(name);
    }

    updateProgress(name, progress) {
        this.challenge.updateProgress(name, progress);
        document.getElementById("progress-bar").style.width = `${progress}%`;
        this.displayLeaderboard();
    }

    displayLeaderboard() {
        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";
        this.challenge.getLeaderboard().forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.name} - ${p.progress}%`;
            leaderboard.appendChild(li);
        });
    }
}

const challenge = new Challenge("30-Day Push-Up Challenge", "Do 50 push-ups every day for 30 days.", "50 push-ups", "30 days", new Date().toISOString());
const ui = new UI(challenge);

// Load saved participant
const savedParticipant = localStorage.getItem("fitnessParticipant");
if (savedParticipant) {
    ui.registerParticipant(savedParticipant);
    ui.displayLeaderboard();
}

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    if (name) {
        localStorage.setItem("fitnessParticipant", name); // Save name
        ui.registerParticipant(name);
        ui.displayLeaderboard();
    }
});

setInterval(() => {
    const name = challenge.participants[0]?.name;
    if (name) {
        const progress = Math.floor(Math.random() * 101);
        ui.updateProgress(name, progress);
    }
}, 5000);

// Weather Checker
document.getElementById("weather-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value.trim();
    const loading = document.getElementById("loading-message");
    const error = document.getElementById("error-message");
    const empty = document.getElementById("empty-message");
    const weatherData = document.getElementById("weather-data");

    loading.style.display = "block";
    error.style.display = "none";
    empty.style.display = "none";
    weatherData.style.display = "none";

    const apiKey = "0c301a4b5fd5e0033c7fbbdfc36b1e5e";

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();

        if (data.cod !== 200) throw new Error("City not found");

        document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;

        loading.style.display = "none";
        weatherData.style.display = "block";
    } catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
        error.textContent = err.message;
    }
});

// Stock Price Tracker
document.getElementById("finance-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const symbol = document.getElementById("symbol").value.trim().toUpperCase();
    const loading = document.getElementById("finance-loading");
    const error = document.getElementById("finance-error");
    const empty = document.getElementById("finance-empty");
    const dataBox = document.getElementById("finance-data");

    loading.style.display = "block";
    error.style.display = "none";
    empty.style.display = "none";
    dataBox.style.display = "none";

    const apiKey = "your-alpha-vantage-api-key"; // Replace with real key

    try {
        const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`);
        const data = await res.json();

        if (data["Error Message"] || !data["Time Series (1min)"]) {
            throw new Error("Stock symbol not found");
        }

        const latestTime = Object.keys(data["Time Series (1min)"])[0];
        const price = data["Time Series (1min)"][latestTime]["1. open"];

        document.getElementById("finance-symbol").textContent = `Stock: ${symbol}`;
        document.getElementById("finance-price").textContent = `Price: $${parseFloat(price).toFixed(2)}`;

        loading.style.display = "none";
        dataBox.style.display = "block";
    } catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
        error.textContent = err.message;
    }
});
