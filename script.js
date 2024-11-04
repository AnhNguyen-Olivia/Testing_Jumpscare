let isLocked = false;

// Preload audio and image
const screamSound = new Audio("src_assets_jumpscareSound.mp3");
const jumpscareImage = new Image();
jumpscareImage.src = "jumpscareImage.jpg";

document.getElementById('codeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (isLocked) {
        return; // Don't process if form is locked
    }

    const correctPassword = "1234";
    const enteredPassword = document.getElementById('password').value;
    const feedback = document.getElementById('feedback');
    const form = document.getElementById('codeForm');

    if (enteredPassword !== correctPassword) {
        // Lock the form
        isLocked = true;
        form.classList.add('disabled');
        feedback.textContent = "Incorrect code. System locked.";

        // Show loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.display = 'flex';

        // Start the creepy message updates
        startCreepyMessages();

        // After loading completes, trigger glitch and jumpscare
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startGlitchEffect();
            setTimeout(() => triggerJumpscareSequence(), 1500);
        }, 2000); // Show loading for 2 seconds
    } else {
        feedback.textContent = "Correct code!";
        window.location.href = redirectURL;
    }
});

function triggerJumpscareSequence() {
    const jumpscare = document.getElementById('jumpscare');
    const form = document.getElementById('codeForm');

    // Play the sound
    screamSound.play().then(() => {
        // Display the jumpscare image immediately
        jumpscare.style.display = 'flex';
        jumpscare.src = jumpscareImage.src; // Set the source of the jumpscare image
        document.body.classList.add('shake');
    }).catch(error => {
        console.error("Audio playback failed:", error);
    });

    setTimeout(() => {
        jumpscare.style.display = 'none';
        document.body.classList.remove('shake');

        // Reset everything
        isLocked = false;
        form.classList.remove('disabled');
        document.getElementById('feedback').textContent = '';
        document.getElementById('password').value = '';

        // Stop the creepy messages interval
        stopCreepyMessages();
    }, 5000); // Display the jumpscare for 5 seconds
}

function startGlitchEffect() {
    const body = document.body;
    body.classList.add('glitch');
    setTimeout(() => {
        body.classList.remove('glitch');
    }, 800);
}

// Creepy messages functionality
const creepyMessages = [
    "Analyzing your code...",
    "Processing attempt...",
    "Verifying identity...",
    "You shouldn't be here...",
    "Warning: Unknown presence detected...",
    "System compromise detected...",
    "Emergency protocols initiated...",
    "Connection terminated..."
];

let messageInterval;

function updateLoadingMessage() {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText && loadingText.offsetParent !== null) {
        const randomMessage = creepyMessages[Math.floor(Math.random() * creepyMessages.length)];
        loadingText.textContent = randomMessage;
    }
}

function startCreepyMessages() {
    // Update immediately and then start interval
    updateLoadingMessage();
    messageInterval = setInterval(updateLoadingMessage, 1000);
}

function stopCreepyMessages() {
    if (messageInterval) {
        clearInterval(messageInterval);
    }
}
