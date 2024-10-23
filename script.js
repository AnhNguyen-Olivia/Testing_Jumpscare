let attemptCount = 0; // To track incorrect attempts

document.getElementById('codeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting
    const correctPassword = "1234"; // Set the correct password
    const enteredPassword = document.getElementById('password').value;
    const feedback = document.getElementById('feedback');

    if (enteredPassword !== correctPassword) {
        attemptCount++; // Increment the attempt count
        feedback.textContent = `Incorrect code. Attempt ${attemptCount}/3`;

        if (attemptCount >= 3) {
            // Start flickering/glitch effect before the jumpscare
            setTimeout(() => startGlitchEffect(), 500);

            // Trigger jumpscare after 3 incorrect attempts
            setTimeout(() => {
                const jumpscare = document.getElementById('jumpscare');
                jumpscare.style.display = 'flex'; // Show the jumpscare div

                // Play scream sound
                const screamSound = document.getElementById('screamSound');
                screamSound.currentTime = 0;
                screamSound.play();

                // Shake effect on the screen
                document.body.classList.add('shake');

                // Stop everything after a delay (jumpscare hides, reset)
                setTimeout(() => {
                    jumpscare.style.display = 'none'; // Hide the jumpscare
                    document.body.classList.remove('shake');
                    feedback.textContent = '';
                    attemptCount = 0; // Reset the attempt count
                }, 5000); // 5 seconds delay
            }, 1000); // Slight delay before jumpscare for tension
        }
    } else {
        feedback.textContent = "Correct code! Here's your clue.";
        attemptCount = 0; // Reset on correct password
    }
});

// Function to create flickering/glitch effect
function startGlitchEffect() {
    const body = document.body;
    body.classList.add('glitch');
    setTimeout(() => {
        body.classList.remove('glitch');
    }, 800); // Stop glitch effect after 800ms
}