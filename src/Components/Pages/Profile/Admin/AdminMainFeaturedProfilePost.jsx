import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function AdminMainFeaturedProfilePost(props) {
    const {post} = props;

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
                    backgroundColor: 'rgba(0,128,255)',
                }}
            />

            <Grid container >

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
                            Your ID: {post.userID}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                          Your E-mail:  {post.description}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                           You are Admin
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

        </Paper>
    )
        ;

}
