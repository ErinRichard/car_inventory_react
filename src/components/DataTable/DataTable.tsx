import React, {useState} from 'react';
import { DataGrid, GridColDef, GridDataContainer, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle} from '@material-ui/core';
import { CarForm } from '../../components/CarForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 450 },
    { field: 'make', headerName: 'Make', width: 200 },
    { field: 'model', headerName: 'Model', width: 130 },
    {field: 'sale_price',
    headerName: 'Sale Price',
    type: 'number',
    width: 150,
  },
    // { field: 'color', headerName: 'Color', width: 200 }, 
    // { field: 'year', headerName: 'Year', width: 200 },   
    { field: 'mpg', headerName: 'MPG', width: 200 },
    { field: 'new_used', headerName: 'New or Used', width: 150 },

  ];


  interface gridData{
    data:{
      id?:string;
    }
  }
  


  export const DataTable = () => {
    
    let { carData, getData } = useGetData();
    
    console.log(carData)
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}})

    // These handles relate to the dialog box we create below
    let handleOpen = () =>{
      setOpen(true)
    }

    let handleClose = () =>{
      setOpen(false)
    }

    let deleteData = () =>{
      server_calls.delete(gridData.data.id!)
      getData()
    }

    console.log(gridData.data.id)
      return (
        <div style={{ height:400, width: '100%'}}>
            <h2>Cars in Inventory</h2>
            {/* pageSize={5} is the number of rows of data displayed (it shows 5 rows out of 9 and can page over to next 4 rows) */}
            <DataGrid rows = {carData} columns = {columns} pageSize={5} checkboxSelection onRowSelected = { setData } />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            {/* Dialog Pop Up Begin */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Car</DialogTitle>
              <DialogContent>
                <DialogContentText>Update Car</DialogContentText>
                  <CarForm id={gridData.data.id!}/>
              </DialogContent>
              <DialogActions>
                <Button onClick = {handleClose} color="primary">Cancel</Button>
                <Button onClick = {handleClose} color="primary">Done</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}