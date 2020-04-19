import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import configs from './../../configs.json';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {Col, Row} from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import algoliasearch from 'algoliasearch/lite';


const searchClient = algoliasearch(configs.algolia_appname, configs.algolia_search_key);
const index = searchClient.initIndex(configs.algolia_index_name);

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));


export default function Search() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const [text, setText] = useState('');
    const [awaiting, setAwaiting] = useState(false);

    const search = () => {
        setLoading(true);
        setAwaiting(true);
        setResponse(null);

        index.search(text).then(({hits}) => {
            if (hits.length > 0) setResponse(hits);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });

        // axios.post(configs.server_address + '/search', {title: text}).then(res => {
        //     if (res.data.success) {
        //         //change state of all elements
        //         setResponse(res.data.data);
        //     } else {
        //         alert(res.data.message);
        //         //setError(res.data.message)
        //     }
        //     setLoading(false);
        // }).catch(err => {
        //     console.log(err);
        //     setLoading(false);
        // });
    };

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}

            <main style={{backgroundColor: "#cfd8dc", height: '100vh'}}>
                <div style={{display: 'flex', paddingTop: 30, justifyContent: 'center'}}>
                    <TextField
                        label="Enter movie/series name, or tags like 1080p, etc."
                        variant="outlined"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(t) => {
                            if (t.charCode === 13) search()
                        }}
                        style={{width: '50%', backgroundColor: '#fff', borderRadius: 10, borderColor: 'blue'}}
                    />
                    <IconButton type="submit" onClick={search}
                                style={{marginLeft: 20, backgroundColor: 'white'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </div>

                {response ? (<Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {response.map((card) => (
                            <MediaCard card={card}/>
                        ))}
                    </Grid>

                </Container>) : (null)}

                {(awaiting && !loading && !response) ?
                    (<div style={{backgroundColor: "#cfd8dc", paddingTop: 150, paddingBottom: 150}}>
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <div className="clearfix">
                                            <h4 className="pt-3">Oops! You're lost.</h4>
                                            <p className="text-muted float-left">The Movie / Web Series you are
                                                looking for was
                                                not found.</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={'justify-content-center'}>
                                    <Typography variant="h5" color="textPrimary" gutterBottom>
                                        You can search again or view our <Link href={configs.website_address}> Home
                                        Page </Link> for more awesome content.
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
