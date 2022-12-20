'use strict';

function ScormListener(target, learnerData) {

        if (!window) return;
    this.learnerData = learnerData
    this.on = (event, callback) => {
        if (!this.handlers) this.handlers = {};
        this.handlers[event] = callback;
    };
    this.handlers = {
        InitializeScorm: () => {
                        if (!window) return;
            if (!this.target) {
                                return;
            }

            if (typeof this.target === 'string' || this.target instanceof String) {
                this.target = document.getElementById(this.target)
            }
            let cmi = {};
            if (!this.learnerData) {
                cmi = blank;
            } else {
                cmi = JSON.parse(this.learnerData);
            }
            cmi.completion_status = "incomplete";
            cmi.exit = "";
            
            this.target.contentWindow.postMessage({method: "InitScorm", cmi: cmi}, "https://dam.parenttv.com");
        }
    };

    this.target = target;
    this.handleSetValueTriggers = (data) => {
        const method = capitalizeFirstLetter(data.param[1]);
        if (!this.handlers || !this.handlers[method]) {
            return;
        }
        this.handlers[method](data);
    }

    window.addEventListener("message", (event) => {
                if (event.origin === "https://dam.parenttv.com") {
                        if (!this.handlers || !this.handlers[event.data.method]) {
                return;
            }

            this.handlers[event.data.method](event.data);
            if (event.data.method === "SetValue") {
                this.handleSetValueTriggers(event.data);
            }
        }
    }, false);
}

const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('');

const firstTime = {
    "completion_status": "incomplete",
    "suspend_data": "",
    "launch_data": null,
    "comments": "",
    "comments_from_lms": "",
    "objectives": {
        "_children": 0,
        "_count": 0
    },
    "student_data": {
        "_children": null,
        "mastery_score": 0,
        "max_time_allowed": 0,
        "time_limit_action": 0
    },
    "student_preference": {
        "_children": "",
        "audio": "",
        "language": "",
        "speed": "",
        "text": ""
    },
    "interactions": {
        "_children": "",
        "_count": ""
    },
    "location": "",
    "entry": ""
};


const blank = {
    _version: "1",
    comments_from_learner: {
        _children: [],
        _count: 0
    },
    comments_from_lms: {
        _children: [],
        _count: 0
    },
    completion_status: "not attempted",
    completion_threshold: 1,
    credit: "no-credit",
    entry: "ab_initio",
    exit: "",
    interactions: {
        _children: [],
        _count: 0
    },
    launch_data: "",
    learner_id: "",
    learner_name: "",
    learner_preference: {
        _children: [],
        audio_level: 1,
        language: "",
        delivery_speed: 1,
        audio_captioning: 0
    },
    location: "",
    max_time_allowed: "",
    mode: "normal",
    objectives: {
        _children: [],
        _count: 0
    },
    progress_measure: 0,
    scaled_passing_score: 0,
    score: {
        _children: [],
        scaled: 0,
        raw: 0,
        min: 0,
        max: 0
    },
    session_time: 0,
    success_status: "unknown",
    suspend_data: "",
    time_limit_action: "continue,no message",
    total_time: 0
};
