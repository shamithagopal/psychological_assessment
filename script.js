/*
   PAGE NAVIGATION
 */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    if (pageId === "assessmentPage") {
        loadQuestion();
    }

    if (pageId === "booksPage") {
        loadBooks();
    }

    if (pageId === "patientPage") {
        displayPatients();
    }

    if (pageId === "appointmentPage") {
        displayAppointments();
    }

    if (pageId === "gamePage") {
        startGame();
    }

    window.scrollTo(0, 0);
}


/* 
   ASSESSMENT
 */

const questions = [
    "How often have you felt stressed recently?",
    "How often have you found it difficult to relax?",
    "How often have you had difficulty concentrating?",
    "How often have you felt worried or nervous?",
    "How often have you felt low in energy?",
    "How often have you had difficulty maintaining a healthy sleep routine?"
];

const answers = [
    "Never",
    "Sometimes",
    "Often",
    "Very Often"
];

let questionIndex = 0;
let selectedAnswers = [];


function loadQuestion() {

    const box =
        document.getElementById("questionBox");

    if (!box) return;

    const question =
        questions[questionIndex];

    let html = `
        <div class="question">

            <h2>
                ${questionIndex + 1}.
                ${question}
            </h2>
    `;

    answers.forEach(function(answer, index) {

        html += `
            <button
                class="option"
                onclick="selectAnswer(${index})">

                ${answer}

            </button>
        `;

    });

    html += `</div>`;

    box.innerHTML = html;
}


function selectAnswer(index) {

    selectedAnswers[questionIndex] = index;

    const options =
        document.querySelectorAll(".option");

    options.forEach(function(option, i) {

        option.classList.toggle(
            "selected",
            i === index
        );

    });
}


function nextQuestion() {

    if (selectedAnswers[questionIndex] === undefined) {

        alert("Please select an answer.");

        return;
    }

    if (questionIndex < questions.length - 1) {

        questionIndex++;

        loadQuestion();

    } else {

        showResult();

    }
}


function showResult() {

    let score = 0;

    selectedAnswers.forEach(function(answer) {
        score += answer;
    });

    let text;

    if (score <= 5) {

        text =
            "Your responses indicate relatively low reported difficulty.";

    } else if (score <= 11) {

        text =
            "Your responses indicate some areas that may benefit from healthy wellness habits.";

    } else {

        text =
            "Your responses indicate higher reported difficulty. Consider speaking with a trusted adult or qualified professional if this is affecting daily life.";

    }

    document.getElementById("result").innerHTML = `

        <div class="saved">

            <h2>Assessment Complete 🎉</h2>

            <p>
                Score: <b>${score}/18</b>
            </p>

            <p>
                ${text}
            </p>

            <p>
                This is a general wellness self-check,
                not a medical diagnosis.
            </p>

            <button
                class="main-btn"
                onclick="restartAssessment()">

                Take Again

            </button>

        </div>

    `;
}


function restartAssessment() {

    questionIndex = 0;

    selectedAnswers = [];

    document.getElementById("result").innerHTML = "";

    loadQuestion();
}


/* 
   THERAPY
 */

const therapy = {

    stress: [
        ["🌬️", "Deep Breathing", "Slow and comfortable breathing can help you pause and relax."],
        ["🧘", "Yoga", "Gentle movement combined with mindful breathing."],
        ["🎨", "Art Activity", "Drawing and colouring can be relaxing creative activities."]
    ],

    exam: [
        ["📖", "Study Break", "Take short breaks during study sessions."],
        ["🌿", "Mindful Breathing", "Use a few slow breaths before returning to study."],
        ["📝", "Study Planning", "Break large tasks into smaller achievable steps."]
    ],

    anxiety: [
        ["🧘", "Mindfulness", "Bring your attention gently back to the present moment."],
        ["📔", "Journaling", "Write down thoughts and feelings."],
        ["🌳", "Nature Walk", "Spend some calm time outdoors."]
    ],

    sleep: [
        ["🌙", "Relaxation", "Create a calm wind-down routine."],
        ["📚", "Quiet Reading", "Try calm reading before bedtime."],
        ["🌌", "Breathing", "Try slow, comfortable breathing."]
    ],

    anger: [
        ["⏸️", "Pause", "Take a short pause before responding."],
        ["✍️", "Journaling", "Write about what happened and what you need."],
        ["🏃", "Physical Activity", "A safe physical activity can provide a healthy break."]
    ],

    focus: [
        ["🎯", "Focus Session", "Work on one small task at a time."],
        ["☕", "Short Break", "Take short breaks to refresh your attention."],
        ["🧠", "Mindfulness", "Gently return your attention when distracted."]
    ]

};


function showTherapy() {

    const value =
        document.getElementById("therapySelect").value;

    const box =
        document.getElementById("therapyBox");

    if (value === "") {

        box.innerHTML = "";

        return;
    }

    box.innerHTML =
        therapy[value].map(function(item) {

            return `

                <div class="card">

                    <div class="emoji">
                        ${item[0]}
                    </div>

                    <h3>
                        ${item[1]}
                    </h3>

                    <p>
                        ${item[2]}
                    </p>

                    <button
                        onclick="alert('Activity selected: ${item[1]}')">

                        Try Activity

                    </button>

                </div>

            `;

        }).join("");
}


/* 
   BOOKS
*/

const books = [
    ["📘", "Introduction to Psychology", "Learn the basic concepts of psychology."],
    ["📗", "Social Psychology", "Understand how people interact with others."],
    ["📕", "Positive Psychology", "Explore positive emotions and well-being."],
    ["📙", "Emotional Intelligence", "Learn about emotions and communication."],
    ["📘", "Human Behaviour", "Explore human behaviour and thinking."],
    ["📗", "Mindfulness", "Learn about present-moment awareness."],
    ["📕", "Human Mind", "Explore memory and thinking."],
    ["📙", "Everyday Psychology", "Understand psychology in daily life."],
    ["📘", "Decision Making", "Explore how people make decisions."],
    ["📗", "Relationships", "Learn about communication and relationships."]
];


function loadBooks() {

    const box =
        document.getElementById("booksBox");

    if (!box) return;

    box.innerHTML =
        books.map(function(book, index) {

            return `

                <div class="card">

                    <div class="emoji">
                        ${book[0]}
                    </div>

                    <h3>
                        ${book[1]}
                    </h3>

                    <p>
                        ${book[2]}
                    </p>

                    <button
                        onclick="openBook(${index})">

                        Read More

                    </button>

                </div>

            `;

        }).join("");
}


/* 
   BOOK READ MORE
*/

function openBook(index) {

    const book = books[index];

    showPage("bookDetailsPage");

    loadBookFromAPI(book);

}


/* 
   GOOGLE BOOKS API
 */

async function loadBookFromAPI(book) {

    const box =
        document.getElementById("bookDetailsBox");


    box.innerHTML = `

        <div class="book-loading">

            <div class="emoji">
                📚
            </div>

            <h2>
                Loading...
            </h2>

            <p>
                Finding information about
                ${book[1]}
            </p>

        </div>

    `;


    try {

        const apiURL =
            "https://www.googleapis.com/books/v1/volumes?q=" +
            encodeURIComponent(book[1]) +
            "&maxResults=1";


        const response =
            await fetch(apiURL);


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const data =
            await response.json();


        if (
            !data.items ||
            data.items.length === 0
        ) {

            throw new Error(
                "Book not found"
            );

        }


        const information =
            data.items[0].volumeInfo;


        const title =
            information.title || book[1];


        const author =
            information.authors
                ? information.authors.join(", ")
                : "Author information unavailable";


        const category =
            information.categories
                ? information.categories.join(", ")
                : "Psychology";


        const description =
            information.description ||
            book[2];


        box.innerHTML = `

            <div class="book-details-card">

                <div class="book-big-icon">

                    ${book[0]}

                </div>


                <div class="book-content">

                    <h2>
                        ${title}
                    </h2>


                    <p>

                        👤 <b>Author:</b>
                        ${author}

                    </p>


                    <p>

                        📚 <b>Category:</b>
                        ${category}

                    </p>


                    <h3>
                        🧠 About This Book
                    </h3>


                    <p class="book-paragraph">

                        ${description}

                    </p>


                    <div class="api-info">

                        ✨ Information loaded
                        using Google Books API.

                    </div>


                    <button
                        class="main-btn"
                        onclick="showPage('booksPage')">

                        ← Back to Books

                    </button>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.log(error);


        /* API fail aana original book
           description display aagum */

        box.innerHTML = `

            <div class="book-details-card">

                <div class="book-big-icon">

                    ${book[0]}

                </div>


                <div class="book-content">

                    <h2>
                        ${book[1]}
                    </h2>


                    <h3>
                        🧠 About This Book
                    </h3>


                    <p class="book-paragraph">

                        ${book[2]}

                        This book provides useful
                        insights into psychology,
                        human behaviour, emotions,
                        thoughts and everyday
                        experiences related to
                        the human mind.

                    </p>


                    <div class="api-info">

                        ℹ️ Detailed API information
                        is currently unavailable.

                    </div>


                    <button
                        class="main-btn"
                        onclick="showPage('booksPage')">

                        ← Back to Books

                    </button>

                </div>

            </div>

        `;

    }

}


/* 
   PATIENT
 */

function savePatient() {

    const name =
        document.getElementById("patientName").value.trim();

    const problem =
        document.getElementById("patientProblem").value.trim();

    const sessions =
        document.getElementById("sessions").value;


    if (
        name === "" ||
        problem === "" ||
        sessions === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    const patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    patients.push({
        name: name,
        problem: problem,
        sessions: sessions
    });


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    document.getElementById("patientName").value = "";

    document.getElementById("patientProblem").value = "";

    document.getElementById("sessions").value = "";


    displayPatients();

    alert("Patient saved successfully.");
}


function displayPatients() {

    const box =
        document.getElementById("patientBox");

    if (!box) return;


    const patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    box.innerHTML =
        patients.map(function(patient, index) {

            return `

                <div class="saved">

                    <h3>
                        👤 ${patient.name}
                    </h3>

                    <p>
                        Problem:
                        ${patient.problem}
                    </p>

                    <p>
                        Sessions:
                        ${patient.sessions}
                    </p>

                    <button
                        class="delete"
                        onclick="deletePatient(${index})">

                        Delete

                    </button>

                </div>

            `;

        }).join("");
}


function deletePatient(index) {

    const patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    patients.splice(index, 1);


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    displayPatients();
}


/* 
   APPOINTMENT
 */

function saveAppointment() {

    const patient =
        document.getElementById(
            "appointmentPatient"
        ).value.trim();

    const doctor =
        document.getElementById(
            "doctor"
        ).value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;


    if (
        patient === "" ||
        doctor === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please fill all details.");

        return;
    }


    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    appointments.push({
        patient: patient,
        doctor: doctor,
        date: date,
        time: time
    });


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    displayAppointments();

    alert("Appointment booked successfully.");
}


function displayAppointments() {

    const box =
        document.getElementById("appointmentBox");

    if (!box) return;


    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    box.innerHTML =
        appointments.map(function(item, index) {

            return `

                <div class="saved">

                    <h3>📅 Appointment</h3>

                    <p>
                        Patient: ${item.patient}
                    </p>

                    <p>
                        Doctor: ${item.doctor}
                    </p>

                    <p>
                        Date: ${item.date}
                    </p>

                    <p>
                        Time: ${item.time}
                    </p>

                    <button
                        class="delete"
                        onclick="deleteAppointment(${index})">

                        Cancel

                    </button>

                </div>

            `;

        }).join("");
}


function deleteAppointment(index) {

    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    appointments.splice(index, 1);


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    displayAppointments();
}


/* 
   MEMORY GAME
 */

const gameSymbols = [
    "🧠",
    "❤️",
    "⭐",
    "🌈",
    "🌸",
    "🦋",
    "🎯",
    "🌙"
];


let first = null;
let second = null;
let lock = false;
let moveCount = 0;


function startGame() {

    const box =
        document.getElementById("gameBox");

    if (!box) return;


    first = null;

    second = null;

    lock = false;

    moveCount = 0;


    document.getElementById(
        "moves"
    ).textContent = "0";


    const cards =
        [...gameSymbols, ...gameSymbols];


    cards.sort(
        () => Math.random() - 0.5
    );


    box.innerHTML = "";


    cards.forEach(function(symbol) {

        const card =
            document.createElement("div");


        card.className =
            "game-card";


        card.textContent =
            "❓";


        card.dataset.symbol =
            symbol;


        card.onclick =
            function() {

                flip(card);

            };


        box.appendChild(card);

    });
}


function flip(card) {

    if (lock) return;

    if (card.classList.contains("open")) {
        return;
    }


    card.classList.add("open");

    card.textContent =
        card.dataset.symbol;


    if (!first) {

        first = card;

        return;
    }


    second = card;

    moveCount++;


    document.getElementById(
        "moves"
    ).textContent = moveCount;


    if (
        first.dataset.symbol ===
        second.dataset.symbol
    ) {

        first.style.background =
            "#684cff";

        second.style.background =
            "#684cff";

        first = null;

        second = null;

    } else {

        lock = true;


        setTimeout(function() {

            first.classList.remove("open");

            second.classList.remove("open");

            first.textContent = "❓";

            second.textContent = "❓";

            first = null;

            second = null;

            lock = false;

        }, 700);

    }
}


/* INITIAL LOAD*/

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadQuestion();

        loadBooks();

        displayPatients();

        displayAppointments();

        startGame();

    }
);