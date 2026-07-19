import "./SiteFooter.css";

function SiteFooter() {
  return (
    <footer className="site-footer-bar wrap">
      <span>© {new Date().getFullYear()} Feres. All rights reserved.</span>
      <span className="site-footer-bar-tag mono">Designed &amp; built with intention.</span>
    </footer>
  );
}

export default SiteFooter;
