// Array containing planet names and their weight multipliers
var planets = [ 
    ['Pluto', 0.06], 
    ['Neptune', 1.148], 
    ['Uranus', 0.917], 
    ['Saturn', 1.139], 
    ['Jupiter', 2.640], 
    ['Mars', 0.3895], 
    ['Moon', 0.1655], 
    ['Earth', 1], 
    ['Venus', 0.9032], 
    ['Mercury', 0.377], 
    ['Sun', 27.9] 
];

// 1. Populate the dropdown element with the data found in the planets array.
function createDropdown(){
    let dropdown = document.getElementById('planets');

    // Check if the include-pluto checkbox is checked
    let includePluto = document.getElementById('include-pluto').checked;
    let options = [];

    // Add an option for each planet based on if pLuto is included or not
    // and reverse the  order
    planets.filter(planet => includePluto || planet[0] !== 'Pluto').reverse().forEach(function(planet){
        options.push(`<option value="${planet[0]}">${planet[0]}</option>`);
    });
    
    // Add Custom Planet option to dropdown
    options.push('<option value="add-planet">Add Custom Planet</option>');
    // Update the dropdown with the new options
    dropdown.innerHTML = options.join('');
    dropdown.value=''; //Reset selected value
}

// Initialize dropdown when page loads
createDropdown();
// Update dropdown when pluto checkbox is changed
document.getElementById('include-pluto').addEventListener('change', createDropdown);

// Function to calculate weight on selected planet
function calculateWeight(weight, planetName) { 
    // Find planet in array by name
    let planet = planets.find(p => p[0] === planetName);

    // If the planet is found, calculate and return weight
    if(planet){
        let multiplier = planet[1];
        return weight * multiplier;
    } else {
        return null;
    }
} 

// Function to handle click on calculate button
function handleClickEvent(e) {
    // Get user's weight from input field
    let userWeight = document.getElementById('user-weight').value;
    // Get planet's name from dropdown 
    let planetName = document.getElementById('planets').value;

    // When weight or planet name are empty, create alert
    if (!userWeight || !planetName) {
        alert('Please enter a weight and/or select a valid planet.');
        return;
    }

    // if planet name is Add Custom planet and calculate button is pressed give alert
    if (planetName === 'add-planet') {
        alert('Please insert custom planet details first.');
        return;
    }

    let result = calculateWeight(userWeight, planetName);
    // Create the message to display in the output section
    let message = `If you were on <span>${planetName}</span>, you would weigh <span>${result}lbs</span>!`
    document.getElementById('output').innerHTML = message;
} 

// Function to add a custom planet to dropdown
function addCustomPlanet() {
    // Get custom name and mulitplier from input fields
    let name = document.getElementById('custom-planet-name').value;
    let multiplier = document.getElementById('custom-planet-multiplier').value;

    // Ensure inputs have a value and add the custom planet to the array
    if (name && !isNaN(multiplier) && multiplier > 0) {
        planets.push([name, multiplier]);
        createDropdown(); // Refresh the dropdown
        document.getElementById('custom-planet-name').value = ''; // Clear the input fields
        document.getElementById('custom-planet-multiplier').value = '';
        document.getElementById('planets').value = name; // Set the new planet as selected
        document.getElementById('custom-planet-section').style.display = 'none'; // Hide the custom planet form
    } else {
        alert("Please enter a valid planet name and multiplier.");
    }
}

// Show/hide custom planet form based on dropdown selection
document.getElementById('planets').addEventListener('change', function() {
    let selectedValue = this.value;
    // Display custom form when 'Add Custom Planet' is selected
    if (selectedValue === 'add-planet') {
        document.getElementById('custom-planet-section').style.display = 'block';
    } else {
        document.getElementById('custom-planet-section').style.display = 'none';
    }
});

// Set onCick event handlers for buttons
document.getElementById('calculate-button').onclick = handleClickEvent;
document.getElementById('add-planet-button').onclick = addCustomPlanet;
