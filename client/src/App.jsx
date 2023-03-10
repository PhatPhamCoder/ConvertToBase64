import { useState } from "react";
import "./App.css";
import avatar from "./assets/profile.png";
import axios from "axios";

// Function convert Img to base64
function convertToBase64(file) {
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
}

function App() {
  const [postImg, setPostImg] = useState({ myFile: "" });

  const url = "http://localhost:8080/uploads"; //Link post Code base64 to Server and save on Database

  // Post file to server
  const createPost = async (newImg) => {
    try {
      await axios.post(url, newImg);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit button send file to server
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImg);
    console.log(postImg);
  };

  // Listen Change when upload file
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; //Get File from local
    const base64 = await convertToBase64(file); //Convert File to base64
    setPostImg({ ...postImg, myFile: base64 });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImg.myFile || avatar} alt="" />
        </label>
        <input
          type="file"
          label="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        <h3>Doris Wilder</h3>
        <span>Designer</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
