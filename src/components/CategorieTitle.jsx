import { Children } from "react";
import styles from "./CategorieTitle.module.css";

export default function CategorieTitle({ Children }) {
  return (
    <div className={styles.head}>
      <div>
        <h3>{Children}</h3>
      </div>
    </div>
  );
}
