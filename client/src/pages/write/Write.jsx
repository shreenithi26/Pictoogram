import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import Audio from "./Audio";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const { user } = useContext(Context);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      audio,
      desc,
    };
    if (file) {
      console.log("Image is going to be uploaded");
      try {
        const base64 = await convertBase64(file);
        await axios.post(`https://pictogram-smjb.onrender.com/upload`, { image: base64 }).then((res) => {
          newPost.photo = res.data;
          console.log("Image Succesfully uploaded. The url is : ", res.data);
        });
      } catch (err) {
        console.log(err);
        console.log("Failed to upload the image");
      }
    }

    try {
      const res = await axios.post(`https://pictogram-smjb.onrender.com/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      <div className="imgcontent">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
      </div>
      
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <p className="pleft">Click on the mic to start recording...</p>
        <Audio setAudio={setAudio}/>
        
        <p className="alink">
          Have difficulties framing sentences?
          <a href="https://app.inferkit.com/demo">
            Click here to generate text...
          </a>
        </p>
        <div className="content"></div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
