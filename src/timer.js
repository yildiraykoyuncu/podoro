const timer = {
    state: {
        seconds: 1500,

    },
    startTimerHandler() {
        const seconds = this.state.seconds;
        this.timer(seconds);
        console.log('start')
    },
    timerButtonsHandler(event) {

        console.log('click')
        const duration = Number(event.target.dataset.duration);
        this.displayTimeLeft(duration);
        this.state.seconds = duration;
        const countdown = this.state.intervalID;
        clearInterval(countdown);
    },


    timer(seconds) {

        const now = Date.now();
        const end = now + seconds * 1000;

        // display countdown start 
        this.displayTimeLeft(seconds);


        const countdown = setInterval(() => {
            const secondsLeft = Math.round((end - Date.now()) / 1000)

            if (secondsLeft < 0) {
                clearInterval(countdown)
                return
            }

            this.displayTimeLeft(secondsLeft);
        }, 1000);

        this.state.intervalID = countdown;
    },

    displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const display = `${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds}`
        document.getElementById('timerDisplay').innerHTML = display;
    },

    render() {

        //Timer Container
        const containerDiv = document.createElement('div');
        containerDiv.id = 'timerContainer';
        containerDiv.classList.add('container');

        //Buttons Container
        const buttonsDiv = document.createElement('div');
        buttonsDiv.id = 'timerButtons'

        //Pomodoro Button
        const pomodoroButton = document.createElement('button');
        pomodoroButton.type = 'button';
        pomodoroButton.id = 'pomodoroButton';
        pomodoroButton.classList.add('timerMenuButton');
        pomodoroButton.dataset.duration = '1500';
        pomodoroButton.textContent = 'Pomodoro';

        //Short break button
        const shortBreakButton = document.createElement('button');
        shortBreakButton.type = 'button';
        shortBreakButton.id = 'shortBreakButton';
        shortBreakButton.classList.add('timerMenuButton');;
        shortBreakButton.dataset.duration = '300';
        shortBreakButton.textContent = 'Short Break';

        //Long break Button

        const longBreakButton = document.createElement('button');
        longBreakButton.type = 'button';
        longBreakButton.id = 'longBreakButton';
        longBreakButton.classList.add('timerMenuButton');
        longBreakButton.dataset.duration = '900';
        longBreakButton.textContent = 'Long Break';


        buttonsDiv.appendChild(pomodoroButton)
        buttonsDiv.appendChild(shortBreakButton)
        buttonsDiv.appendChild(longBreakButton)

        //Timer div

        const timerDiv = document.createElement('div');
        timerDiv.id = 'timerDiv';
        const timer = document.createElement('code');
        timer.id = 'timerDisplay'
        timer.textContent = '25:00'

        timerDiv.appendChild(timer)

        //Start Button

        const startButton = document.createElement('button');
        startButton.id = 'startButton'
        startButton.textContent = 'START'
        startButton.addEventListener('click', this.startTimerHandler.bind(this))

        containerDiv.appendChild(buttonsDiv);
        containerDiv.appendChild(timerDiv);
        containerDiv.appendChild(startButton);

        document.getElementById('timer').appendChild(containerDiv)

        const buttons = document.querySelectorAll('.timerMenuButton');
        buttons.forEach(button => button.addEventListener('click', this.timerButtonsHandler.bind(this)))

    }
}

export { timer }