import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "react-bootstrap/Button";
import "./MainFeaturedPost.css"

export default function StudentMainFeaturedPost(props) {
    const {post, submitHomework, submitExam} = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />

            <Grid container md={12}>

                <Grid item md={8}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 8},
                            pr: {md: 0},
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>

                        <Typography variant="h6" color="inherit" paragraph>
                            {post.lessonType}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                            Lesson Code: {post.lessonCode}
                        </Typography>
                    </Box>
                </Grid>


                <Grid item md={3}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 3},
                            pr: {md: 0},
                        }}
                    >
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    )
        ;
}