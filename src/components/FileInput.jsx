import { useEffect, useRef, useState } from "react";
import "./FileInput.css";
import useTranslate from "../hooks/useTranslate";
function FileInput({ name, value, initialPreview, onChange }) {
  const t = useTranslate();
  const [preview, setPreview] = useState(initialPreview);
  const ref = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const nextImage = e.target.files[0];
    onChange(name, nextImage);
    setSelectedFile(nextImage);
  };

  const handleClearClick = () => {
    const inputNode = ref.current;
    if (!inputNode) {
      return;
    } else {
      inputNode.value = "";
      onChange(name, null);
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    ref.current.click();
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div>
      {(initialPreview || value) && (
        <div>
          <img src={preview} alt="image preview" width={400} />
        </div>
      )}
      <div className="file-input">
        <button onClick={handleButtonClick}>{t("choose-file button")}</button>
        <input id="file" type="file" onChange={handleChange} ref={ref} />
        {selectedFile && <p>{selectedFile.name}</p>}
        {value && (
          <button type="button" onClick={handleClearClick}>
            X
          </button>
        )}
      </div>
    </div>
  );
}

export default FileInput;
