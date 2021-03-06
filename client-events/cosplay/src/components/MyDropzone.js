import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const MyDropzone = ({ filesCount, title, setFile, fileSize = 4000000 }) => {
  //const [dataUrl, setDataUrl] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setErrors(null);
      if (acceptedFiles.length > 0) {
        for (let index = 0; index < acceptedFiles.length; index++) {
          const file = acceptedFiles[index];
          //console.log("file.size", file.size);
          if (file.size > fileSize) {
            setErrors("檔案大小請控制在規定範圍");
            acceptedFiles = [];
          }
        }

        if (!errors) {
          setFile(acceptedFiles);
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }
      } else {
        setErrors("最多只能上傳" + filesCount + "個檔案");
      }
    },
    [setFile, fileSize, errors, filesCount]
  );

  const thumbs =
    files.length > 1 ? (
      files.map((file) => (
        <div className="imgs">
          <div style={{ display: "flex", minWidth: "0px", overflow: "hidden" }}>
            <img alt="upload preview" src={file.preview} />
          </div>
        </div>
      ))
    ) : files.length > 0 ? (
      <div style={{ display: "contents", boxSizing: "border-box" }}>
        <div style={{ display: "flex", minWidth: "0px", overflow: "hidden" }}>
          <img alt="upload preview" src={files[0].preview} />
        </div>
      </div>
    ) : null;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: filesCount,
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
                {errors ? <span className="text-danger">{errors}</span> : null}
              </p>
            </li>
          </ul>
        )}
      </div>

      <aside className={files.length > 1 ? "aside2" : "aside1"}>{thumbs}</aside>
    </>
  );
};

export default MyDropzone;
