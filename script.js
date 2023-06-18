$(".stopwatch-btn").click(function () {
    //hide all other wrappers
    $(".outer-wrap > div").slideUp();
    //show stopwatch section
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

$(".back-btn").click(function () {
    //hide all other wrappers
    $(".outer-wrap > div").slideUp();
    //show stopwatch section
    $(".clock").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

$(".timer-btn").click(function () {
    //hide all other wrappers
    $(".outer-wrap > div").slideUp();
    //show stopwatch section
    $(".timer").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

const addTrailZero = (num) =>{
    return num < 10 ? "0" + num : num;
}; 

const updateTime =() =>{
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    //converting 24 hours to 12
    hours = hours % 12 || 12;

    //add trailing zeros if less than 10
    hours = addTrailZero(hours);
    minutes = addTrailZero(minutes);
        seconds = addTrailZero(seconds);

        $('#hour').html(hours);
        $('#min').html(minutes);
        $('#sec').html(seconds);
        $('#ampm').html(ampm);
        $('#other-ampm').html(otherampm);
};

// call the function on page loading
updateTime();

//calling function after every second
setInterval(updateTime, 1000);


//STOPWATCH SECTION----------------------------------------------------------------------


let stopwatchHours = 0, 
   stopwatchMinutes = 0,
   stopwatchSeconds = 0,
   stopwatchMiliSeconds = 0,
   stopwatchRunning = false,
   laps = 0,
   stopwatchInterval;

const stopwatch =  () =>{
    //increase milisecond by one
    stopwatchMiliSeconds++;

    if(stopwatchMiliSeconds==100){
        //if stopwatch = 100 ms then set ms = 0 & second = 1
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }

    if(stopwatchSeconds == 60){
        //same funda with the seconds if the sec = 60 hit minute with 1 and set sec to 0
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if(stopwatchMinutes == 60){
        //same with minutes
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    //show values on document
    $("#stopwatch-hour").html(addTrailZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailZero(stopwatchMiliSeconds));

};

const startStopwatch = () =>{
    if(!stopwatchRunning){
        //if stopwatch not already running
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};


//function to stop stopwatch
const stopStopwatch = () =>{
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () =>{
    //clear values and set everything back to deafult
    clearInterval(stopwatchInterval);
    //stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0;

    //upadate values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html(" ");
};

$(".start-stopwatch").click(function () {
    startStopwatch();
    //hide start button show lap button
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
    //on lap button click
    laps++;
    //remove active class
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class="lap active">
                    <p>lap ${laps}</p>
                    <p>
                    ${addTrailZero(stopwatchHours)} : ${addTrailZero(
          stopwatchMinutes
        )} : 
                    ${addTrailZero(stopwatchSeconds)} : ${addTrailZero(
          stopwatchMiliSeconds
        )}
                    </p>
                </div>`        
    );
});


//TIMER SECTION----------------------------------------------------------------------


let time = 0, 
    timerHours =0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () =>{
    time = prompt("Enter time in minutes: ");
    //convert time to seconds
    time = time*60;
    //update timer defaults
    setTime();
};

const setTime = () =>{
    timerHours = Math.floor(time/3600);
    timerMinutes= Math.floor((time % 3600) / 60);
    timerSeconds= Math.floor(time % 60);

    //show the user input
    $("#timer-hour").html(addTrailZero(timerHours));
    $("#timer-min").html(addTrailZero(timerMinutes));
    $("#timer-sec").html(addTrailZero(timerSeconds));
    $("#timer-ms").html(addTrailZero(timerMiliseconds));
};

const timer = () =>{
    timerMiliseconds--;
    if(timerMiliseconds == -1){
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if(timerSeconds == -1){
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes == -1){
        timerMinutes = 959;
        timerHours--;
    }
    
    //update time
    $("#timer-hour").html(addTrailZero(timerHours));
    $("#timer-min").html(addTrailZero(timerMinutes));
    $("#timer-sec").html(addTrailZero(timerSeconds));
    $("#timer-ms").html(addTrailZero(timerMiliseconds));

    //check if  time up on every interval
    timeUp();
}

const startTimer = () =>{
    //before starting check if valid time given
    if((timerHours ==0) & (timerMinutes) == 0 && timerSeconds==0 && timerMiliseconds ==0){
        //if all values are zero get time
        getTime();
    }
    else{
        //start timer
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer = () =>{
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
}

const resetTimer = () =>{
    stopTimer();
    time = 0;
    setTime();
}

//check if time remaining 0
const timeUp = () =>{
    if((timerHours ==0) & (timerMinutes) == 0 && timerSeconds==0 && timerMiliseconds ==0){
        resetTimer();
        alert("!Time is Up!")
        setTime();
    }
}

$(".start-timer").click(function (){
    startTimer();
});

$(".stop-timer").click(function (){
    stopTimer();
});

$(".reset-timer").click(function (){
    resetTimer();
});

