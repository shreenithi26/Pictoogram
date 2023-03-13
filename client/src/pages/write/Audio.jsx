import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import "./Audio.css";

const Audio = ({ setAudio }) => {
  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    try {
      const file = new File([blob], "audio", { type: blob.type });
      const data = new FormData();
      data.append("my_file", file);

      console.log(file);
      console.log(data);

      await axios
        .post("http://localhost:5000/uploadAudio", data)
        .then((res) => {
          console.log("Audio Succesfully uploaded. The url is : ", res.data);
          setAudio(res.data);
        });
    } catch (err) {
      console.log(err);
      console.log("Failed to upload the audio");
    }
  };

  return (
    <div className="audiodiv">
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        classes={{
          AudioRecorderClass: "audio",
          AudioRecorderDiscardClass: "",
          AudioRecorderPauseResumeClass: "",
          AudioRecorderStartSaveClass: "",
          AudioRecorderStatusClass: "",
          AudioRecorderTimerClass: "",
        }}
      />
      <button className="rec" onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  );
};

export default Audio;
