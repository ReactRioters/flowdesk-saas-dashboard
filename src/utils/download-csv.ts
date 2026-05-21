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

export function downloadCSV(
    filename: string,
    rows: Record<string, string | number>[]
) {
    if (!rows.length) return;

    const headers = Object.keys(rows[0]);

    const csvContent = [
        headers.map(escapeCSVValue).join(","),
        ...rows.map((row) =>
            headers.map((header) => escapeCSVValue(row[header])).join(",")
        ),
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