import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import Paper from "@material-ui/core/Paper/Paper";
import axios from "axios";
import configs from "../../configs";
import {Industry} from "../../enums";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {Col, Row} from "reactstrap";
import Link from "@material-ui/core/Link/Link";
import back_image from './../../assets/img/bollywood.jpg';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        backgroundImage: `url(${back_image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 350
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
}));


export default function Bollywood() {
    const classes = useStyles();

    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState(false);

    //fetch data from server
    useEffect(() => {
        setLoading(true);
        axios.post(configs.server_address + '/getLatest', {filters: {industry: Industry.BOLLYWOOD}}).then(res => {
            if (res.data.success) {
                //change state of all elements
                setLatest(res.data.data);
            } else {
                alert(res.data.message);
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            <main style={{backgroundColor: "#cfd8dc"}}>

                <Paper className={classes.mainFeaturedPost}>
                    {/* Increase the priority of the hero background image */}

                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    Bollywood is Life
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    We all love bollywood and are in love with movies, so we bring you the latest
                                    bollywood collection.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                {loading? ( <LinearProgress variant="query" color="secondary" />):(null)}

                {latest?(
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {latest.map((card) => (
                                <MediaCard card={card}/>
                            ))}
                        </Grid>

                    </Container>
                ):(null)}

                {(!loading && !latest) ?
                    (<div style={{backgroundColor: "#cfd8dc", paddingTop: 150, paddingBottom: 150}}>
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <div className="clearfix">
                                            <h4 className="pt-3">Oops! You're lost.</h4>
                                            <p className="text-muted float-left">No Movie / Web Series were found in this section.</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={'justify-content-center'}>
                                    <Typography variant="h5" color="textPrimary" gutterBottom>
                                        You can search again or view our <Link href={configs.website_address}> Home Page </Link> for more awesome content.
                                    </Typography>
                                </Row>
                            </Container>
                        </div>
                    ) : (null)}

            </main>

            {/* Footer */}
            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
            {/* End footer */}

        </React.Fragment>
    );
}
