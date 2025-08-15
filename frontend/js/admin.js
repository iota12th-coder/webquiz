document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page with the add question form
    const addQuestionForm = document.getElementById('add-question-form');

    if (addQuestionForm) {
        addQuestionForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Create an object with the form data
            const newQuestion = {
                question: document.getElementById('question').value,
                optionA: document.getElementById('option-a').value,
                optionB: document.getElementById('option-b').value,
                optionC: document.getElementById('option-c').value,
                optionD: document.getElementById('option-d').value,
                correctAnswer: document.getElementById('correct-answer').value
            };

            // In a real application, you would send this object to your backend API
            console.log('New Question Data:', newQuestion);

            // Show a success message and reset the form
            alert('Question added successfully! (Simulation)');
            addQuestionForm.reset();
        });
    }

    // You can add logic for the admin login and dashboard pages here as well
});

