import React, { useEffect, useState } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

const Input = styled('input')({
    display: 'none',
});

const useStyles = makeStyles({
    root: {
      minWidth: 500
    },
    bullet: {
      display: "flex",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
});  

function DocumentSection() {

    const classes = useStyles();
    const [updating, setUpdating] = useState(false);

    return (

        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Document Section
                    </Typography>
                    <MDBox mb={1.5}>

                        <Card className={classes.root} variant="outlined" sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>
                                    {updating ? (
                                        <div>
                                            <div>
                                                <TextField
                                                    id="input"
                                                    label="File 1 Name  "
                                                    type="input"
                                                    variant="outlined"
                                                    defaultValue=" "
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField
                                                        id="input"
                                                        label="File 2 Name  "
                                                        type="input"
                                                        variant="outlined"
                                                        defaultValue=" "
                                                        sx={{ width: 220 }}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField
                                                        id="input"
                                                        label="File 3 Name  "
                                                        type="input"
                                                        variant="outlined"
                                                        defaultValue=" "
                                                        sx={{ width: 220 }}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                    <div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Document Information
                                        </Typography>

                                            Upload File 1:
                                            <label htmlFor="icon-button-file">
                                                <Input accept="image/*" id="icon-button-file" type="file" />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                {/* upload file button icon */}
                                                <PhotoCamera />
                                                </IconButton>
                                            </label>
                                            <div>
                                                <InsertDriveFileIcon
                                                    fontSize="medium"
                                                />
                                                <Typography variant="h6" gutterBottom component="div">
                                                    File 1
                                                </Typography>
                                                <TextField
                                                    id="date"
                                                    label="Uploaded Date"
                                                    type="date"
                                                    variant="standard"
                                                    defaultValue="yyyy-mm-dd"
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>

                                            Upload File 2:
                                            <label htmlFor="icon-button-file">
                                                <Input accept="image/*" id="icon-button-file" type="file" />
                                                <IconButton color="secondary" aria-label="upload picture" component="span">
                                                {/* upload file button icon */}
                                                <PhotoCamera />
                                                </IconButton>
                                            </label>
                                            <div>
                                                <InsertDriveFileIcon
                                                    fontSize="medium"
                                                />
                                                <Typography variant="h6" gutterBottom component="div">
                                                    File 2
                                                </Typography>
                                                {/* <TextField
                                                    id="input"
                                                    label="File Name"
                                                    type="input"
                                                    variant="standard"
                                                    defaultValue=" "
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                /> */}
                                                <TextField
                                                    id="date"
                                                    label="Uploaded Date"
                                                    type="date"
                                                    variant="standard"
                                                    defaultValue="yyyy-mm-dd"
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>

                                            Upload File 3:
                                            <label htmlFor="icon-button-file">
                                                <Input accept="image/*" id="icon-button-file" type="file" />
                                                <IconButton color="info" aria-label="upload picture" component="span">
                                                {/* upload file button icon */}
                                                <PhotoCamera />
                                                </IconButton>
                                            </label>
                                            <div>
                                                <InsertDriveFileIcon
                                                    fontSize="medium"
                                                />
                                                <Typography variant="h6" gutterBottom component="div">
                                                    File 3
                                                </Typography>
                                                {/* <TextField
                                                    id="input"
                                                    label="File Name"
                                                    type="input"
                                                    variant="standard"
                                                    defaultValue=" "
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                /> */}
                                                <TextField
                                                    id="date"
                                                    label="Uploaded Date"
                                                    type="date"
                                                    variant="standard"
                                                    defaultValue="yyyy-mm-dd"
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" onClick={() => setUpdating(true)} color="secondary">
                                        Update
                                    </Button>
                                    <Button size="small" onClick={() => setUpdating(false)} color="secondary">
                                        Back
                                    </Button>
                                </CardActions>
                        </Card>


                        {/* <ProfileInfoCard
                            title="Document Information"
                            info={{
                            upload1: "Symbol | File Name1 | 1/5/2017", // placeholder string
                            upload2: "Symbol | File Name2 | 12/28/2012", // placeholder string
                            upload3: "Symbol | File Name3 | 1/21/2009", // placeholder string
                            }}
                            social={[
                                {
                                    link: "https://www.google.com/docs/about/",
                                    icon: <PageviewIcon />,
                                    color: "github",
                                },
                            ]}
                            action={{ route: "", tooltip: "Edit Profile" }}
                        /> */}
                    </MDBox>
                </Grid>
            </Grid>
        </MDBox>

    )
}

export default DocumentSection;