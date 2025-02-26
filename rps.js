// Math.random will be used. 0..1 will be divided into 3 parts
// 0    < 1/3 <   2/3 < 1
// Rock  Paper   Scissors
// Wins  Losses  Draws
//  1      2       3

scores = JSON.parse(localStorage.getItem('scores')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    // winText: 'You win.',
    // losText: 'You lose.',
    // tieText: 'Tie.',
};

// Keep scores after page refresh
document.getElementById('destit').innerText = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
trackScores();

function keepScores(score, user_choice, computer_choice) {
    let fcuser = document.getElementById('fcu');
    let fccomputer = document.getElementById('fcc');

    if (user_choice === 1) {
        fcuser.innerText = '🪨';
    }
    else if (user_choice === 2) {
        fcuser.innerText = '📃';
    }
    else if (user_choice === 3) {
        fcuser.innerText = '✂️';
    }

    if (computer_choice === 1) {
        fccomputer.innerText = '🪨';
    }
    else if (computer_choice === 2) {
        fccomputer.innerText = '📃';
    }
    else if (computer_choice === 3) {
        fccomputer.innerText = '✂️';
    }

    let VSIconMiddle = document.getElementById('vs-icon-middle');
    console.log(VSIconMiddle);

    if (score === 1) {
        scores.wins+=1;
        VSIconMiddle.innerText = 'You win.';
    } else if (score === 2) {
        scores.losses += 1;
        VSIconMiddle.innerText = 'You lose.';
    } else if (score === 3) {
        scores.ties += 1;
        VSIconMiddle.innerText = 'Tie.';
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

let clicked_state = true;
function resetScores() {
    let popup = document.getElementById('reset-confirm');

    if (clicked_state) {
        popup.innerHTML = `
        <p>Are you sure you want to reset the score?</p>
        <div class="reset-confirm-buttons">
            <button class="confirm-but yes-but">Yes</button>
            <button class="confirm-but no-but">No</button>
        </div>`;
        clicked_state = false;

        document.querySelector('.yes-but').addEventListener('click', () => {
            scores.losses = 0;
            scores.wins = 0;
            scores.ties = 0;
            localStorage.removeItem('scores');
            trackScores();
            popup.innerText = '';
        });

        document.querySelector('.no-but').addEventListener('click', () => {
            popup.innerText = '';
        });
        clicked_state = true;
    }
}

function trackScores() {
    let trackWins = `Wins: ${scores.wins}`;
    let trackLoss = `Losses: ${scores.losses}`;
    let trackTies = `Ties: ${scores.ties}`;
    let trackTemplate = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;

    document.getElementById('losses').innerText = trackLoss;
    document.getElementById('wins').innerText = trackWins;
    document.getElementById('ties').innerText = trackTies;

    let destit = document.getElementById('destit');
    destit.innerText = trackTemplate;
}


function Rock() {
    const RanNum = Math.random();
    if (RanNum <= 1/3) {
        keepScores(score=3, user_choice=1, computer_choice=1);
        trackScores();
    }
    else if (RanNum > 1/3 && RanNum <=2/3) {
        keepScores(score=2, user_choice=1, computer_choice=2);
        trackScores();
    }
    else if (RanNum > 2/3) {
        keepScores(score=1, user_choice=1, computer_choice=3);
        trackScores();
    }
}

function Paper() {
    const RanNum = Math.random();
    if (RanNum <= 1/3) {
        keepScores(score=1, user_choice=2, computer_choice=1);
        trackScores();
    }
    else if (RanNum > 1/3 && RanNum <=2/3) {
        keepScores(score=3, user_choice=2, computer_choice=2);
        trackScores();
    }
    else if (RanNum > 2/3) {
        keepScores(score=2, user_choice=2, computer_choice=3);
        trackScores();
    }
}

function Scissors() {
    const RanNum = Math.random();
    if (RanNum <= 1/3) {
        keepScores(score=2, user_choice=3, computer_choice=1);
        trackScores();
    }
    else if (RanNum > 1/3 && RanNum <=2/3) {
        keepScores(1);
        keepScores(score=1, user_choice=3, computer_choice=2);
        trackScores();
    }
    else if (RanNum > 2/3) {
        keepScores(score=3, user_choice=3, computer_choice=3);
        trackScores();
    }
}

// Global variable to store the setInterval reference
let refreshInterval;
let play = false;

function autoPlay() {
    let autoPlayInnerText = document.getElementById('autoplay');
    if (!play) {
        autoPlayInnerText.innerText = 'Stop Playing';
        // Start interval
        refreshInterval = setInterval(function () {
            const RanNum = Math.random();
            if (RanNum <= 1 / 3) {
                Rock();
            } else if (RanNum > 1 / 3 && RanNum <= 2 / 3) {
                Paper();
            } else {
                Scissors();
            }
        }, 400);

        play = true;
    } else {
        autoPlayInnerText.innerText = 'AutoPlay';
        // Stop interval
        clearInterval(refreshInterval);
        play = false;
    }
}

/* Main Runtime */
document.getElementById('reset').addEventListener('click', () => {
    resetScores();
});

document.getElementById('autoplay').addEventListener('click', () => {
    autoPlay();
});

document.getElementById('rock').addEventListener('click', () => {
    Rock();
});

document.getElementById('paper').addEventListener('click', () => {
    Paper();
});

document.getElementById('scissors').addEventListener('click', () => {
    Scissors();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        // document.getElementById('rock').click();
        Rock();
    } else if (event.key === 'p') {
        Paper();
    } else if (event.key === 's') {
        Scissors();
    } else if (event.key === 'q') {
        resetScores();
    } else if (event.key === 'a') {
        autoPlay();
    };
})
