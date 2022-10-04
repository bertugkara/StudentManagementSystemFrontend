import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

function FeaturedPostStudent(props) {
    const { post } = props;

    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            Full name: {post.firstName} {post.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email: {post.email}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default FeaturedPostStudent;