import React from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import configs from "../../configs";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import logo from './../../assets/logo.png';
import Link from "@material-ui/core/Link/Link";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
        height: 40
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: 'white',
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar position="relative" style={{backgroundColor: 'rgb(36, 40, 44)'}}>
            <Toolbar style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <img src={logo} alt={'Logo'} className={classes.icon} style={{float: 'left'}}/>
                    <Link color="inherit" href={configs.website_address} style={{float: 'right'}}>
                        <Typography variant="h6" style={{color: 'white'}} noWrap>
                            {configs.website_name}
                        </Typography>
                    </Link>
                </div>
                <div>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/bollywood" className={classes.link}>
                            Bollywood
                        </Link>
                        <Link variant="button" color="textPrimary" href="/hollywood" className={classes.link}>
                            Hollywood
                        </Link>
                        <Link variant="button" color="textPrimary" href="/webseries" className={classes.link}>
                            Web Series
                        </Link>
                        <Link variant="button" color="textPrimary" href="/search" className={classes.link}>
                            <Button variant="contained"
                                    color="default"
                                    startIcon={<SearchIcon />}
                            >Search
                            </Button>
                        </Link>
                    </nav>
                </div>
            </Toolbar>

        </AppBar>
    );

}

