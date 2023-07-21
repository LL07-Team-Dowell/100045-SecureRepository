import React from "react";
import "./popup.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopy = () => {
    // Implement any visual feedback here, such as showing a success message
    console.log("Text copied:", props.children);
    setIsCopied(true);
  };

  const extractTextFromChildren = (children) => {
    if (typeof children === "string") {
      return children; // Return plain text
    } else if (Array.isArray(children)) {
      return children.map((child) => extractTextFromChildren(child)).join(""); // Concatenate text from child components
    } else if (React.isValidElement(children) && children.props.children) {
      return extractTextFromChildren(children.props.children); // Extract text from nested child components
    }
    return ""; // Return empty string if no text found
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.form && <h2>webHookLink: </h2>}
        <CopyToClipboard
          text={extractTextFromChildren(props.children)}
          onCopy={handleCopy}
        >
          {props.copy ? <button className="copy-btn">{isCopied ? "Copied" : "Copy"}</button>:<p></p>}
        </CopyToClipboard>
        <button
          className="close-btn"
          onClick={() => {
            props.setTrigger(false);
            setIsCopied(false);
          }}
        >
         < CloseIcon/>
        </button>
        <div>{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

// props.trigger shows the trigger
