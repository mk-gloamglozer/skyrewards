import React, { useState} from 'react'
import {Grid, Button, TextField} from '@material-ui/core'
import { RewardsService } from '../service/rewards-service'
import { useStyles } from '../App'


interface Props {
    rewardsService:RewardsService;
    confirmSelectionCallBack:any;
}

export const InputForm:React.FC<Props> = (props:Props) =>{
    const subscriptions = props.rewardsService.getSubscriptions()
    const [clickedGrid ,setClickedGrid] = useState(Array(subscriptions.length).fill(false))
    const [inputField, setInputField] = useState("")

    const buttonCallback = (buttonId:number) =>{
        let _clickedGrid = clickedGrid.slice();
        _clickedGrid[buttonId] = !_clickedGrid[buttonId];
        setClickedGrid(_clickedGrid)
    }

    const handleInputChange = (event:any) =>{
        event.preventDefault();
        setInputField(event.target.value)
    }

    const handleConfirm = (event:any) =>{
        event.preventDefault();
        let selection:Array<string> = []
        for (let i =0 ; i<clickedGrid.length; i++){
            if(clickedGrid[i]){
                selection.push(subscriptions[i])
            }
        }
        props.confirmSelectionCallBack(selection, inputField)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container 
                spacing={4}
                direction="row"
                alignItems="center"
                justify="center">
                <Grid item xs={12} >
                    <TextField id="standard-basic" label="Account Number" fullWidth={true} onChange={handleInputChange}/>
                </Grid>
                <SelectorGrid 
                    buttonNames={subscriptions} 
                    buttonOnClick={buttonCallback}
                    onOffArray={clickedGrid}/>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={handleConfirm}>Confirm</Button>
                </Grid>
            </Grid>
        </div>
    );
}

interface SelectorGridProps{
    buttonNames:Array<string>
    onOffArray:Array<boolean>
    buttonOnClick:Function;
}

const SelectorGrid:React.FC<SelectorGridProps> = (props:SelectorGridProps) =>{

    let buttonIds:Array<number> = [];
    for(let i=0; i<props.buttonNames.length; i++){
        buttonIds.push(i)
    }

    return(<Grid 
            container 
            spacing={2}
            direction="row"
            alignItems="center"
            justify="center">{
        buttonIds.map((buttonId) => 
            <Grid item xs={4} justify="center">
                <Button 
                    variant="contained" 
                    color={props.onOffArray[buttonId] ? "secondary" : "primary"}
                    fullWidth={true}
                    onClick={() => props.buttonOnClick(buttonId)}>
                        {props.buttonNames[buttonId]}
                </Button>
            </Grid>)
    }</Grid>);
}