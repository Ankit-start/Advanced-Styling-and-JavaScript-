const questions = [
  {
    q: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: "Paris"
  },
  {
    q: "Which language runs in a web browser?",
    options: ["Python", "Java", "JavaScript"],
    answer: "JavaScript"
  },
  {
    q: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(btn, opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(button, selected) {
  const correct = questions[current].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("incorrect");
    }
  });

  if (selected === correct) score++;

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("result").textContent = `✅ You scored ${score} out of ${questions.length}`;
    }
  }, 1000);
}

loadQuestion();

// Joke Fetching Logic
async function getJoke() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await res.json();
    document.getElementById("joke").textContent = data.joke || "No joke found.";
  } catch (error) {
    document.getElementById("joke").textContent = "❌ Failed to fetch joke.";
    console.error(error);
  }
}