import React from "react";
import styles from "./styles.module.css";

export default function ToggleSwitch({ id, isActive }) {
    return (
        <React.Fragment>
            <input className={styles.reactSwitchCheckbox} id={`switch${id}`} type="checkbox" checked={isActive} />
            <label
                style={{ background: isActive ? "var(--color-primary)" : "" }}
                className={styles.reactSwitchLabel}
                htmlFor={`switch${id}`}
            >
                <span className={styles.reactSwitchButton} />
            </label>
        </React.Fragment>
    );
}
