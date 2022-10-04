import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";


export default function ProfessorFeaturedExamsPost(props){
const { exam } = props;

return (
    <Grid item xs={5} md={50}>
        <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {exam.name}
                    </Typography>
                    <Typography component="h2" variant="h5">
                        Date: {exam.examDateTime.slice(0,10) + " " + exam.examDateTime.slice(11,exam.examDateTime.length)}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    </Grid>
);
}