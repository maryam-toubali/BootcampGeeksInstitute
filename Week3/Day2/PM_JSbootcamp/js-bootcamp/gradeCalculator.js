// Important to know: JavaScript comments
// Single line comment

/* 
   Multi-line comment
   This file contains the grade calculator functionality
*/

// Javascript variables and Keywords
const PASSING_GRADE = 60; // constant declaration
let reportOutput = ""; // variable declaration

// String literal for report template
const REPORT_TEMPLATE = `
Student Name: %NAME%
-----------------
Math: %MATH%
Science: %SCIENCE%
English: %ENGLISH%
-----------------
Average: %AVERAGE%
Grade: %GRADE%
Status: %STATUS%
`;

// Function to calculate grades
function calculateGrades() {
    // Get input values using DOM
    const studentName = document.getElementById('studentName').value;
    const mathScore = Number(document.getElementById('mathScore').value);
    const scienceScore = Number(document.getElementById('scienceScore').value);
    const englishScore = Number(document.getElementById('englishScore').value);

    // Input validation using Boolean
    if (!validateInput(studentName, mathScore, scienceScore, englishScore)) {
        return;
    }

    // Number Methods and calculations
    const average = calculateAverage(mathScore, scienceScore, englishScore);
    const grade = determineGrade(average);
    const status = determineStatus(average);

    // Generate and display report
    displayReport(studentName, mathScore, scienceScore, englishScore, average, grade, status);
}

// Function to validate input
function validateInput(name, math, science, english) {
    // String Properties
    if (name.trim().length === 0) {
        alert("Please enter student name");
        return false;
    }

    // Number validation using isNaN
    if (isNaN(math) || isNaN(science) || isNaN(english)) {
        alert("Please enter valid numbers for scores");
        return false;
    }

    // Boolean logic for score range validation
    const validRange = (score) => score >= 0 && score <= 100;
    if (!validRange(math) || !validRange(science) || !validRange(english)) {
        alert("Scores must be between 0 and 100");
        return false;
    }

    return true;
}

// Function to calculate average
function calculateAverage(math, science, english) {
    // Number Methods
    return Math.round((math + science + english) / 3);
}

// Function to determine grade
function determineGrade(average) {
    // Using multiple if conditions
    switch(true){
        case (average >= 90):
            return 'A';
        case (average >= 80):
            return 'B';
        case (average >= 70):
            return 'C';
        case (average >= 60):
            return 'D';
        default:
            return 'F';
    }
}

// Function to determine status
function determineStatus(average) {
    // Boolean operation
    return average >= PASSING_GRADE ? "PASSED" : "FAILED";
}

// Function to display report
function displayReport(name, math, science, english, average, grade, status) {
    // String Methods
    let report = REPORT_TEMPLATE
        .replace('%NAME%', name.toUpperCase())
        .replace('%MATH%', math)
        .replace('%SCIENCE%', science)
        .replace('%ENGLISH%', english)
        .replace('%AVERAGE%', average)
        .replace('%GRADE%', grade)
        .replace('%STATUS%', status);

    // DOM manipulation
    document.getElementById('reportOutput').textContent = report;

    // Console.log for debugging
    console.log("Report generated for:", name);
    console.log("Average score:", average);
}

// Undefined example: variable declaration without initialization
let studentCount;
console.log("Uninitialized variable example:", studentCount); // will show undefined

// Null example
let previousReport = null;
console.log("Null example:", previousReport); 