$(function() {
    /**
     * This handles the minimized indicator logic. When the indicator is pressed
     * the chat window will popout.
     */
    $('#irc-minimized-indicator').on('click', ()=>{
        // TODO: handle opening and un minimize logic
        anime({
            targets: '#IRC',
            translateX: 0,
            translateY: 0,
            opacity: ['0%', '100%'],
            scale: [0.1, 1],
            easing: 'easeInOutQuad',
            duration: 500,
            before: (anim) => {
                $('#IRC').show();
            }
        });
    });
    /**
     * This handles the close button logic. Once this button is pressed,
     * the window will close (in the future, this should also handle the
     * logic that disconnects the client from the IRC server).
     */
    $('#close-button').on('click', ()=>{
        // TODO: Handle closing logic
        anime({
            targets: '#IRC',
            opacity: ['100%', '0%'],
            scale: [1, 0.1],
            easing: 'easeInOutQuad',
            duration: 500,
            complete: (anim) => {
                $('#IRC').hide();
            }
        })
    });
    /**
     * This handles the popout button logic. Once this button is pressed,
     * the window will close and another chrome window (actual popout)
     * will open. This was not implemented due to time constraints
     */
    $('#pop-out-button').on('click', ()=>{
        // TODO: Handle pop out logic
    });
    /**
     * This handles the minimize button logic. Once this button is pressed,
     * the window will be minimized (meaning, the window won't be visible
     * but the client is still connected to the chat)
     */
    $('#minimize-button').on('click', ()=>{
        // TODO: Handle minimize logic
        anime({
            targets: '#IRC',
            translateX: `${window.innerWidth/2 - (parseInt($('#IRC').css('left').replace(/px$/, "")) + parseInt($('#IRC').css('width').replace(/px$/, "")) / 2)}px`,
            translateY: `${window.innerHeight - parseInt($('#IRC').css('top').replace(/px$/, ""))}px`,
            opacity: ['100%', '0%'],
            scale: [1, 0.1],
            easing: 'easeInOutQuad',
            duration: 500,
            complete: (anim) => {
                $('#IRC').hide();
            }
        });
    });
    // This makes the window draggable and resizable
    $('#IRC').draggable().resizable();

    /**
     * This makes the chatbox scroll to the bottom when a new message is received
     */
    var observer = new MutationObserver(observerCallback);
    var observerConfig = {attributes: false, childList: true, subtree: false};
    observer.observe(document.querySelector('#irc-chatbox'), observerConfig);

    /**
     * This starts the background animation for the website
     */
    try {
        var canvasDusts = new canvasDust('#canvas-dust');
    }
    catch (e) {
        console.error(e);
    }

    /**
     * This adds messages to the chatbox every 3 seconds
     */
    var interval = setInterval(()=>appendMessage("127.0.0.1", "PRIVMSG", "test-user", makeRandomCharString(Math.floor(Math.random() * (100 - 20) + 20))), 3000)
})

/**
 * This handles the addition of a new message to the chatbox,
 * this includes (styling, animating, etc.)
 * @param {IpAddress} _host 
 * @param {IrcCommand} _command 
 * @param {String} _nick 
 * @param {String} _message 
 */
function appendMessage(_host, _command, _nick, _message) {
    let message = document.createElement("p");
    let host = document.createElement("span");
    let command = document.createElement("span");
    let param = document.createElement("span");
    let nick = document.createElement("span");

    message.classList += "irc-message";
    host.classList += "irc-host";
    command.classList += "irc-command";
    param.classList += "irc-param";
    nick.classList += "irc-nick";

    host.innerText = _host;
    command.innerText = _command;
    param.innerText = _message;
    nick.innerText = _nick;

    message.appendChild(host);
    message.appendChild(command);
    message.appendChild(nick);
    message.appendChild(param);

    message.style.opacity = 0;
    $('#irc-chatbox').append(message);
    anime({
        targets: message,
        width: ['0%', '100%'],
        opacity: ['0%', '100%'],
        easing: 'easeInOutQuad',
        backgroundColor: {
            value: ['#FE2', 'rgba(0, 0, 0, 0)'],
            delay: 300
        },
        duration: 300
    });
}

/**
 * This is the callback that gets called when a new message is added
 * to the chatbox. This makes the chatbox scroll to the bottom.
 * @param {MutationRecord} mutationList 
 * @param {MutationObserver} observer 
 */
function observerCallback(mutationList, observer) {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            mutation.target.scrollTop = mutation.target.scrollHeight;
        }
    }
}

/**
 * This generates a random string of specified length.
 * @param {Int} length 
 * @returns {String} random character string
 */
function makeRandomCharString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

/**
 * Dust particle for the background canvas
 */
class dust {
    constructor(x = 50, y = 50) {
        this.vx = Math.random() * 1 + 1;
        this.vy = Math.random() * 1 + 0.01;
        this.shadowBlur = Math.random() * 3;
        this.shadowX = (Math.random() * 2) - 1;
        this.shadowY = (Math.random() * 2) - 1;
        this.radiusX = Math.random() * 1.5 + 0.5;
        this.radiusY = this.radiusX * (Math.random() * (1.3 - 0.3) + 0.3);
        this.rotation = Math.PI * Math.floor(Math.random() * 2);
        this.x = x;
        this.y = y;
    }
}
/**
 * Class that handles the dust animation of the website.
 */
class canvasDust {
    constructor(canvasID) {
        this.color = '#fff';
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        this.inStop = false;
        this.build = () => {
            this.resize();
            if (this.ctx) {
                const point = canvasDust.getPoint(this.dustQuantity);
                for (let i of point) {
                    const dustObj = new dust(i[0], i[1]);
                    this.buildDust(dustObj);
                    this.dustArr.push(dustObj);
                }
                requestAnimationFrame(this.paint);
            }
        };
        /**
         * This is the draw callback, this is where we draw to the screen
         * the particles we calculated.
         */
        this.paint = () => {
            if (this.inStop) {
                return;
            }
            const dustArr = this.dustArr;
            for (let i of dustArr) {
                this.ctx.clearRect(i.x - 6, i.y - 6, 12, 12);
                if (i.x < -5 || i.y < -5) {
                    const x = this.width;
                    const y = Math.floor(Math.random() * window.innerHeight);
                    i.x = x;
                    i.y = y;
                }
                else {
                    i.x -= i.vx;
                    i.y -= i.vy;
                }
            }
            for (let i of dustArr) {
                this.buildDust(i);
            }
            requestAnimationFrame(this.paint);
        };
        /**
         * This handles the drawing of a single dust particle.
         * @param {dust} dust 
         */
        this.buildDust = (dust) => {
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.shadowBlur = dust.shadowBlur;
            ctx.shadowOffsetX = dust.shadowX;
            ctx.shadowOffsetY = dust.shadowY;
            ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };
        /**
         * This is the resize callback, this is where we handle the
         * resizing of the window (chrome window).
         */
        this.resize = () => {
            const canvas = this.canvas;
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.width = width;
            this.height = height;
            this.dustQuantity = Math.floor((width + height) / 38);
            canvas.width = width;
            canvas.height = height;
            this.ctx.shadowColor =
                this.ctx.fillStyle = this.color;
        };
        /**
         * Stop function, call this to stop the animation.
         */
        this.stop = () => {
            this.inStop = true;
        };
        /**
         * Play function, call this to start the animation.
         */
        this.play = () => {
            if (this.inStop === true) {
                this.inStop = false;
                requestAnimationFrame(this.paint);
            }
        };
        const canvas = $(canvasID)[0];
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.build();
        window.addEventListener('resize', this.resize);
    }
}
/**
 * Generates an array of points in the window's bounds.
 * @param {Int} number number of points we want
 * @returns {Array<Array<Int>>} the points we generated
 */
canvasDust.getPoint = (number = 1) => {
    let point = [];
    for (let i = 0; i < number; ++i) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        point.push([x, y]);
    }
    return point;
};