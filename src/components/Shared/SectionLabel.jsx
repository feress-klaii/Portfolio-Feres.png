import "./SectionLabel.css";

function SectionLabel({ children }) {
  return (
    <div className="section-label eyebrow">
      <span className="section-label-dot"></span>
      {children}
    </div>
  );
}

export default SectionLabel;
