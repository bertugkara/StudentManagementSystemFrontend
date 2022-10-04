import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";

function FeaturedPostListExams(props) {
    const { exam,examSubmit } = props;

    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {exam.name}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Date: {exam.examDateTime.slice(0,10) + " " + exam.examDateTime.slice(11,exam.examDateTime.length)}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            <Button onClick={() => { examSubmit(exam.id) }}>Submit Exam</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default FeaturedPostListExams;