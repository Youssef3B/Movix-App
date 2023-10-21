import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div>
      <img className={styles.logo} src="/logo.svg" alt="logo"></img>
    </div>
  );
}
