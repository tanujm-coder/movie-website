import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import configs from './../../configs.json';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import LinearProgress from "@material-ui/core/LinearProgress";
import TelegramIcon from '@material-ui/icons/Telegram';
import back_image from './../../assets/img/deadpool.png';


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: 10,
        backgroundImage: `url(${back_image})`
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));


export default function Home() {
    const classes = useStyles();

    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState(false);

    //fetch data from server
    useEffect(() => {
        setLoading(true);
        axios.post(configs.server_address + '/getLatest').then(res => {
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
            <WaveBorder
                upperColor={'rgb(36, 40, 44)'}
                lowerColor="#FFFFFF"
                className={classes.waveBorder}
                animationNegativeDelay={2}
            />

            <main style={{backgroundColor:"#cfd8dc"}}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {configs.website_name}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" startIcon={<TelegramIcon/>}>
                                         See our Telegram Channel
                                    </Button>
                                </Grid>

                            </Grid>
                        </div>
                    </Container>
                </div>

                {loading? ( <LinearProgress variant="query" color="secondary" />):(null)}
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    {latest? (
                        <Grid container spacing={4}>
                            {latest.map((card) => (
                                <MediaCard card={card}/>
                            ))}
                        </Grid>
                    ):(null)}


                </Container>
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
