import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ filename, message = "上傳檔案", setFile }) => {
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Do something with the files

      console.log("acceptedFiles", acceptedFiles);
      console.log("rejectedFiles", rejectedFiles);
      if (acceptedFiles.length > 0) {
        const mainFile = acceptedFiles[0];
        if (mainFile.size < 2000000) {
          const reader = new FileReader();
          setError(null);
          setFile(filename, acceptedFiles[0]);
          reader.onload = () => {
            // Do whatever you want with the file contents
            const urlStr = reader.result;
            //console.log(urlStr);
            setDataUrl(urlStr);
          };
          reader.readAsDataURL(acceptedFiles[0]);
        } else {
          setError("請將檔案大小控制在 2mb 以內");
        }
      }
      if (rejectedFiles.length > 0) {
        setError("請選擇格式為 jpg/png 的檔案");
      }

      // reader.onabort = () => console.log("file reading was aborted");
    },
    [filename, setFile]
  );
  //const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <Fragment>
      <div {...getRootProps()} style={{ opacity: "50%" }}>
        <input
          {...getInputProps()}
          multiple={false}
          accept=" image/jpeg, image/png"
        />
        <p>
          {message}{" "}
          <span style={{ color: "red", fontSize: "9px" }}>{error}</span>
        </p>
      </div>
      {dataUrl && <img alt="圖檔" style={{ zIndex: "-1" }} src={dataUrl} />}
    </Fragment>
  );
};

export default FileUploader;
