
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import "../MainPages/UserList/UserList.css"

export default function AnnouncementComponentView({announcements}){

    const columns = [
        {field: 'announcement_text', headerName: 'Announcement', width: 1000},
        {field: 'createdDate', headerName: 'Date', width: 110},
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