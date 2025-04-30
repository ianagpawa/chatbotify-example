import { useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { useChatWindow, usePaths } from "react-chatbotify";

import {Button} from './Button';

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  id: string;
  model: string;
  price: number;
  date: boolean;
  extra?: any;
}

// Create new GridExample component
export const Grid = ({userDataHandler}) => {
    const { toggleChatWindow } = useChatWindow();
    const {goToPath } = usePaths();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([
    { id: "Tesla", model: "Model Y", price: 64950, date: true },
    { id: "Ford", model: "F-Series", price: 33850, date: false },
    { id: "Toyota", model: "Corolla", price: 29600, date: false },
    { id: "Mercedes", model: "EQA", price: 48890, date: true },
    { id: "Fiat", model: "500", price: 15774, date: false },
    { id: "Nissan", model: "Juke", price: 20675, date: false },
  ]);
  const callbackFunc = (params) => {
    // params.stopPropagation();
    console.log('params', params);
    userDataHandler(params);
    goToPath('checkuser')
    toggleChatWindow();
    
  }

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "id" },
    { field: "model" },
    { field: "price" },
    { field: "date" },
    { field: "extra", cellRenderer: Button, cellRendererParams: { cbFunc: callbackFunc} }
  ]);

  
  const defaultColDef: ColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    // <div style={{ width: "100%", height: "100%" }}>
      
    // </div>
    <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
  );
};
