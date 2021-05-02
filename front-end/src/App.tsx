import React, {useState} from 'react';
import { InputForm } from './components/input-form';
import {Paper, Grid, makeStyles} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {DefaultRewardsService} from './app-builder';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {

    const classes = useStyles();

    const rewardsService = DefaultRewardsService;

    const [rewards, setRewards] = useState(Array(0).fill(""))
    const [rewardsPresent, setRewardsPresent] = useState(false)
    const [error, setError] = useState("")
    const [reloadToggle, setReloadToggle] = useState(true)

    const confirmedCallBack = (selections:Array<string>, acc_number:string) =>{
        setError("")
        setRewards(Array(0).fill(""))
        setRewardsPresent(false);
        console.log("Confirm clicked")

        if(String(parseInt(acc_number)) === acc_number){
            rewardsService.getRewards(parseInt(acc_number), selections)
                .then((rewards) => {
                    console.log("Rewards returned")
                    setRewards(rewards)
                    setRewardsPresent(true)
                }).catch(err => {
                    console.log("There was an error")
                    setError(err.message)
                })
        } else {
            setError("Must be an integer input")
        }

        setReloadToggle(toggle => !toggle)
    }



    return (
        <div className={classes.root}>
            <Grid container 
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
                style={{minHeight:'100vh'}}>

                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Rewards rewards={rewards} rewardsPresent={rewardsPresent}/>
                        <InputForm key={String(reloadToggle)} confirmSelectionCallBack={confirmedCallBack} rewardsService={rewardsService}></InputForm>
                        <Warning error={error}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

interface RewardsProps{
    rewards:Array<string>
    rewardsPresent:boolean
}

const Rewards:React.FC<RewardsProps> = (props:RewardsProps) => {
    if (props.rewardsPresent === false ){
        return (<div></div>)
    }else if (props.rewards.length >0){
        return(<Alert severity="success">{props.rewards.join(", ")}</Alert>)
    }else {
        return (<Alert severity="success">You have no rewards</Alert>)
    }

}    

interface WarningProps{
    error:string
}

const Warning:React.FC<WarningProps> = (props:WarningProps) =>{
        if(props.error !== ""){
            return(
                <Alert severity="error">
                    There was an error: {props.error}
                </Alert>
            );
        } else{
            return (<div></div>);
        } 
    }

export default App;
