
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import Button from "react-bootstrap/Button";
export default function UserListDeactiveView({students,handleActiveOperation}){

    const columns = [
        {field: 'id', headerName: 'ID', width: 120},
        {field: 'firstName', headerName: 'Name', width: 200},
        {field: 'email', headerName: 'Surname', width: 200},
        {field: 'lastName', headerName: 'Surname', width: 200},
        {field: 'username', headerName: 'Username', width: 150},
        {field: 'role', headerName: 'Role', width: 150},
        {
            field: "Activate Student",
            renderCell: (cellValues) => {
                return (
                    <Button className={"active-button"}
                        variant="contained"
                        onClick={() => { handleActiveOperation(cellValues.id)}}
                    >
                        Active
                    </Button>
                );
            }
        ,width: 150 }
    ];

    return (
        <div>
            <Box sx={{height: 750, width: '100%'}}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    pageSize={12}
                    rowsPerPageOptions={[12]}
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                />
            </Box>
        </div>
    );
}