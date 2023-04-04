import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

export default function Breadcrumb({ breadcrumb }) {
    return (
        <ul className={styles.breadcrumb}>
            {breadcrumb &&
                breadcrumb.map(({ title, path }) => (
                    <li key={path}>
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-inherit font-bold uppercase"
                                    : "text-inherit uppercase"
                            }
                        >
                            {title}
                        </NavLink>
                    </li>
                ))}
        </ul>
    );
}
