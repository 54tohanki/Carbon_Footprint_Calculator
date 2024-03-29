// Define variables to store user responses and total score
var responses = {};
var totalScore = 0;

// Function to start the quiz
function startQuiz() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    document.getElementById('page1').style.display = 'block';
}

// Function to navigate to the next page
function nextPage(pageNum) {
    var currentPage = document.getElementById('page' + pageNum);
    var nextPage = document.getElementById('page' + (pageNum + 1));
    currentPage.style.display = 'none';
    nextPage.style.display = 'block';
}

// Function to navigate to the previous page
function previousPage(pageNum) {
    var currentPage = document.getElementById('page' + pageNum);
    var previousPage = document.getElementById('page' + (pageNum - 1));
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';
}

// Function to get user responses and calculate score
function getScore() {
    // Get radio button values
    var radioButtons = document.getElementsByName('transportationModes');
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            responses['transportationModes'] = parseFloat(radioButtons[i].value);
            break;
        }
    }

    // Get distance traveled value
    var distanceInput = document.getElementsByName('distanceTraveled')[0];
    responses['distanceTraveled'] = parseFloat(distanceInput.value);

    // Get freight volume value
    var freightVolumeRadios = document.getElementsByName('freightVolume');
    for (var i = 0; i < freightVolumeRadios.length; i++) {
        if (freightVolumeRadios[i].checked) {
            responses['freightVolume'] = parseFloat(freightVolumeRadios[i].value);
            break;
        }
    }

    // Get packaging materials value
    var packagingMaterialsRadios = document.getElementsByName('packagingMaterials');
    for (var i = 0; i < packagingMaterialsRadios.length; i++) {
        if (packagingMaterialsRadios[i].checked) {
            responses['packagingMaterials'] = parseFloat(packagingMaterialsRadios[i].value);
            break;
        }
    }

    // Get usage of packaging materials value
    var usagePackagingInput = document.getElementsByName('usagePackagingMaterials')[0];
    responses['usagePackagingMaterials'] = parseFloat(usagePackagingInput.value);

    // Get warehouse operations value
    var warehouseOperationsRadios = document.getElementsByName('warehouseOperations');
    for (var i = 0; i < warehouseOperationsRadios.length; i++) {
        if (warehouseOperationsRadios[i].checked) {
            responses['warehouseOperations'] = parseFloat(warehouseOperationsRadios[i].value);
            break;
        }
    }

    // Get KWH per year value
    var kwhPerYearInput = document.getElementsByName('kwhPerYear')[0];
    responses['kwhPerYear'] = parseFloat(kwhPerYearInput.value);

    // Get supply chain complexity value
    var supplyChainRadios = document.getElementsByName('supplyChainComplexity');
    for (var i = 0; i < supplyChainRadios.length; i++) {
        if (supplyChainRadios[i].checked) {
            responses['supplyChainComplexity'] = parseFloat(supplyChainRadios[i].value);
            break;
        }
    }

    // Get route optimization value
    var routeOptimizationRadios = document.getElementsByName('routeOptimization');
    for (var i = 0; i < routeOptimizationRadios.length; i++) {
        if (routeOptimizationRadios[i].checked) {
            responses['routeOptimization'] = parseFloat(routeOptimizationRadios[i].value);
            break;
        }
    }

    // Get alternative fuels value
    var alternativeFuelsRadios = document.getElementsByName('alternativeFuels');
    for (var i = 0; i < alternativeFuelsRadios.length; i++) {
        if (alternativeFuelsRadios[i].checked) {
            responses['alternativeFuels'] = parseFloat(alternativeFuelsRadios[i].value);
            break;
        }
    }
}

// Function to calculate total score
function calculateResult() {
    getScore(); // Call getScore to update responses object
    totalScore = Object.values(responses).reduce((acc, curr) => acc + curr, 0);
    document.getElementById('resultText').innerText = "Your Estimated Carbon Footprint: " + totalScore;
    
    // Update chart data
    myChart.data.datasets[0].data = Object.values(responses);
    
    // Hide the last question page
    document.getElementById('page10').style.display = 'none';
    
    // Show the result page
    document.getElementById('result').style.display = 'block';

    // Update the chart
    myChart.update();
}

// Function to restart the quiz
function restartQuiz() {
    // Hide the result page
    document.getElementById('result').style.display = 'none';
    
    // Show the first question page
    document.getElementById('questions').style.display = 'block';
    document.getElementById('page1').style.display = 'block';

    // Clear user responses and total score
    responses = {};
    totalScore = 0;

    // Reset radio buttons and input fields
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
    var inputFields = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].value = '';
    }
}

// Create pie chart
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Fuel Type', 'Distance Travelled', 'Freight Volume', 'Packaging Materials', 'Usage of Packaging Materials','Warehouse Operations', 'KWH Per Year', 'Supply Chain Complexity', 'Route Optimization', 'Alternative Fuels and Technologies'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initial data, you can replace it with actual data later
                backgroundColor: [
                    'rgba(238, 130, 238, 0.5)', 
                    'rgba(75, 0, 130, 0.5)',    
                    'rgba(173, 216, 230, 0.5)', 
                    'rgba(144, 238, 144, 0.5)', 
                    'rgba(0, 100, 0, 0.5)',     
                    'rgba(255, 255, 0, 0.5)',   
                    'rgba(255, 165, 0, 0.5)',   
                    'rgba(255, 0, 0, 0.5)',     
                'rgba(255, 192, 203, 0.5)', 
                    'rgba(139, 0, 0, 0.5)'      
                ],
                borderColor: [
                    'rgba(238, 130, 238, 1)',
                    'rgba(75, 0, 130, 1)',
                    'rgba(173, 216, 230, 1)',
                    'rgba(144, 238, 144, 1)',
                    'rgba(0, 100, 0, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(139, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Carbon Footprint Breakdown'
                }
            }
        }
    });

    // Assign myChart to global scope
    window.myChart = myChart;
});

       function isQuestionAnswered(pageNum) {
            const questions = [
                document.getElementsByName('transportationModes'),
                document.getElementsByName('distanceTraveled'),
                document.getElementsByName('freightVolume'),
                document.getElementsByName('packagingMaterials'),
                document.getElementsByName('usagePackagingMaterials'),
                document.getElementsByName('warehouseOperations'),
                document.getElementsByName('kwhPerYear'),
                document.getElementsByName('supplyChainComplexity'),
                document.getElementsByName('routeOptimization'),
                document.getElementsByName('alternativeFuels')
            ];

            const currentQuestion = questions[pageNum - 1];

            // Check radio button questions
            if (currentQuestion.length === 0) {
                return true; // No radio buttons for this question, assume it's answered
            }

            for (let i = 0; i < currentQuestion.length; i++) {
                if (currentQuestion[i].type === 'radio' && currentQuestion[i].checked) {
                    return true; // Radio button is checked
                }
            }

            // Check fill-in-the-blank questions
            const textInputs = document.querySelectorAll(`#page${pageNum} input[type="text"], #page${pageNum} input[type="number"]`);
            for (let i = 0; i < textInputs.length; i++) {
                if (textInputs[i].value.trim() !== '') {
                    return true; // Text input has value
                }
            }

            return false; // Question is not answered
        }
        function nextPage(pageNum) {
            if (isQuestionAnswered(pageNum)) {
                document.getElementById('page' + pageNum).style.display = 'none';
                document.getElementById('page' + (pageNum + 1)).style.display = 'block';
            } else {
                alert('Please answer the current question before proceeding.');
            }
        }


// Function to categorize the carbon footprint into Scope 1, 2, and 3
function categorizeResult() {
    // Scope 1: Direct emissions
    var scope1 = responses['transportationModes'];

    // Scope 2: Indirect emissions from purchased energy
    var scope2 = responses['warehouseOperations'] + responses['kwhPerYear'];

    // Scope 3: Other indirect emissions
    var scope3 = responses['distanceTraveled'] + responses['freightVolume'] +
                 responses['packagingMaterials'] + responses['usagePackagingMaterials'] +
                 responses['supplyChainComplexity'] + responses['routeOptimization'] +
                 responses['alternativeFuels'];

    // Display categorized results
    document.getElementById('scope1').innerText = "Scope 1: " + scope1.toFixed(2);
    document.getElementById('scope2').innerText = "Scope 2: " + scope2.toFixed(2);
    document.getElementById('scope3').innerText = "Scope 3: " + scope3.toFixed(2);

    // Hide previous result page and restart button
    document.getElementById('result').style.display = 'none';

    // Show categorized result page
    document.getElementById('categorizedResult').style.display = 'block';
}


// Function to go back to the previous result page
function goBackToResult() {
    // Hide categorized result page
    document.getElementById('categorizedResult').style.display = 'none';

    // Show previous result page and restart button
    document.getElementById('result').style.display = 'block';
}
