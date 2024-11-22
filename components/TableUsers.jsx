import React, { useState, useMemo } from "react";
import styles from "@/styles/table.module.css";

export function TableUsers({ dataUsers }) {
    let direction = "asc";
    const conf = ["id", "name", "username", "email", "street", "suite", "city"];
    const [sort, setSort] = useState({ key: null, direction: "asc" });

    const handleSort = (key) => {
        if (sort.key == key && sort.direction == "asc") {
            direction = "desc";
        }
        setSort({ key, direction });
    };

    // Подобного рода сортировки лучше заворачивать в useMemo?
    // 
    //  const sorted = useMemo(() => {........}, [sort]);
    //
    //  в очередной раз)) не вижу особого смысла в таком подходе, напишите в комментарии был ли useMemo тут полезен
    //  или как если рассуждать если будет какой то большой обьем данных в большом проекте то да а тут как тренировка особо и не заметно
    //  но кто в большом проекте будет запрос сразу на 1000 или 10000 записей из БД делать))

    const sorted = dataUsers.sort((a, b) => {
        const
            A = a[sort.key],
            B = b[sort.key];

        if (typeof A == "string" && typeof B == "string") {
            return sort.direction == "asc" ? A.localeCompare(B) : B.localeCompare(A);
        }

        if (typeof A == "number" && typeof B == "number") {
            return sort.direction == "asc" ? B - A : A - B;
        }
    });

    return (
        <>
            <table className={styles.userTable}>
                <thead className={styles.theadTable}>
                    <tr>
                        {conf.map((title, index) => (
                            <td
                                key={index}
                                onClick={() => handleSort(title)}
                                className={styles.sortableColumn}
                            >
                                {title}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(
                        ({ id, name, username, email, address: { street, suite, city } }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{street}</td>
                                <td>{suite}</td>
                                <td>{city}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    );
}
