import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>Terms Of Use</li>
        <li>Privacy-Policy</li>
        <li>About</li>
        <li>Blog</li>
        <li>FAQ</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </footer>
  );
}

export default Footer;
