import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";

function FeaturedPostListHomeworks(props) {
    const { homework,submitButton } = props;
    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                                {homework.description}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Deadline: {homework.endDate} {homework.endTime}
                        </Typography>
                        <Typography component="h2" variant="h5">
                        <Button onClick={()=> submitButton(homework.id)}>Submit Homework</Button>
                        </Typography>

                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default FeaturedPostListHomeworks;