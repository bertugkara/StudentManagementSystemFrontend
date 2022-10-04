
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import "../../MainPages/UserList/UserList.css"

export default function AdminProfileComponentView({announcements,handleDeleteOperation}){

    const columns = [
        {field: 'id', headerName: 'ID', width: 120},
        {field: 'announcement_text', headerName: 'Description', width: 750},
        {field: 'createdDate', headerName: 'Date', width: 110},
        {
            field: "Delete",
            renderCell: (cellValues) => {
                return (
                    <Button className={"deactivate-button"}
                            variant="contained"
                            onClick={() => { handleDeleteOperation(cellValues.id)}}
                    >
                        Delete
                    </Button>
                );
            }
        }
    ];
    return (
        <div>
            <Box sx={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={announcements}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                />
            </Box>
        </div>
    );
}