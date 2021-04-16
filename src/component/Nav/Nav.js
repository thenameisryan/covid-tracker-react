import React from "react";
import { Link } from "react-router-dom";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navLinks}>
        <Link to="/">
          <li>World</li>
        </Link>
        <Link to="/country">
          <li>Country</li>
        </Link>
      </ul>
    </nav>
  );
}
