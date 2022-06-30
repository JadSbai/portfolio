import * as React from 'react';
import {BootstrapDialogTitle, BootstrapDialog} from "./bootstrapDialog";
import {Button, DialogActions, DialogContent, Typography} from "@material-ui/core";

 function CustomizedDialogs({title, description, repo}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} size="medium" color="inherit">
                LEARN MORE
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor: '#1d1d24', alignSelf: 'center', fontWeight: 'bold'}}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers style={{backgroundColor: '#1d1d24'}}>
                    <Typography gutterBottom>
                        {description}
                    </Typography>
                    <Typography gutterBottom style={{marginTop: '5%'}}>
                        {repo !== ""? <a href={repo} style={{color: 'white'}}>
                            Look at the Github repository
                        </a>: null}
                    </Typography>
                </DialogContent>
                <DialogActions style={{backgroundColor: '#1d1d24'}}>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export {CustomizedDialogs}
