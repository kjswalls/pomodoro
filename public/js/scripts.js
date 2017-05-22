/* global $ */

// track the timer state
var isPaused = true;
var isPomo = true;
var isBreak = false;

// track pomodoro length and break length, in milliseconds
var pomodoroLength = 25 * 60 * 1000;
var breakLength = 5 * 60 * 1000;

// get the current time
var now;

// add pomodoroLength to the current time to get the countdown time
var countdownTime;

// store the interval, the difference between now and the countdown time, and the "current" time
var timer;
var diff;
var current;

$(function() {

    // when the stopngo button is clicked
    $('#stopngo').on('click', function() {
        // if the timer is stopped
        if (isPaused) {
            startCountdown();
        }
        // if the timer is going
        else {
            pauseCountdown();
        }
    });
    
    // when the pomodoro plus is clicked
    $('#pomo-up').on('click', function() {
        pauseCountdown();
        // get the value of the pomodoro
        var length = Number($('#pomo').text()) + 1;
        
        // add one to it
        $('#pomo').text(length);
        if (isPomo) {
            $('#min').text(length);
            $('#sec').text('0');
        }
        pomodoroLength = length * 60 * 1000;
    });
    
    // when the pomodoro minus is clicked
    $('#pomo-down').on('click', function() {
        pauseCountdown();
        // get the value of the pomodoro
        if ($('#pomo').text() > 1) {
            var length = Number($('#pomo').text()) - 1;
        }
        else {
            length = 1;
        }
        
        // subtract one
        $('#pomo').text(length);
        if (isPomo) {
            $('#min').text(length);
            $('#sec').text('0');
        }
        pomodoroLength = length * 60 * 1000;
    });
    
    // when the break plus is clicked
    $('#break-up').on('click', function() {
        pauseCountdown();
        // get the value of the break
        var length = Number($('#break').text()) + 1;
        
        // add one to it
        $('#break').text(length);
        if (isBreak) {
            $('#min').text(length);
            $('#sec').text('0');            
        }

        breakLength = length * 60 * 1000;
    });
    
    // when the break minus is clicked
    $('#break-down').on('click', function() {
        pauseCountdown();
        var length;
        // get the value of the break
        if (Number($('#break').text()) > 1) {
            length = Number($('#break').text()) - 1;
        }
        else {
            length = 1;
        }
        
        // subtract one
        $('#break').text(length);
        if (isBreak) {
            $('#min').text(length);
            $('#sec').text('0');            
        }
        breakLength = length * 60 * 1000;
    });
});

function startCountdown() {
    // update timer state
    isPaused = false;
    $('input').val('Stop');
    
    // get the current time
    now = new Date().getTime();
    
    // add pomodoroLength to the current time to get the countdown time
    countdownTime = Math.round(now + pomodoroLength);
    
    // update the count every second
    timer = setInterval(updateClock, 1000);
    
    function updateClock() {
        
        // get the current time
        current = new Date().getTime();

        // find the difference between now and the countdown time
        diff = Math.round(countdownTime - current);
        
        // update the UI
        var minutes = Math.floor(diff / (1000 * 60));
        var seconds = Math.round(diff % (1000 * 60) / 1000);
        
        if ((diff / (1000 * 60)) < 1 && seconds < 60) {
           $('#min').text('0'); 
        }
        
        else {
            $('#min').text(minutes);
        }
        
        $('#sec').text(seconds);
        
        // if the countdown is finished
        if (diff < 1) {
            // update the UI
            $('input').val('Done!');
            clearInterval(timer);
            switchPhase();
        }
    
    }
}

function pauseCountdown() {
    current = new Date().getTime();
    pomodoroLength = diff;
    
    // update timer state
    isPaused = true;
    $('input').val('Start');
    
    // stop the interval
    clearInterval(timer);
}

function switchPhase() {
    $('input').val('Start');
    isPaused = true;
    
    if (isPomo) {
        pomodoroLength = breakLength;
        isPomo = false;
        isBreak = true;
        $('#min').text($('#break').text());
        $('#sec').text(0);
    }
    else {
        pomodoroLength = Number($('#pomo').text()) * 60 * 1000;
        isPomo = true;
        isBreak = false;
        $('#min').text($('#pomo').text());
        $('#sec').text(0);
    }
}