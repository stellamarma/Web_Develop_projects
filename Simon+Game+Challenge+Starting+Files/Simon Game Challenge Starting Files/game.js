// Ο πίνακας που περιέχει τα χρώματα των κουμπιών
var buttonColours = ["red", "blue", "green", "yellow"];

// Αποθήκευση του μοτίβου του παιχνιδιού και των επιλογών του χρήστη
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Συνάρτηση για την επόμενη ακολουθία
function nextSequence() {
    userClickedPattern = []; // Καθαρίζουμε το μοτίβο του χρήστη κάθε φορά που ξεκινά νέα ακολουθία
    level++; // Αυξάνουμε το επίπεδο
    $("#level-title").text("Level " + level); // Ενημερώνουμε τον τίτλο με το τρέχον επίπεδο

    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Αναπαραγωγή animation και ήχου για το κουμπί
    playSoundAndAnimate(randomChosenColour);
}

// Συνάρτηση για να παίζει τον ήχο και να κάνει το animation
function playSoundAndAnimate(colour) {
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

// Έλεγχος αν η επιλογή του χρήστη είναι σωστή
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Αν η επιλογή του χρήστη είναι σωστή και έφτασε το τέλος του μοτίβου
        if (userClickedPattern.length === gamePattern.length) {
            // Περιμένουμε 1000ms και καλούμε το επόμενο βήμα
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // Αν κάνει λάθος, το παιχνίδι τερματίζεται
        gameOver();
    }
}

// Συνάρτηση για την επανεκκίνηση του παιχνιδιού μετά από σφάλμα
function gameOver() {
    $("#level-title").text("Game Over, Press Start to Restart");
    $("body").addClass("game-over");
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    // Επανεκκίνηση των παραμέτρων του παιχνιδιού
    startOver();
}

// Επανεκκίνηση του παιχνιδιού
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Όταν πατηθεί το κουμπί "Start", ξεκίνα το παιχνίδι αν δεν έχει ξεκινήσει
$("#startButton").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Όταν ο χρήστης πατάει κάποιο κουμπί χρώματος
$(".btn").click(function() {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSoundAndAnimate(userChosenColour);

        // Έλεγχος της απάντησης του χρήστη
        checkAnswer(userClickedPattern.length - 1);
    }
});
