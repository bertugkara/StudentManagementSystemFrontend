import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./CreatedExamView.css"
export default function CreatedHomeworkView(props){

    const { homework}=props;

    return (
        <div className={"createdHomeworkView"}>

            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Homework Id</TableCell>
                            <TableCell align="right">Homework Start Date</TableCell>
                            <TableCell align="right">Homework End Date</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Creator</TableCell>
                            <TableCell align="right">Lesson Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell>{homework.id}</TableCell>
                        <TableCell align="right">{homework.startDate +" "+homework.startTime}</TableCell>
                        <TableCell align="right">{homework.endDate + " "+ homework.endTime}</TableCell>
                        <TableCell align="right">{homework.description}</TableCell>
                        <TableCell align="right">{homework.creator.firstName +" " + homework.creator.lastName}</TableCell>
                        <TableCell align="right">{homework.lesson.name}</TableCell>
                    </TableBody>

                </Table>

            </TableContainer>

        </div>
    )
}