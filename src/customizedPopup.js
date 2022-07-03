import * as React from 'react';
import {BootstrapDialogTitle, BootstrapDialog} from "./bootstrapDialog";
import {Button, DialogActions, DialogContent, Typography} from "@material-ui/core";

 function CustomizedDialogs({title, description, repo, isProject, company}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                size="medium"
                variant="outlined"
                color="inherit"
                onMouseDown={event => event.stopPropagation()}
                onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    handleClickOpen();
                }}
            >
                {isProject? 'LEARN MORE': "DETAILS"}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor: '#1d1d24', alignSelf: 'center', fontWeight: 'bold'}}>
                    {isProject?title: `${title} at ${company}`}
                </BootstrapDialogTitle>
                <DialogContent dividers style={{backgroundColor: '#1d1d24'}}>
                    <Typography gutterBottom style={{whiteSpace: 'pre-wrap'}}>
                        {description}
                    </Typography>
                    <Typography gutterBottom style={{marginTop: '5%'}}>
                        {isProject? repo !== ""? <a href={repo} style={{color: 'white'}}>
                            Look at the Github repository
                        </a>: null: null}
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
