const synth = window.speechSynthesis;
const voiceName = "Google Bahasa Indonesia";
let voice;

function setButtonDisabled(disabled) {
    document.getElementById("btnChangeImage").disabled = disabled;
    document.getElementById("btnReadCaption").disabled = disabled;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

(function () {
    synth.onvoiceschanged = () => {
        // get voices
        const voices = synth.getVoices();
        let found = false;
        // find targetted voice
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === voiceName) {
                voice = voices[i];
                found = true;
                break
            }
        }
        if (!found) {
            alert(`Voice ${voiceName} is not found on the system`);
            return
        }
        // enable buttons
        setButtonDisabled(false);
    }
})()

var app = new Vue({
    el: '#app',
    data: {
        currentImage: "assets/images/matahari.jpg",
        caption: [
            {
                "text": "ma",
                "active": false
            },
            {
                "text": "ta",
                "active": false
            },
            {
                "text": "ha",
                "active": false
            },
            {
                "text": "ri",
                "active": false
            },
        ],
        data: [
            {
                "image": "assets/images/api.jpg",
                "caption": ["a", "pi"]
            },
            {
                "image": "assets/images/baju.jpg",
                "caption": ["ba", "ju"]
            },
            {
                "image": "assets/images/baso.jpg",
                "caption": ["ba", "so"]
            },
            {
                "image": "assets/images/buku.jpg",
                "caption": ["bu", "ku"]
            },
            {
                "image": "assets/images/kopi.jpg",
                "caption": ["ko", "pi"]
            },
            {
                "image": "assets/images/kuda.jpg",
                "caption": ["ku", "da"]
            },
            {
                "image": "assets/images/matahari.jpg",
                "caption": ["ma", "ta", "ha", "ri"]
            },
            {
                "image": "assets/images/petani.jpg",
                "caption": ["pe", "ta", "ni"]
            },
            {
                "image": "assets/images/rusa.jpg",
                "caption": ["ru", "sa"]
            },
            {
                "image": "assets/images/sapi.jpg",
                "caption": ["sa", "pi"]
            },
            {
                "image": "assets/images/susu.jpg",
                "caption": ["su", "su"]
            },
            {
                "image": "assets/images/topi.jpg",
                "caption": ["to", "pi"]
            },
        ]
    },
    methods: {
        changeImage() {
            // disable button
            setButtonDisabled(true);
            // randomize record index
            const index = getRandomInt(this.data.length);
            // prepare caption parts
            const selectedCaption = this.data[index].caption;
            const captionParts = [];
            for (i = 0; i < selectedCaption.length; i++) {
                captionParts.push({
                    "text": selectedCaption[i],
                    "active": false
                });
            }
            // set active image & caption
            this.currentImage = this.data[index].image;
            this.caption = captionParts;
            // enable button again
            setButtonDisabled(false);
        },
        async readCaption() {
            // disable button
            setButtonDisabled(true);
            // read caption part by part
            for (i = 0; i < this.caption.length; i++) {
                const part = this.caption[i];
                await this.speakString(
                    part.text,
                    function () {
                        part.active = true;
                    },
                    function () {
                        part.active = false;
                    }
                );
            }
            // enable button again
            setButtonDisabled(false);
        },
        speakString(str, onStart, onEnd) {
            return new Promise((resolve, reject) => {
                if (!str) {
                    reject(new Error("Message must not empty!"));
                    return
                }
                var utterThis = new SpeechSynthesisUtterance(str);
                utterThis.onstart = onStart;
                utterThis.onend = onEnd;
                utterThis.voice = voice;
                synth.speak(utterThis);

                resolve();
            })

        }
    },
    mounted() {
        this.changeImage();
    }
});