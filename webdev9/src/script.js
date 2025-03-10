// DOM ELEMENTS
const triggerBtn = document.querySelector("[data-trigger]");
const audioUpload = document.getElementById("audioUpload");

// STATE
let audioURL = "https://audio.jukehost.co.uk/ZCxhbJO3JVpTiyJxpn2dzUaVm2CIzrpv";

document.addEventListener("DOMContentLoaded", (e) => {

	//// Marcin's thumbnail hack 🙏
	if (navigator.userAgent.includes("Headless")) {
		document.body.style.setProperty("padding-block-end", "0");
		document.body.style.setProperty("margin-block-start", "152px");
		document.body.style.setProperty("min-block-size", "0");
		document.body.style.setProperty("block-size", "calc(100vh - 304px)");
		document.body.style.setProperty("position", "relative");
		document.style.setProperty("--default-trans-dur", "0");

	}

//DATA - Would put in a seperate file but since this is a challenge and people may not know where to look for the url...left them here. sorry its a lot theyre variables they have to be at the top before we can use them

	// waveform initial config
	const options = {
		/** HTML element or CSS selector (required) */
		container: "#waveform",
		/** Audio URL */
		url: audioURL,
		/** The color of the waveform */
		waveColor: "oklch(78% 0.2 352)",
		/** The color of the progress mask */
		progressColor: "oklch(65% 0.26 357)",
		/** The color of the playpack cursor */
		cursorColor: "#fd4391",
		/** The cursor width */
		cursorWidth: 2,
		/** The height of the waveform in pixels */
		height: 100,
		barWidth: NaN,
		/** A vertical scaling factor for the waveform */
		barHeight: NaN,
		/** Spacing between bars in pixels */
		barGap: NaN,
		/** Rounded borders for bars */
		barRadius: NaN,
		/** Minimum pixels per second of audio (i.e. zoom level) */
		minPxPerSec: 1,
		/** Stretch the waveform to fill the container, true by default */
		fillParent: true,
		/** Pass false to disable clicks on the waveform */
		interact: true,
		/** Allow to drag the cursor to seek to a new position */
		dragToSeek: true,
		/** Hide the scrollbar */
		hideScrollbar: false,
		/** Automatically scroll the container to keep the current position in viewport */
		autoScroll: true,
		/** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
		sampleRate: 8000
	};
	// Generate a form input for each option
	const formOptions = {
		
		waveColor: "#ff79c5",
		progressColor: "#fd1291",
		cursorColor: "#fd4391",
		url: audioURL,
		cursorWidth: 2,
		barWidth: NaN,
		barHeight: NaN,
		barGap: NaN,
		barRadius: NaN,
		height: 100,
		audioRate: 1,
		/** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
		sampleRate: 8000,
	};
	// set values for form inputs
	const schema = {
		height: {
			value: 100,
			min: 80,
			max: 512,
			step: 1
		},
		cursorWidth: {
			value: 1,
			min: 0,
			max: 4,
			step: 1
		},
		barWidth: {
			value: 0,
			min: 1,
			max: 12,
			step: 1
		},
		barHeight: {
			value: 1,
			min: 0.1,
			max: 4,
			step: 0.1
		},
		barGap: {
			value: 0,
			min: 1,
			max: 12,
			step: 1
		},
		barRadius: {
			value: 15,
			min: 1,
			max: 30,
			step: 1
		},
		audioRate: {
			value: 1,
			min: 0.1,
			max: 4,
			step: 0.1
		},
		sampleRate: {
			value: 8000,
			min: 8000,
			max: 48000,
			step: 1000
		}
	};

	// create/render waveform and form inputs
	const wavesurfer = WaveSurfer.create(options);
	createForm(wavesurfer, formOptions, schema);

// EVENT LISTENERS
	//remove placeholder image
	/** When visible waveform is drawn */
	wavesurfer.on('redrawcomplete', () => {
		document.querySelector('#waveform #placeholder').remove();
	})
	
	// play and pause functionality
	triggerBtn.addEventListener("click", () => wavesurfer.playPause());
	
	// toggle from play/pause icon/text
	wavesurfer.on("play", () => toggleButton(false));
	wavesurfer.on("pause", toggleButton);

	// Handle file upload
	audioUpload.addEventListener("change", (e) => {
		const file = e.target.files[0];
		if (file) {
			audioURL = URL.createObjectURL(file);
			wavesurfer.load(audioURL);
			wavesurfer.seekTo(0);
		} else {
			console.error("No file selected");
		}
		// close file upload
	});

	//   close DOMContentLoaded
});

// HELPER FUNCTIONS
	function toggleButton(play = true) {
		const state = play ? "play" : "pause";
		triggerBtn.querySelector("svg use").setAttribute("href", `#icon-${state}`);
		triggerBtn.querySelector("span").textContent = state;
		triggerBtn.setAttribute("aria-label", state);
	}

	// create form with user toggles
	function createForm(wavesurfer, formOptions, schema) {
		const form = document.createElement("form");
		form.classList.add("form-wave_options");
		document.querySelector(".wrapper").appendChild(form);

		for (const key in formOptions) {
			if (formOptions[key] === undefined) continue;
			const isColor = key.includes("Color");

			const label = document.createElement("label");
			Object.assign(label.style, {
				gridArea: key
			});

			const span = document.createElement("span");
			Object.assign(span.style, {
				textTransform: "capitalize",
				lineHeight: "1"
			});
			span.textContent = `${key.replace(/[a-z0-9](?=[A-Z])/g, "$& ")}: `;
			label.appendChild(span);

			const input = document.createElement("input");
			const type = typeof formOptions[key];
			Object.assign(input, {
				type: isColor
					? "color"
					: type === "number"
					? "range"
					: type === "boolean"
					? "checkbox"
					: "text",
				name: key,
				value: formOptions[key],
				checked: formOptions[key] === true
			});
			if (input.type === "text") {
				input.addEventListener("input", (e) => {
					e.preventDefault();
				});
				input.style.flex = 1;
			}

			if (formOptions[key] instanceof HTMLElement) input.disabled = true;

			if (schema[key]) {
				Object.assign(input, schema[key]);
			}

			label.appendChild(input);
			form.appendChild(label);
			initializeInputValue(input);

			input.oninput = (e) => {
				if (type === "number") {
					formOptions[key] = input.valueAsNumber;
					updateRangeColor(input);
				} else if (type === "boolean") {
					formOptions[key] = input.checked;
				} else if (schema[key] && schema[key].type === "json") {
					formOptions[key] = JSON.parse(input.value);
				} else {
					if (input.name === "progressColor") {
						updateAccentColor(input.value);
					}
					if (input.name === "url") {
						audioURL = input.value;
						wavesurfer.load(audioURL);
						wavesurfer.seekTo(0);
						console.log("url");
					}
					formOptions[key] = input.value;
				}
				wavesurfer.setOptions({ ...wavesurfer.options, ...formOptions });
			};
		}
	}
	// make sure the ranges and colours are set on load
	function initializeInputValue(input) {
		if (input.type === "color" && input.name === "progressColor") {
			updateAccentColor(input.value);
		} else if (
			input.type === "range" ||
			(input.type === "number" && input.getAttribute("type") === "range")
		) {
			updateRangeColor(input);
		}
	}

	function updateAccentColor(color) {
		document.documentElement.style.setProperty("--clr-accent-secondary", color);
	}

	function updateRangeColor(rangeInput) {
		const min = parseFloat(rangeInput.min);
		const max = parseFloat(rangeInput.max);
		const val = parseFloat(rangeInput.value);

		rangeInput.style.setProperty("--value", val);
		rangeInput.style.setProperty("--min", min);
		rangeInput.style.setProperty("--max", max);
	}

	// recording functionality - codepen doesnt allow access to microphone though
// let mediaRecorder;
// let audioChunks = [];
// let recordedAudioURL;

// recordButton.addEventListener("click", () => {
//     const isRecording = recordButton.dataset.record === "true";
//     toggleRecording(isRecording);
//   });

// function toggleRecording(isRecording) {
// 	const label = isRecording ? 'record' :  'recording';
// 	recordButton.dataset.record = isRecording;
// 	recordButton.querySelector('span').textContent = label;
// 	isRecording ? stopRecording() : startRecording;
// }

// function startRecording() {
//   navigator.mediaDevices
//     .getUserMedia({ audio: true })
//     .then((stream) => {
//       mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.start();
//       audioChunks = [];

//       recordingModal.style.display = "block";

//       mediaRecorder.addEventListener("dataavailable", (event) => {
//         audioChunks.push(event.data);
//       });
//     })
//     .catch((error) => {
//       console.error("Error accessing microphone:", error);
//       alert("Unable to access microphone. Please check your permissions.");
//     });
// }

// function stopRecording() {
//   if (mediaRecorder.state === "recording") {
//     mediaRecorder.stop();
//     mediaRecorder.addEventListener("stop", () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//       recordedAudioURL = URL.createObjectURL(audioBlob);
//       updateWavesurfer(recordedAudioURL);
//       recordingModal.style.display = "none";
//     });
//   }
// }

// function updateWavesurfer(audioURL) {
//   wavesurfer.load(audioURL);
// }
