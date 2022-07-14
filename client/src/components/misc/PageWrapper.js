import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
    },
    content: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
}))

const Wrapper = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.main}>
            <NavBar />
            <div className={classes.content}>
                <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100%' }}>
                    <Grid container item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Wrapper;