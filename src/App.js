import React, { useRef, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "./blink.json";

function App() {
  const ref = useRef(null);
  const [files, setFiles] = useState("");
  const [coord, setcoord] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(JSON.parse(e.target.result));
    };
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(files)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  console.log("data", files);

  function FindPosition(oElement) {
    if (typeof oElement.offsetParent != "undefined") {
      for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [posX, posY];
    } else {
      return [oElement.x, oElement.y];
    }
  }

  function GetCoordinates(e) {
    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = FindPosition(ref.current);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      PosX = e.pageX;
      PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
      PosX =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      PosY =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    setcoord({ x: PosX, y: PosY });
  }

  // helper function to get an element's exact position
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      {files === "" ? (
        <>
          <h1>Upload Json file - Example</h1>
          <input type="file" onChange={handleChange} />
        </>
      ) : (
        <>
          <button type="button" onClick={exportData}>
            Export Data
          </button>
          {JSON.stringify(files)}
        </>
      )}
      <br />
      <br />
      <label>Color</label>
      <input
        value={files.color}
        onChange={(e) => setFiles({ ...files, color: e.target.value })}
      />
      <br />
      <br />
      <label>Number</label>
      <input
        value={files.number}
        onChange={(e) => setFiles({ ...files, number: e.target.value })}
      />
      <br />
      <br />
      <div style={{ marginLeft: "100px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: `${coord.x}px`,
            top: `${coord.y}px`
          }}
        >
          <Lottie options={defaultOptions} height={20} width={20} />
        </div>
        <img
          onMouseDown={GetCoordinates}
          ref={ref}
          width={300}
          height={300}
          src={
            "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
          }
        />
      </div>
      <br />
      coordinates - {coord.x} {coord.y}
      <br />
    </>
  );
}

export default App;
