document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode functionality
    const darkModeButton = document.querySelector('.dark-mode-toggle');

    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                darkModeButton.textContent = "☀️"; // Switch to Light Mode icon
                darkModeButton.setAttribute("aria-label", "Switch to Light Mode");
            } else {
                darkModeButton.textContent = "🌙"; // Switch to Dark Mode icon
                darkModeButton.setAttribute("aria-label", "Switch to Dark Mode");
            }
        });
    } else {
        console.log('Dark mode button not found!');
    }

    // Adding smooth scrolling feature for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // BMR Calculator Class
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
            if (this.gender === 'male') {
                bmr += 5;
            } else if (this.gender === 'female') {
                bmr -= 161;
            }
            return bmr;
        }

        calculateMacros() {
            const protein = this.weight * 2.2; // Protein: 2.2g per kg of body weight
            const carbs = this.weight * 3;     // Carbs: 3g per kg of body weight
            let fats;

            switch (this.goal) {
                case "looseFat":
                    fats = this.weight * 0.8; // Fats: 0.8g per kg for fat loss
                    break;
                case "gainMuscle":
                    fats = this.weight * 1.0; // Fats: 1g per kg for muscle gain
                    break;
                default:
                    fats = this.weight * 1.0; // Default fats value
                    console.warn("Invalid or missing goal; using default fats value.");
            }

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

    // Selectors for HTML elements
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

    // Function to render the results to the page
    const render = ({ bmr, activityLevels, macros }) => {
        selectors.bmr.textContent = Math.round(bmr).toLocaleString("en");

        for (const key in activityLevels) {
            const calories = Math.round(activityLevels[key]);
            if (selectors[key]) {
                selectors[key].textContent = calories.toLocaleString("en");
            }
        }

        selectors.macrosValue.innerHTML = `
            <h3>Recommended Macros</h3>
            <p>Protein: ${macros.protein.toFixed(2)}g</p>
            <p>Carbs: ${macros.carbs.toFixed(2)}g</p>
            <p>Fats: ${macros.fats.toFixed(2)}g</p>
        `;
    };

    // Function to handle form submission
    const onFormSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const weight = parseFloat(form.weight.value);
        const height = parseFloat(form.height.value);
        const age = parseInt(form.age.value, 10);
        const gender = form.gender.value;
        const goal = form.goal.value;

        // Validation
        if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0 || isNaN(age) || age <= 0) {
            alert('Please enter valid numeric values for Weight, Height, and Age.');
            return;
        }

        if (gender === "select" || goal === "select") {
            alert('Please select a valid gender and fitness goal.');
            return;
        }

        selectors.result.classList.remove("show");

        const calc = new BMRCalculator(weight, height, age, gender, goal);

        // Use setTimeout if you want to simulate a delay for visual effect
        setTimeout(() => {
            render(calc.getResult());
            selectors.result.classList.add("show");
        }, 400);
    };

    // Function to handle form reset
    const onFormReset = () => {
        selectors.form.reset();
        selectors.result.classList.remove("show");
        selectors.sedentary.textContent = '0';
        selectors.light.textContent = '0';
        selectors.moderate.textContent = '0';
        selectors.veryActive.textContent = '0';
        selectors.extremelyActive.textContent = '0';
        selectors.macrosValue.innerHTML = '';
        selectors.bmr.textContent = '0';
    };

    // Event listeners for form submit and reset
    selectors.form.addEventListener('submit', onFormSubmit);
    selectors.form.addEventListener('reset', onFormReset);
});

// This is for my about me page
// Handle contact form submission
const contactForm = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Optionally, do some basic validation
        const name = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const comment = document.getElementById('comment').value.trim();

        if (!name || !email || !comment) {
            alert("Please fill out all fields.");
            return;
        }

        // Simulate message sent
        responseMessage.style.display = 'block';
        responseMessage.innerHTML = `<p>Message sent successfully! ✅</p>`;

        // Clear form fields
        contactForm.reset();

        // Hide message after a few seconds (optional)
        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    });
}
