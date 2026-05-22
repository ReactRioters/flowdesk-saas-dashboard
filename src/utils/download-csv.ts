function escapeCSVValue(value: string | number) {
    const stringValue = String(value);

    if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

export type CSVColumn<Row extends Record<string, string | number> = Record<string, string | number>> = {
    key: keyof Row;
    label: string;
};

export function downloadCSV<Row extends Record<string, string | number>>(
    filename: string,
    rows: Row[],
    columns?: CSVColumn<Row>[]
) {
    if (!rows.length) return;

    const headers = columns
        ? columns.map((column) => column.label)
        : Object.keys(rows[0]);

    const csvContent = [
        headers.map(escapeCSVValue).join(","),
        ...rows.map((row) => {
            const values = columns
                ? columns.map((column) => escapeCSVValue(row[column.key]))
                : Object.keys(row).map((key) => escapeCSVValue(row[key]));

            return values.join(",");
        }),
    ].join("\n");

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}