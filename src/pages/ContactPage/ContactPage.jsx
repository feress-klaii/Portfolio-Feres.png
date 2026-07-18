import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useView } from "../../motion/ViewContext";
import { CONTACTS } from "../../data/contacts";
import "./ContactPage.css";

function ContactPage() {
  const { navigate } = useView();

  return (
    <div className="contact-page wrap">
      <div className="contact-top-row">
        <button className="works-back" onClick={() => navigate("landing")}>← Feres</button>
        <ThemeToggle />
      </div>

      <header className="contact-header">
        <span className="eyebrow">Say hello</span>
        <h1 className="contact-title display-lg chrome chrome-text">Get in touch</h1>
        <p className="contact-desc mono">
          Reachable through any of these — email is fastest.
        </p>
      </header>

      <ul className="contact-list">
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a className="contact-item" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className={`contact-dot dot-${c.dot}`}></span>
              <span className="contact-label display-md">{c.label}</span>
              <span className="contact-arrow">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactPage;
