'use client'
import * as React from "react";
import { ReactGrid, Highlight, Column, Row } from "@silevis/reactgrid";
import "./styling.scss";
import '@silevis/reactgrid/styles.css'
export const HighlightsSample = () => {
    const [columns] = React.useState<Column[]>(() => [
        { columnId: "Name", width: 100 },
        { columnId: "Surname", width: 100 }
    ]);
    const [rows] = React.useState<Row[]>(() => [
        {
            rowId: 0,
            cells: [
                { type: "header", text: "Name" },
                { type: "header", text: "Surname" }
            ]
        },
        {
            rowId: 1,
            cells: [
                { type: "text", text: "Thomas" },
                { type: "text", text: "Goldman" }
            ]
        },
        {
            rowId: 2,
            cells: [
                { type: "text", text: "Susie" },
                { type: "text", text: "Spencer" }
            ]
        },
        {
            rowId: 3,
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]);


    const highlights: Highlight[] = [
        { columnId: "Name", rowId: 1, borderColor: "#00ff00" },
        { columnId: "Surname", rowId: 2, borderColor: "#0000ff" },
        { columnId: "Name", rowId: 3, borderColor: "#ff0000" }
    ];

    return (
        <ReactGrid
            rows={rows}
            columns={columns}
            highlights={highlights}
        />
    );
}