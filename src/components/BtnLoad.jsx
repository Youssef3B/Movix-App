import styles from "./BtnLoad.module.css";
function BtnLoad({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      LoadMore
    </button>
  );
}

export default BtnLoad;
