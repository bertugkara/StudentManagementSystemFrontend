import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function StudentFeaturedProfilePostLessons(props) {
    const { post } = props;

    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {post.name}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                            {post.lessonCode}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.lessonType}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}
