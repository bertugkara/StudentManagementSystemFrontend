import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./CreatedExamView.css"
export default function CreatedExamView(props){

    const { exam}=props

    return (
        <div className={"createdExamView"}>

                <TableContainer component={Paper}>

                   <Table sx={{ minWidth: 650 }} aria-label="simple table">

                       <TableHead>
                           <TableRow>
                               <TableCell>Exam Id</TableCell>
                               <TableCell align="right">Exam Name</TableCell>
                               <TableCell align="right">Exam Date And Time</TableCell>
                               <TableCell align="right">Room Id</TableCell>
                               <TableCell align="right">Creator Name Surname</TableCell>
                               <TableCell align="right">Lesson Name</TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           <TableCell>{exam.id}</TableCell>
                           <TableCell align="right">{exam.name}</TableCell>
                           <TableCell align="right">{exam.examDateTime}</TableCell>
                           <TableCell align="right">{exam.room.id}</TableCell>
                           <TableCell align="right">{exam.creator.firstName + " " + exam.creator.lastName}</TableCell>
                           <TableCell align="right">{exam.lesson.name}</TableCell>
                       </TableBody>

                   </Table>

                </TableContainer>

        </div>
    )
}