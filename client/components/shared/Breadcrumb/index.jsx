import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

export default function Breadcrumb({ breadcrumb }) {
    const router = useRouter();
    return (
        <ul className={styles.breadcrumb}>
            {breadcrumb &&
                breadcrumb.map(({ title, path }) => (
                    <li key={path}>
                        <Link
                            href={path}
                            className={
                                router.pathname === path
                                    ? "text-inherit font-bold uppercase"
                                    : "text-inherit uppercase"
                            }
                        >
                            {title}
                        </Link>
                    </li>
                ))}
        </ul>
    );
}
