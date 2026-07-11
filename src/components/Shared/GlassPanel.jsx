import "./GlassPanel.css";

function GlassPanel({ children, className = "" }) {
  return <div className={`glass-panel glass ${className}`}>{children}</div>;
}

export default GlassPanel;
