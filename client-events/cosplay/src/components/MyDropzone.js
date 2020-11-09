import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const MyDropzone = ({ filesCount, title, setFile }) => {
  //const [dataUrl, setDataUrl] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
    console.log("rejectedFiles", rejectedFiles);

    if (acceptedFiles.length > 0) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // const mainFile = acceptedFiles[0];
      // if (mainFile.size < 2000000) {
      //   const reader = new FileReader();
      //   //setError(null);
      //   setFile(acceptedFiles[0]);
      //   reader.onload = () => {
      //     // Do whatever you want with the file contents
      //     const urlStr = reader.result;
      //     //console.log(urlStr);
      //     setDataUrl(urlStr);
      //   };
      //   reader.readAsDataURL(acceptedFiles[0]);
    } else {
      // setError("請將檔案大小控制在 2mb 以內");
    }
  }, []);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  return (
    <>
      <div {...getRootProps()} style={{ opacity: "50%" }}>
        <input
          {...getInputProps()}
          multiple={filesCount === 1 ? false : true}
          accept=" image/jpeg, image/png"
        />

        {isDragActive ? (
          <p></p>
        ) : (
          <ul>
            <li>
              <p>
                上傳{title}
                <br />
                （jpg、jpeg、png）
                <br />
                最多上傳{filesCount}張
              </p>
            </li>
          </ul>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
};

export default MyDropzone;
