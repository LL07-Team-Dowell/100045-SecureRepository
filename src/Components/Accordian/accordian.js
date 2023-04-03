import React, { useState } from "react";
import "./accordian.css";

export function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleToggle}>
        <span>
          {isOpen ? (
            <i className="fa-solid fa-caret-down"></i>
          ) : (
            <i className="fa-solid fa-caret-right"></i>
          )}
        </span>
        <h3>{title}</h3>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}
