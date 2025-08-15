document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data (replace with API call) ---
    const examQuestions = [
        {
            question: "What is the capital of Bangladesh?",
            options: ["Chittagong", "Dhaka", "Sylhet", "Mymensingh"],
            correct: "Dhaka"
        },
        {
            question: "Which gas is most abundant in the Earth's atmosphere?",
            options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
            correct: "Nitrogen"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: "Jupiter"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: "William Shakespeare"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Go", "Gd"],
            correct: "Au"
        }
    ];

    // --- State Variables ---
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timeLeft = 300; // 5 minutes in seconds

    // --- Element References ---
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const optionsWrapperEl = document.getElementById('exam-form');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const timerEl = document.getElementById('timer');

    // --- Functions ---
    function loadQuestion() {
        // Clear previous options
        optionsWrapperEl.innerHTML = ''; 

        const currentQuestion = examQuestions[currentQuestionIndex];
        
        // Update question text and number
        questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${examQuestions.length}`;
        questionTextEl.textContent = currentQuestion.question;

        // Create and append option radio buttons
        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = option;
            
            const span = document.createElement('span');
            span.className = 'option-text';
            span.textContent = option;
            
            label.appendChild(radio);
            label.appendChild(span);
            optionsWrapperEl.appendChild(label);
        });

        // Update button visibility
        if (currentQuestionIndex === examQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function startTimer() {
        const timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEl.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitExam();
            }
        }, 1000);
    }

    function submitExam() {
        // In a real app, you would send userAnswers to the backend
        alert("Exam submitted! (This is a simulation)");
        // Redirect to profile page to see results
        window.location.href = 'profile.html';
    }

    // --- Event Listeners ---
    nextBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            alert('Please select an answer before proceeding.');
            return;
        }
        
        userAnswers[currentQuestionIndex] = selectedOption.value;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < examQuestions.length) {
            loadQuestion();
        }
    });

    submitBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            alert('Please select an answer before submitting.');
            return;
        }
        userAnswers[currentQuestionIndex] = selectedOption.value;
        submitExam();
    });

    // --- Initial Load ---
    loadQuestion();
    startTimer();
});

