/* =========================================================
   TELL ME
   Main game logic
   ========================================================= */

"use strict";

/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [
    "Have you ever been afraid to share your opinion? If so, why?",
    "Do you share your opinion even when everyone else thinks differently?",
    "What are you most proud of in your life?",
    "What is one quality you love about yourself?",
    "If you could change one thing about yourself, what would it be?",
    "When was the last time you felt truly happy?",
    "What motivates you in your everyday life?",
    "What are you most afraid of?",
    "What is something people often misunderstand about you?",
    "What is something you have not dared to try yet?",
    "How do you react to criticism?",
    "What does true friendship mean to you?",
    "Do you find it easy to trust other people?",
    "What do you expect from a relationship?",
    "Have you ever been deeply disappointed by someone?",
    "Do you find it easy to forgive?",
    "Are you more honest, or do you tend to protect the other person's feelings?",
    "Do you enjoy meeting new people?",
    "What makes you feel truly close to someone?",
    "Do you listen to your instincts?",
    "Do you prefer to play it safe or take risks?",
    "What would you do if you could start something over?",
    "Do you make difficult decisions quickly or slowly?",
    "Have you ever regretted a decision you made?",
    "Do you prefer to plan things or be spontaneous?",
    "What would you choose: security or passion?",
    "How do you deal with failure?",
    "What was the hardest decision you have ever made?",
    "Do you find it easy to step outside your comfort zone?",
    "What does success mean to you?",
    "What do you think is the meaning of life?",
    "What is more important to you: money or freedom?",
    "Where do you see yourself five years from now?",
    "What makes you happy in the long run?",
    "Do you prefer living in the present or thinking about the future?",
    "What does freedom mean to you?",
    "Do you believe in fate, or do you believe everything is up to you?",
    "What truly matters in life?",
    "What has life taught you so far?",
    "When was the last time you felt truly alone?",
    "What is something you usually hide from other people?",
    "Have you ever been dishonest with yourself?",
    "What is a secret that very few people know about you?",
    "What has been bothering you lately?",
    "What is something you find difficult to say out loud?",
    "Have you ever regretted something you said?",
    "What makes you feel safe?",
    "Who knows you best?",
    "What does it mean to you to be yourself?",
    "In what situations do you feel the most uncertain?",
    "What do you judge yourself too harshly for?",
    "What kind of feedback means the most to you?",
    "What is something you find difficult to let go of?",
    "What kind of situations make you lose your temper?",
    "When do you feel like you are growing as a person?",
    "What is something you often worry about?",
    "What helps you calm down?",
    "What makes you feel respected by someone?",
    "How do you show someone that they are important to you?",
    "Do you talk about your problems or keep them to yourself?",
    "What quality bothers you the most in other people?",
    "What is something you find difficult to accept in others?",
    "How do you react when someone disagrees with you?",
    "What can quickly make you distance yourself from someone?",
    "What kind of person do you connect with easily?",
    "What does mutual effort mean to you?",
    "Do you prefer giving or receiving?",
    "What helps you break out of your routine?",
    "How do you react to unexpected situations?",
    "Do you rely more on other people's opinions or your own?",
    "How much do other people's opinions influence your decisions?",
    "What holds you back from taking action?",
    "When do you feel like you are heading in the right direction?",
    "How do you handle pressure?",
    "What helps you keep going through difficult situations?",
    "What does peace of mind mean to you?",
    "When do you feel balanced?",
    "What throws you out of that balance?",
    "What does personal growth mean to you?",
    "What do you overvalue in life?",
    "What did you underestimate in the past?",
    "What have you learned from other people's mistakes?",
    "How has your way of thinking changed over the years?",
    "What defines you the most right now?",
    "What does it mean to you to be 'okay'?",
    "When was the last time you were disappointed in yourself?",
    "What is something from your past that is difficult for you to accept?",
    "What is something you would most like to forget?",
    "Have you ever shown the world something different from what you were feeling inside?",
    "What have you regretted but cannot change?",
    "What is something you have not fully processed yet?",
    "What is something you find difficult to forgive yourself for?",
    "What feelings do you try to avoid?",
    "What is something you are afraid to admit in front of others?",
    "What makes you feel most vulnerable?",
    "Do you recharge better alone or around other people?",
    "What is something you would like to do more often?",
    "What is something you would still like to learn?",
    "What activity completely helps you switch off?",
    "What kind of environment makes you feel most comfortable?"
];

/* =========================================================
   GAME STATE
   ========================================================= */

let deck = [...questions];

let currentIndex = 0;

let hasStarted = false;

let touchStartX = 0;
let touchEndX = 0;

let toastTimeout;

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const questionCard = document.getElementById("questionCard");

const questionText = document.getElementById("questionText");

const currentNumber = document.getElementById("currentNumber");

const progressFill = document.getElementById("progressFill");

const remainingText = document.getElementById("remainingText");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");

const shuffleButton =
    document.getElementById("shuffleButton");

const restartButton =
    document.getElementById("restartButton");

const rulesButton =
    document.getElementById("rulesButton");

const rulesModal =
    document.getElementById("rulesModal");

const closeRules =
    document.getElementById("closeRules");

const startGameButton =
    document.getElementById("startGameButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderQuestion();

    /*
     * The rules appear automatically the first time
     * the game is opened.
     */
    openRules();

    setupKeyboardControls();

    setupSwipeControls();

});

/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion(animate = false) {

    const question = deck[currentIndex];

    if (!question) {
        return;
    }

    if (animate) {

        questionCard.classList.remove("card-changing");

        /*
         * Force a browser reflow so the animation
         * can restart every time.
         */
        void questionCard.offsetWidth;

        questionCard.classList.add("card-changing");
    }

    questionText.textContent = question;

    const displayNumber =
        String(currentIndex + 1).padStart(2, "0");

    currentNumber.textContent = displayNumber;

    const progress =
        ((currentIndex + 1) / deck.length) * 100;

    progressFill.style.width = `${progress}%`;

    const remaining =
        deck.length - (currentIndex + 1);

    if (remaining === 0) {

        remainingText.textContent =
            "You've reached the end of the deck";

    } else if (remaining === 1) {

        remainingText.textContent =
            "1 question remaining";

    } else {

        remainingText.textContent =
            `${remaining} questions remaining`;
    }

    updateNavigation();
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function nextQuestion() {

    if (currentIndex < deck.length - 1) {

        currentIndex++;

        renderQuestion(true);

    } else {

        showToast("You've reached the end of the deck");
    }
}

function previousQuestion() {

    if (currentIndex > 0) {

        currentIndex--;

        renderQuestion(true);

    } else {

        showToast("You're already at the first question");
    }
}

/* =========================================================
   NAVIGATION STATE
   ========================================================= */

function updateNavigation() {

    previousButton.style.opacity =
        currentIndex === 0 ? "0.35" : "1";

    previousButton.style.pointerEvents =
        currentIndex === 0 ? "none" : "auto";

    nextButton.style.opacity =
        currentIndex === deck.length - 1
            ? "0.35"
            : "1";

    nextButton.style.pointerEvents =
        currentIndex === deck.length - 1
            ? "none"
            : "auto";
}

/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffleDeck() {

    /*
     * Fisher-Yates shuffle.
     */

    for (
        let i = deck.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] =
            [deck[j], deck[i]];
    }

    currentIndex = 0;

    renderQuestion(true);

    showToast("Deck shuffled");
}

/* =========================================================
   RESTART
   ========================================================= */

function restartGame() {

    deck = [...questions];

    currentIndex = 0;

    renderQuestion(true);

    showToast("Deck restarted");
}

/* =========================================================
   MODAL
   ========================================================= */

function openRules() {

    rulesModal.classList.add("visible");

    rulesModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}

function closeRulesModal() {

    rulesModal.classList.remove("visible");

    rulesModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    hasStarted = true;
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}

/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupKeyboardControls() {

    document.addEventListener("keydown", (event) => {

        /*
         * ESC closes the rules.
         */

        if (event.key === "Escape") {

            if (rulesModal.classList.contains("visible")) {
                closeRulesModal();
            }

            return;
        }

        /*
         * Don't navigate the deck while
         * the rules are open.
         */

        if (rulesModal.classList.contains("visible")) {
            return;
        }

        if (event.key === "ArrowRight") {

            nextQuestion();

        } else if (event.key === "ArrowLeft") {

            previousQuestion();
        }
    });
}

/* =========================================================
   TOUCH / SWIPE CONTROLS
   ========================================================= */

function setupSwipeControls() {

    questionCard.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );

    questionCard.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();
        },
        { passive: true }
    );
}

function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;

    const minimumSwipe = 55;

    if (Math.abs(swipeDistance) < minimumSwipe) {
        return;
    }

    if (swipeDistance < 0) {

        nextQuestion();

    } else {

        previousQuestion();
    }
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */

nextButton.addEventListener(
    "click",
    nextQuestion
);

previousButton.addEventListener(
    "click",
    previousQuestion
);

nextQuestionButton.addEventListener(
    "click",
    nextQuestion
);

shuffleButton.addEventListener(
    "click",
    shuffleDeck
);

restartButton.addEventListener(
    "click",
    restartGame
);

rulesButton.addEventListener(
    "click",
    openRules
);

closeRules.addEventListener(
    "click",
    closeRulesModal
);

startGameButton.addEventListener(
    "click",
    closeRulesModal
);

/*
 * Clicking the dark area outside the modal
 * also closes the rules.
 */

rulesModal.addEventListener(
    "click",
    (event) => {

        if (event.target === rulesModal) {
            closeRulesModal();
        }
    }
);

/* =========================================================
   PREVENT ACCIDENTAL DOUBLE TAP ZOOM ON BUTTONS
   ========================================================= */

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener(
        "touchend",
        (event) => {

            event.preventDefault();
            button.click();

        },
        { passive: false }
    );

})