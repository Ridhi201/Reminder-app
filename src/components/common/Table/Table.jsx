import styles from "./Table.module.css";

export default function Table({
  columns = [],
  children,
}) {
  return (
    <div className={styles.wrapper}>

      <table className={styles.table}>

        <thead>

          <tr>

            {columns.map((column) => (

              <th key={column}>
                {column}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
}
