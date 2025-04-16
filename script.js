
const form = document.getElementById('gpaCalculator');
const coursesContainer = document.getElementById('coursesContainer');
const addCourseBtn = document.getElementById('addCourse');
const resultsDiv = document.getElementById('gpaResult');

const gradeScale = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
};

window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 3; i++) {
        addNewCourseInput();
    }
});

function addNewCourseInput() {
    const row = document.createElement('div');
    row.className = 'course-row';
    
    row.innerHTML = `
        <input type="text" placeholder="Course name (e.g. COMP 101)" required>
        <select required>
            <option value="">Select grade</option>
            <option value="A">A (4.0)</option>
            <option value="B">B (3.0)</option>
            <option value="C">C (2.0)</option>
            <option value="D">D (1.0)</option>
            <option value="F">F (0.0)</option>
        </select>
    `;
    
    coursesContainer.appendChild(row);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateGPA();
});

addCourseBtn.addEventListener('click', addNewCourseInput);

function calculateGPA() {
    const courseRows = document.querySelectorAll('.course-row');
    let totalPoints = 0;
    let validCourses = 0;
    let hasErrors = false;
    
  
    courseRows.forEach(row => {
        const inputs = row.querySelectorAll('input, select');
        
        inputs.forEach(input => {
           
            input.classList.remove('error');
            
            
            if (!input.value) {
                input.classList.add('error');
                hasErrors = true;
            }
        });
        
      
        if (inputs[0].value && inputs[1].value) {
            totalPoints += gradeScale[inputs[1].value];
            validCourses++;
        }
    });
    
   
    if (hasErrors) {
        resultsDiv.innerHTML = '<p class="error">Please fill in all course names and select grades</p>';
        return;
    }
    
   
    if (validCourses === 0) {
        resultsDiv.innerHTML = '<p class="error">Please add at least one course</p>';
        return;
    }
    
   
    const gpa = totalPoints / validCourses;
    showResults(gpa, validCourses);
}


function showResults(gpa, courseCount) {
    const roundedGPA = gpa.toFixed(2);
    
   
    let message = `Your GPA is: <span class="gpa-value">${roundedGPA}</span>`;
    message += `<br><small>Based on ${courseCount} course${courseCount !== 1 ? 's' : ''}</small>`;
    
    
    if (gpa >= 3.5) {
        message += ' 🎉 Excellent!';
    } else if (gpa >= 2.5) {
        message += ' 👍 Good job!';
    }
    
    resultsDiv.innerHTML = message;
}
