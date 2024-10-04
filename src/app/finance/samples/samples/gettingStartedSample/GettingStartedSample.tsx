'use client'
import { useEffect, useState } from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { PiPlus } from "react-icons/pi";
import './styling.scss';

const getPeople = (): any => [
    { name: "Thomas" },
    { name: "Susie" },
    { name: "", }
];

const getColumns = (): Column[] => [
    { columnId: "name", width: 384 },
];

const headerRow: Row = {
    rowId: "header",
    height: 40,
    cells: [
        { type: "header", text: "Name" },
    ]
};

const getRows = (people: any): Row[] => [
    // headerRow,
    {
        rowId: 1,
        height: 40,
        cells: [
            { type: "text", text: '' },
        ]
    },
    ...people?.map((person: { name: any; surname: any; }, idx: any) => ({
        rowId: idx + 1,
        height: 40,
        cells: [
            { type: "text", text: person.name },
        ]
    }))
];

const applyChangesToPeople = (
    changes: any,
    prevPeople: any
): any => {
    changes.forEach((change: any) => {
        if (change.newCell.type === 'text') {
            const personIndex = change.rowId;
            const fieldName = change.columnId;
            prevPeople[personIndex][fieldName] = change.newCell.text;
        }
    });
    return [...prevPeople];
};




const GettingStartedSample = ({ listRows }: any) => {
    const [people, setPeople] = useState<any>(listRows || []);

    const rows = getRows(people);
    const columns = getColumns();

    const handleChanges = (changes: any) => {
        setPeople((prevPeople: any) => applyChangesToPeople(changes, prevPeople));
    };

    const addRow = () => {
        const newPeople = [...people];
        newPeople.push({ name: "", surname: "" });
        setPeople(newPeople);
    }


    return (
        <div id="reactgrid-primary">
            <ReactGrid
                rows={rows}
                columns={columns}
                onCellsChanged={handleChanges}

            />
            <div className='flex justify-start w-[120px] mt-4 items-center cursor-pointer'>
                <PiPlus className='h-6 w-6 text-[#335015]' onClick={addRow} />
                <div
                    onClick={addRow}
                    className="text-[#335015] ml-2 font-medium"
                >Add Item</div>
            </div>
        </div>
    );

}


export default GettingStartedSample;