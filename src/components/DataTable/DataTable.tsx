import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 450 },
    { field: 'make', headerName: 'Make', width: 200 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'mpg', headerName: 'MPG', width: 200 },
    { field: 'new_used', headerName: 'New or Used', width: 150 },
    {
      field: 'sale_price',
      headerName: 'Sale Price',
      type: 'number',
      width: 150,
    },

  ];

export const DataTable = () => {
    
    let { carData, getData } = useGetData();
    
    console.log(carData)

    return (
        // double curly brackets because we want inward information to be evaluated by the outward set of curly brackets
        <div style={{ height: 400, width: '100%' }}>
            <h1>Cars In Inventory</h1>
            {/* pageSize={5} is the number of rows of data displayed (it shows 5 rows out of ## and can page over additional rows if needed) */}
            <DataGrid rows = {carData} columns = {columns} pageSize={5} checkboxSelection />
        </div>
    )
}