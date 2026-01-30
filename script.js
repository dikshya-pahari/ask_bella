// Landing page animation
const landingTexts = [
    "Hi,Bella",
    "I like your name btw!",
    "Its Valentines!! :D",
    "Happy Valentines Bella!! Bla..Bla...",
    "Thats what I was going to do.",
    "But then I Stopped. ",
    "I realized, I wanted to do something Special.",
    "Because,",
    "You are Special :)",
    "SO,",
    "I made a little something.."
];

let currentTextIndex = 0;
const landingTextContainer = document.getElementById('landing-text-container');
const openBookBtn = document.getElementById('open-book');

function showChatMessage() {
    const chatBox = document.createElement('div');
    chatBox.className = 'chat-box';

    const message = document.createElement('div');
    message.className = 'chat-message';

    const sendBtn = document.createElement('button');
    sendBtn.className = 'chat-send';
    sendBtn.textContent = 'Send';

    chatBox.appendChild(message);
    chatBox.appendChild(sendBtn);
    landingTextContainer.appendChild(chatBox);

    const text = landingTexts[currentTextIndex];
    let i = 0;

    // Typing effect
    const typing = setInterval(() => {
        message.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(typing);

            // Activate send button visually
            sendBtn.classList.add('active');

            // Pause → fade out → continue
            setTimeout(() => {
                chatBox.classList.add('fade-out');

                setTimeout(() => {
                    chatBox.remove();
                    currentTextIndex++;
                    showNextText();
                }, 800);

            }, 900);
        }
    }, 70);
}


function showNextText() {
    // Special animated chat for 4th message
    // if (currentTextIndex === 3) {
        // showChatMessage();
        // return;
    // }

    if (currentTextIndex < landingTexts.length) {
        const textDiv = document.createElement('div');
        textDiv.className = 'landing-text';
        textDiv.textContent = landingTexts[currentTextIndex];
        landingTextContainer.appendChild(textDiv);

        if (currentTextIndex === landingTexts.length - 1) {
            setTimeout(() => {
                openBookBtn.style.display = 'block';
                openBookBtn.classList.add('show');
            }, 100); //put here 3000 in final
        }

        currentTextIndex++;
        setTimeout(() => {
            textDiv.remove();
            showNextText();
        }, 100); //put here 3000 in final
    }
}



showNextText();

openBookBtn.addEventListener('click', () => {
    document.getElementById('landing').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('calendar-page').classList.add('active');
    }, 800);
});

// Calendar setup
const calendarGrid = document.getElementById('calendar-grid');
const calendarFeedback = document.getElementById('calendar-feedback');
const calendarNext = document.getElementById('calendar-next');
const correctDate = 1; // SET YOUR OFFICIAL DATE HERE (day of the month)

// Days of week
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
daysOfWeek.forEach(day => {
    const dayLabel = document.createElement('div');
    dayLabel.className = 'calendar-day-label';
    dayLabel.textContent = day;
    calendarGrid.appendChild(dayLabel);
});

// August 2025 starts on Sunday
const firstDayOffset = 0; // 0 = Sunday
for (let i = 0; i < firstDayOffset; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyDay);
}

// Create calendar days
for (let day = 1; day <= 31; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = day;
    dayDiv.addEventListener('click', () => checkDate(day));
    calendarGrid.appendChild(dayDiv);
}

function launchRomanticConfetti() {
    for (let i = 0; i < 300; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add(
            'confetti',
            Math.random() > 0.5 ? 'heart' : 'sparkle'
        );

        // confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.left = Math.random() * 120 - 10 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
        // confetti.style.animationDelay = Math.random() * 0.5 + 's';
        // const size = Math.random() * 10 + 4;
        // confetti.style.width = size + 'px';
        // confetti.style.height = size + 'px';


        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

function launchBurstConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti burst';

        const angle = Math.random() * 2 * Math.PI;
        const distance = 200 + Math.random() * 300;

        confetti.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        confetti.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        confetti.style.left = '50vw';
        confetti.style.top = '50vh';
        confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}
function launchPetalConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti petal';

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.animationDuration = 4 + Math.random() * 2 + 's';

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 6000);
    }
}


const wrongDatePhrases = [
    "You are making me sad 😢",
    "Ouch… that hurt a little",
    "Hmm… that wasn’t our day 🥺",
    "Nope 😭 try again, my love",
    "My heart says no 💕",
    "Really? 👀",
    "No baby😔",
    "Try Harder 😭",
    "I expected better from you 😞",
    "My little goldfish!🐟😏"
];

let lastWrongIndex = -1;

function getRandomWrongPhrase() {
    let index;
    do {
        index = Math.floor(Math.random() * wrongDatePhrases.length);
    } while (index === lastWrongIndex);

    lastWrongIndex = index;
    return wrongDatePhrases[index];
}


function checkDate(day) {
    if (day === correctDate) {
        calendarFeedback.textContent = '🎉 Yayy! You remember!😚';
        calendarFeedback.className = 'calendar-feedback feedback-correct';
        calendarNext.classList.add('show');
        launchBurstConfetti();
        launchPetalConfetti();
        launchRomanticConfetti();
    }  else {
        const randomPhrase =
            wrongDatePhrases[
                Math.floor(Math.random() * wrongDatePhrases.length)
            ];

        calendarFeedback.textContent = getRandomWrongPhrase();
        calendarFeedback.className = 'calendar-feedback feedback-wrong';
    }
}

calendarNext.addEventListener('click', () => {
    document.getElementById('calendar-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('timer-page').classList.add('active');
        startTimer();
    }, 500);
});

// Timer
const officialDate = new Date('2025-08-08'); // SET YOUR OFFICIAL DATE HERE (YYYY-MM-DD)
let timerInterval;

function startTimer() {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date();
    const diff = now - officialDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

document.getElementById('timer-next').addEventListener('click', () => {
    document.getElementById('timer-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('timeline-page').classList.add('active');
    }, 500);
});

document.getElementById('timeline-next').addEventListener('click', () => {
    document.getElementById('timeline-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('dates-page').classList.add('active');
    }, 500);
});

// Polaroid click to play video (if you add videos)
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('click', () => {
        const video = polaroid.querySelector('.polaroid-video');
        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    });
});

document.getElementById('dates-next').addEventListener('click', () => {
    document.getElementById('dates-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('proposal-page').classList.add('active');
        showProposal();
    }, 500);
});

// Proposal sequence
let noClickCount = 0;
const noPhrases = [
    "Are you sure? 🥺",
    "Really? Think again :(",
    "Ouchh! that hurt.",
    "Come on, you know you want to say yes! 😊",
    "Noooo..",
    "Please 🙇‍♂️"
];

function showProposal() {
    const proposalContent = document.getElementById('proposal-content');
    proposalContent.innerHTML = ''; // reset

    // Create a container to hold everything and prevent layout shifts
    const contentWrapper = document.createElement('div');
    contentWrapper.style.minHeight = '80vh';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.style.justifyContent = 'center';
    contentWrapper.style.alignItems = 'center';
    proposalContent.appendChild(contentWrapper);

    const lines = [
        'I want to build more memories with you 🐶',
        'SO...'
    ];

    let delay = 500;

    // Sequential fade-in/out lines
    lines.forEach((text, index) => {
        setTimeout(() => {
            const div = document.createElement('div');

            // First line fades in slowly
            if (index === 0) {
                div.className = 'proposal-text fade-in-slow';
            } else {
                div.className = 'proposal-text fade-in-out';
            }

            div.textContent = text;
            contentWrapper.appendChild(div);

            // Remove all lines after animation
            setTimeout(() => div.remove(), 2000);
        }, delay);

        delay += 2000 + 1000; // 2.5s animation + 1s gap
    });

    // Pop text: "I wanted to ask you" - disappears completely
    setTimeout(() => {
        const popDiv = document.createElement('div');
        popDiv.className = 'proposal-text pop-text';
        popDiv.innerHTML = 'I wanted to ask you 😶';
        contentWrapper.appendChild(popDiv);

        // Remove after pop animation
        setTimeout(() => popDiv.remove(), 2000);
    }, delay);
    delay += 2000 + 1000; // 3s animation + 1s gap

    // Final question with drop and bounce, and emoji above it
    setTimeout(() => {
        const emojiImg = document.createElement('img');
        emojiImg.src = 'img/zenitsu_propose.jpg';
        emojiImg.className = 'emoji-img';
        contentWrapper.appendChild(emojiImg);

        const question = document.createElement('div');
        question.className = 'question drop-bounce';
        question.textContent = 'Will you be my Valentine? 💝';
        contentWrapper.appendChild(question);
    }, delay);
    delay += 2000; // Wait for drop-bounce animation

    // Show buttons after question has landed (buttons stay in fixed position)
    setTimeout(() => {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container show';

        const yesBtn = document.createElement('button');
        yesBtn.className = 'proposal-button';
        yesBtn.id = 'yes-button';
        yesBtn.textContent = 'Yes! 💕';
        yesBtn.addEventListener('click', handleYes);

        const noBtn = document.createElement('button');
        noBtn.className = 'proposal-button';
        noBtn.id = 'no-button';
        noBtn.textContent = 'No';
        noBtn.addEventListener('click', handleNo);

        buttonContainer.appendChild(yesBtn);
        buttonContainer.appendChild(noBtn);
        contentWrapper.appendChild(buttonContainer);
    }, delay);
}


function handleNo() {
    const yesBtn = document.getElementById('yes-button');
    const noBtn = document.getElementById('no-button');
    const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.2) + 'px';
    yesBtn.style.padding = (20 * (1 + noClickCount * 0.2)) + 'px ' + (50 * (1 + noClickCount * 0.2)) + 'px';

    const proposalContent = document.getElementById('proposal-content');
    const existingPhrase = proposalContent.querySelector('.no-phrase');
    if (existingPhrase) {
        existingPhrase.remove();
    }

    if (noClickCount < noPhrases.length) {
        const phrase = document.createElement('div');
        phrase.className = 'no-phrase';
        phrase.textContent = noPhrases[noClickCount];
        proposalContent.appendChild(phrase);
    }

    noClickCount++;
}

function handleYes() {
    const proposalContent = document.getElementById('proposal-content');
    proposalContent.innerHTML = '';

    // VIDEO (acts like a GIF)
    const video = document.createElement('video');
    video.src = 'img/happy.mp4';   // change path
    video.className = 'celebration-video';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    proposalContent.appendChild(video);

    //Text
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = 'Horayyyy!! I love you my angel :)) 💕';
    proposalContent.appendChild(celebration);

    createHeartConfetti();

    setTimeout(() => {
        const finalMessage = document.createElement('div');
        finalMessage.className = 'proposal-text show';
        finalMessage.style.fontSize = '2.5rem';
        finalMessage.innerHTML = 'Can’t wait to fill up more pages of our story together 📖💞';
        proposalContent.appendChild(finalMessage);
    }, 2000);
}


function createHeartConfetti() {
    const colors = ['#ff4d6d', '#ff9aa2', '#ffd6e0', '#ffb3c6'];
    const count = 200; // MORE hearts 💖

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-confetti';
            heart.style.background = colors[Math.floor(Math.random() * colors.length)];

            const side = Math.floor(Math.random() * 4);
            let startX, startY, endX, endY;

            const spread = window.innerWidth * 0.8;

            switch (side) {
                case 0: // top
                    startX = Math.random() * window.innerWidth;
                    startY = -20;
                    endX = (Math.random() - 0.5) * spread;
                    endY = window.innerHeight + 200;
                    break;

                case 1: // bottom
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 20;
                    endX = (Math.random() - 0.5) * spread;
                    endY = -window.innerHeight;
                    break;

                case 2: // left
                    startX = -20;
                    startY = Math.random() * window.innerHeight;
                    endX = window.innerWidth + 200;
                    endY = (Math.random() - 0.5) * spread;
                    break;

                case 3: // right
                    startX = window.innerWidth + 20;
                    startY = Math.random() * window.innerHeight;
                    endX = -window.innerWidth;
                    endY = (Math.random() - 0.5) * spread;
                    break;
            }

            heart.style.left = `${startX}px`;
            heart.style.top = `${startY}px`;
            heart.style.setProperty('--x', `${endX}px`);
            heart.style.setProperty('--y', `${endY}px`);
            heart.style.animationDuration = `${Math.random() * 2 + 3}s`;

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }, i * 15);
    }
}
