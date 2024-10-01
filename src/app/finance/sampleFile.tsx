'use client';

import React from 'react';
import { ReactGrid, Column, Row, CellChange, ChevronCell, CellTemplates } from '@silevis/reactgrid';
import './financeStyles.css';
import { PiArrowLeft } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { AdvancedContextMenuHandlingSample, ChevronCellSample, ColumnReorderSample, ColumnResizingSample, ColumnsAndRowsReorderSample, ContextMenuSample, CryptocurrencyMarketSample, CustomStylingSample, FlagCellTemplateSample, GettingStartedSample, GroupIdSample, HandlingChangesSample, HighlightsSample, LimitedHeightByParentSample, NotLimitedHeightByParentSample, ResizeColumnSample, SimpleContextMenuHandlingSample, StickyPanesSample, StickySample } from './samples/samples';



// export * from './stickySample/StickySample';
// export * from './resizeColumnSample/ResizeColumnSample';
// export * from './columnReorderSample/ColumnReorderSample';
// export * from './cryptocurrencyMarketSample/CryptocurrencyMarketSample';
// export * from './chevronCellSample/ChevronCellSample';
// export * from './contextMenuSample/ContextMenuSample';
// export * from './gettingStartedSample/GettingStartedSample';
// export * from './newCellTemplateSample/FlagCellTemplateSample';
// export * from './customStyling/CustomStylingSample';
// export * from './highlightsSample/HighlightsSample';
// export * from './advancedContextMenuHandling/AdvancedContextMenuHandlingSample';
// export * from './simpleContextMenuHandling/SimpleContextMenuHandlingSample';
// export * from './stickyPanesSample/StickyPanesSample';
// export * from './columnsAndRowsReorder/ColumnsAndRowsReorderSample';
// export * from './columnResizing/ColumnResizingSample';
// export * from './handlingChangesSample/HandlingChangesSample';
// export * from './limitedHeightByParentSample/LimitedHeightByParentSample';
// export * from './notLimitedHeightByParentSample/NotLimitedHeightByParentSample';
// export * from './groupIdSample/GroupIdSample';


// Custom Flag Cell Template
const FlagCellTemplate = {
    getCompatibleCell(cell: any) {
        return { ...cell, type: 'flag' };
    },
    render(cell: any) {
        const flag = cell.text === 'US' ? '🇺🇸' : cell.text === 'UK' ? '🇬🇧' : '🏳️';
        return <div className="flag-cell">{flag}</div>;
    },
    isFocusable: true,
};

// Custom Dropdown Number Cell Template
const DropdownNumberCellTemplate = {
    getCompatibleCell(cell: any) {
        return { ...cell, type: 'dropdownNumber', text: cell.text || 'Select a number' };
    },
    render(cell: any, onChange: any) {
        return (
            <select
                value={cell.text}
                onChange={(e) => onChange({ ...cell, text: e.target.value })}
                className="dropdown-cell"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        );
    },
    isFocusable: true,
};


const getPeople = () => [
    {
        name: "Thomas",
        surname: "Goldman",
        jan: "-",
        feb: "-",
        mar: "-",
        apr: "-",
        may: "-",
        jun: "-",
        jul: "-",
        aug: "-",
        sep: "-",
        oct: "-",
        nov: "-",
        dec: "-",
        expanded: true,
        children: [
            { name: "Child1", surname: "Goldman", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-" },
            //   { name: "Child2", surname: "Goldman", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-" }
        ]
    },
    //   { name: "Susie", surname: "Quattro", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-", expanded: false, children: [] },
    //   { name: "", surname: "", jan: "-", feb: "-", mar: "-", apr: "-", may: "-", jun: "-", jul: "-", aug: "-", sep: "-", oct: "-", nov: "-", dec: "-", expanded: false, children: [] }

];

const getColumns = () => [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 },
    { columnId: "jan", width: 100 },
    { columnId: "feb", width: 100 },
    { columnId: "mar", width: 100 },
    { columnId: "apr", width: 100 },
    { columnId: "may", width: 100 },
    { columnId: "jun", width: 100 },
    { columnId: "jul", width: 100 },
    { columnId: "aug", width: 100 },
    { columnId: "sep", width: 100 },
    { columnId: "oct", width: 100 },
    { columnId: "nov", width: 100 },
    { columnId: "dec", width: 100 }
];

const headerRow = {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" },
        { type: "header", text: "Jan" },
        { type: "header", text: "Feb" },
        { type: "header", text: "Mar" },
        { type: "header", text: "Apr" },
        { type: "header", text: "May" },
        { type: "header", text: "Jun" },
        { type: "header", text: "Jul" },
        { type: "header", text: "Aug" },
        { type: "header", text: "Sep" },
        { type: "header", text: "Oct" },
        { type: "header", text: "Nov" },
        { type: "header", text: "Dec" }
    ]
};

const getRows = (people: any) => {
    const rows: any = [headerRow];
    people.forEach((person: any, idx: any) => {
        rows.push({
            rowId: idx,
            cells: [
                { type: "text", text: person.name, isExpanded: person.expanded },
                { type: "text", text: person.surname },
                { type: "text", text: person.jan },
                { type: "text", text: person.feb },
                { type: "text", text: person.mar },
                { type: "text", text: person.apr },
                { type: "text", text: person.may },
                { type: "text", text: person.jun },
                { type: "text", text: person.jul },
                { type: "text", text: person.aug },
                { type: "text", text: person.sep },
                { type: "text", text: person.oct },
                { type: "text", text: person.nov },
                { type: "text", text: person.dec }
            ]
        });
        if (person.expanded && person.children.length > 0) {
            person.children.forEach((child: any, childIdx: any) => {
                rows.push({
                    rowId: `${idx}-${childIdx}`,
                    cells: [
                        { type: "text", text: child.name },
                        { type: "text", text: child.surname },
                        { type: "text", text: child.jan },
                        { type: "text", text: child.feb },
                        { type: "text", text: child.mar },
                        { type: "text", text: child.apr },
                        { type: "text", text: child.may },
                        { type: "text", text: child.jun },
                        { type: "text", text: child.jul },
                        { type: "text", text: child.aug },
                        { type: "text", text: child.sep },
                        { type: "text", text: child.oct },
                        { type: "text", text: child.nov },
                        { type: "text", text: child.dec }
                    ]
                });
            });
        }
    });
    return rows;
};

const applyChangesToPeople = (changes: any, prevPeople: any) => {
    changes.forEach((change: any) => {
        if (change.newCell.type === 'text') {
            const [personIndex, childIndex] = change.rowId.toString().split('-').map(Number);
            if (childIndex !== undefined) {
                prevPeople[personIndex].children[childIndex][change.columnId] = change.newCell.text;
            } else {
                prevPeople[personIndex][change.columnId] = change.newCell.text;
            }
        }
    });
    return [...prevPeople];
};

const FinancePlan = () => {
    const [people, setPeople] = React.useState(getPeople());
    const [columns] = React.useState(getColumns());

    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();

    const rows: any = getRows(people);

    const handleChanges = (changes: any) => {
        console.log(">>>>>>>>>>>>>>>", changes);
        setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
    };

    const handleContextMenu = (
        selectedRowIds: any,
        selectedColIds: any,
        selectionMode: any,
        menuOptions: any
    ) => {
        if (selectionMode === "row") {
            menuOptions = [
                ...menuOptions,
                {
                    id: "removePerson",
                    label: "Remove person",
                    handler: () => {
                        setPeople(prevPeople => {
                            return [...prevPeople.filter((person, idx) => !selectedRowIds.includes(idx))]
                        })
                    }
                }
            ];
        }
        return menuOptions;
    }

    const addRow = () => {
        setPeople(prevPeople => [...prevPeople, { name: "", surname: "", jan: "", feb: "", mar: "", apr: "", may: "", jun: "", jul: "", aug: "", sep: "", oct: "", nov: "", dec: "", expanded: false, children: [] }]);
    };

    const toggleExpand = (rowId: any) => {
        setPeople(prevPeople => {
            const newPeople = [...prevPeople];
            const person = newPeople[rowId];
            person.expanded = !person.expanded;
            return newPeople;
        });
    };


    return (
        <div className=''>
            <div className='flex items-center mb-[22px] mt-[11px]'>
                <div className='flex cursor-pointer mr-4'>
                    <PiArrowLeft className='h-6 w-6 text-primary' />
                    {/* <div className='ml-2 font-medium hover:text-primary'>Back</div> */}
                </div>
                <DateFiled
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    className={`w-[120px] ring-gray-300  h-[30px] w-[364px]`}
                    onChange={(date: any) => {
                        console.log('date>>>>>>>>>>>>>', date);
                        setStartDate(date[0]);
                        setEndDate(date[1]);
                        // if (date[1]) {
                        //     handleFilters({ key: 'scanStartDate', value: formatDateToYYYYMMDD(date[0]), isNotAPICall: true })
                        //     handleFilters({ key: 'scanEndDate', value: formatDateToYYYYMMDD(date[1]), isNotAPICall: true })
                        //     handleFilters({ key: 'skip', value: 0 })
                        // }
                    }
                    }
                    placeholderText="Date range"
                    inputProps={{
                        inputClassName: 'h-[40px] ring-gray-300'
                    }}
                    maxDate={new Date()}
                />
            </div>
            <div className='flex items-center border-b-2 border-t-2'>
                <div className='h-14 flex items-center'>
                <div>Search Variables</div>
                </div>
            </div>
            <div className='flex'>
                <Box sx={{ minWidth: 250 }}>
                    <SimpleTreeView
                        multiSelect
                        onSelectedItemsChange={(items, itemIds) => {
                            console.log('selected items changed', itemIds);
                        }}
                    >
                        <TreeItem itemId="grid" label="Data Grid">
                            <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                            <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                            {/* <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" /> */}
                        </TreeItem>
                        {/* <TreeItem itemId="pickers" label="Date and Time Pickers">
                        <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                        <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
                    </TreeItem>
                    <TreeItem itemId="charts" label="Charts">
                        <TreeItem itemId="charts-community" label="@mui/x-charts" />
                    </TreeItem>
                    <TreeItem itemId="tree-view" label="Tree View">
                        <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
                    </TreeItem> */}
                    </SimpleTreeView>
                </Box>
                <ReactGrid
                    rows={rows}
                    columns={columns}
                    onCellsChanged={handleChanges}
                    onContextMenu={handleContextMenu}
                    selectionMode="cell"
                    enableRowSelection
                    enableColumnSelection
                    enableRangeSelection
                    onCellClick={(cell: any, rowId: any) => {
                        if (cell.type === 'chevron') {
                            toggleExpand(rowId);
                        }
                    }}
                    customCellTemplates={{ flag: FlagCellTemplate, dropdownNumber: DropdownNumberCellTemplate }}
                />
            </div>

            <button onClick={addRow}>Add Row</button>

            <StickySample />
            <ResizeColumnSample />
            <ColumnReorderSample />
            <CryptocurrencyMarketSample />
            <ChevronCellSample />
            <ContextMenuSample />
            <GettingStartedSample />
            <FlagCellTemplateSample />
            <CustomStylingSample />
            <HighlightsSample />
            <AdvancedContextMenuHandlingSample />
            <SimpleContextMenuHandlingSample />
            <StickyPanesSample />
            <ColumnsAndRowsReorderSample />
            <ColumnResizingSample />
            <HandlingChangesSample />
            <LimitedHeightByParentSample />
            <NotLimitedHeightByParentSample />
            <GroupIdSample />




        </div>
    );
}

export default FinancePlan;

