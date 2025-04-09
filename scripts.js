<<<<<<< HEAD
// BMR and Macros calculation class
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
    const protein = this.weight * 2.2; 
    const carbs = this.weight * 3;    
    let fats;
    
    switch (this.goal) {
        case "looseFat":
            fats = this.weight * 0.8;
            break;
        case "gainMuscle":
            fats = this.weight * 1.0;
            break;
        default:
            fats = this.weight * 1.0; 
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

const onFormSubmit = (e) => {
    e.preventDefault();    
    const form = e.target;
    
    const weight = parseFloat(form.weight.value);
    const height = parseFloat(form.height.value);
    const age = parseInt(form.age.value, 10);
    const gender = form.gender.value;
    const goal = form.goal.value;
    
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Please enter valid numeric values for Weight, Height, and Age.');
        return;
}
    
    selectors.result.classList.remove("show");
    const calc = new BMRCalculator(weight, height, age, gender, goal);
    
    setTimeout(() => {
        render(calc.getResult());
        selectors.result.classList.add("show");
    }, 400);
};
    
const onFormReset = (e) => {
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
    
selectors.form.addEventListener('submit', onFormSubmit);
selectors.form.addEventListener('reset', onFormReset);
   
//This is for diet.html dark mode
document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.dark-mode-toggle');

    // Ensure the button exists
    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            console.log("Button Clicked")
            document.body.classList.toggle('dark-mode');
            
            // Update the button text based on the dark mode status
            if (document.body.classList.contains('dark-mode')) {
                darkModeButton.textContent = "☀️"; // Light mode icon when dark mode is active
            } else {
                darkModeButton.textContent = "🌙"; // Dark mode icon when light mode is active
            }
        });
    } else {
        console.log('Dark mode button not found!');
    }
});

//Adding smooth scrolling feature to diet.html
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

=======
// BMR and Macros calculation class
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
    const protein = this.weight * 2.2; 
    const carbs = this.weight * 3;    
    let fats;
    
    switch (this.goal) {
        case "looseFat":
            fats = this.weight * 0.8;
            break;
        case "gainMuscle":
            fats = this.weight * 1.0;
            break;
        default:
            fats = this.weight * 1.0; 
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

const onFormSubmit = (e) => {
    e.preventDefault();    
    const form = e.target;
    
    const weight = parseFloat(form.weight.value);
    const height = parseFloat(form.height.value);
    const age = parseInt(form.age.value, 10);
    const gender = form.gender.value;
    const goal = form.goal.value;
    
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Please enter valid numeric values for Weight, Height, and Age.');
        return;
}
    
    selectors.result.classList.remove("show");
    const calc = new BMRCalculator(weight, height, age, gender, goal);
    
    setTimeout(() => {
        render(calc.getResult());
        selectors.result.classList.add("show");
    }, 400);
};
    
const onFormReset = (e) => {
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
    
selectors.form.addEventListener('submit', onFormSubmit);
selectors.form.addEventListener('reset', onFormReset);
   
//This is for diet.html dark mode
document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.dark-mode-toggle');

    // Ensure the button exists
    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            console.log("Button Clicked")
            document.body.classList.toggle('dark-mode');
            
            // Update the button text based on the dark mode status
            if (document.body.classList.contains('dark-mode')) {
                darkModeButton.textContent = "☀️"; // Light mode icon when dark mode is active
            } else {
                darkModeButton.textContent = "🌙"; // Dark mode icon when light mode is active
            }
        });
    } else {
        console.log('Dark mode button not found!');
    }
});

//Adding smooth scrolling feature to diet.html
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

>>>>>>> e91fe58b2dbd1d2aac0b582e70b30ed2936fdcdb
