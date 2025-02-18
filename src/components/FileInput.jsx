import { useEffect, useRef, useState } from "react";
import "./FileInput.css";
function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const ref = useRef();

  const handleChange = (e) => {
    const nextImage = e.target.files[0];
    onChange(name, nextImage);
    console.log(ref);
  };

  const handleClearClick = () => {
    const inputNode = ref.current;
    if (!inputNode) {
      return;
    } else {
      inputNode.value = "";
      onChange(name, null);
    }
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
        <input type="file" onChange={handleChange} ref={ref} />
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
