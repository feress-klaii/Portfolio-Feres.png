import "./ChromeChain.css";

/**
 * A short chain of chrome-material links, vertical or horizontal.
 * Each link sways with a staggered delay for a loose, hanging feel.
 */
function ChromeChain({ links = 5, size = 26, top = "30%", left = "85%", vertical = true }) {
  return (
    <div className={`chrome-chain ${vertical ? "vertical" : "horizontal"}`} style={{ top, left }}>
      {Array.from({ length: links }).map((_, i) => (
        <span
          key={i}
          className="chrome-link chrome"
          style={{ width: size, height: size, animationDelay: `${i * 0.15}s` }}
        ></span>
      ))}
    </div>
  );
}

export default ChromeChain;