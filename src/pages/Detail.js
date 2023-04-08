import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import {Link, useParams} from "react-router-dom";
import {Container} from "@mui/material";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import {TextField} from "@mui/material";
import {MenuItem} from "@mui/material";
import ToastComponent from '../components/ToastComponent'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Button from "@mui/material/Button";import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const status = [
    {
        value: 'Todo',
        label: 'Todo',
    },
    {
        value: 'Review',
        label: 'Review',
    },
    {
        value: 'Done',
        label: 'Done',
    },
];
const progress = [
    {
        value: '0',
        label: '0%',
    },
    {
        value: '10',
        label: '10%',
    },
    {
        value: '20',
        label: '20%',
    },
    {
        value: '30',
        label: '30%',
    },
    {
        value: '40',
        label: '40%',
    },
    {
        value: '50',
        label: '50%',
    },
    {
        value: '60',
        label: '60%',
    },
    {
        value: '70',
        label: '70%',
    },
    {
        value: '80',
        label: '80%',
    },
    {
        value: '90',
        label: '90%',
    },
    {
        value: '100',
        label: '100%',
    }
];

let initialized = false;

function Detail(){
    let { todoId } = useParams();
    const tempArr =JSON.parse(localStorage.getItem('Data'))
    // const item = tempArr.find(item => item.id === parseInt(todoId));
    const todoindex = tempArr.findIndex(obj => obj.id === parseInt(todoId));
    const [smTaskProgress,setsmTaskProgress] = useState('')
    const [smTaskName,setsmTaskName] = useState('')
    const [smDateDone, setsmDateDone] = useState('');
    // const [smId,setsmId] = useState('')
    const [disableEdit,setDisableEdit] = useState(true)
    const handleEdit = () => setDisableEdit(!disableEdit);
    const [open, setOpen] = React.useState(false);
    const [smArr,setsmArr] = useState(JSON.parse(localStorage.getItem('smArrTask')) || [])
    const [smtempArr, setsmtempArr] = useState([]);


    useEffect(() => {
        setsmtempArr(temp1);
        localStorage.setItem('smArrTask',JSON.stringify(smArr));
        localStorage.setItem('subArrTask',JSON.stringify(temp1))
    }, [temp1]);
    var temp1 = smArr.filter(obj => obj.id === todoId)
    console.log(temp1)
    if(temp1.length == 0 ){
        console.log('chạy cái này')
        const lengthsmData = JSON.parse(localStorage.getItem('smArrTask') || "[]").length
        console.log(lengthsmData)
        // smtempArr = JSON.parse(localStorage.getItem('smArrTask'))

        for(let i = lengthsmData ; i < (lengthsmData + parseInt(tempArr[todoindex].count)); i++){
            temp1.push({smTaskId : i, id:todoId , smTaskName:"",smDateDone:"",smTaskProgress:0})
            // setsmtempArr(smtempArr =>[...smtempArr, {smTaskId : i,id:todoId , smTaskName:"",smDateDone:"",smTaskProgress:0}])
            setsmArr(smArr => [...smArr,{smTaskId : i,id:todoId , smTaskName:"",smDateDone:"",smTaskProgress:0}])
            }
        console.log(temp1)
    }

    // if (!initialized) {
    //     if(!JSON.parse(localStorage.getItem('smArrTask'))) {
    //         smtempArr = [];
    //         for(let i = 0 ; i < parseInt(tempArr[todoindex].count); i++){
    //             smtempArr.push({smTaskId : i,id:todoId , smTaskName:"",smDateDone:"",smTaskProgress:0})
    //         }
    //         localStorage.setItem('smArrTask',JSON.stringify(smtempArr))
    //         initialized=true
    //     }else{
    //         const lengthsmData = JSON.parse(localStorage.getItem('smArrTask')).length
    //         console.log(lengthsmData)
    //         smtempArr = JSON.parse(localStorage.getItem('smArrTask'))
    //         console.log(smtempArr)
    //         for(let i = lengthsmData ; i < (lengthsmData + parseInt(tempArr[todoindex].count)); i++){
    //             smtempArr.push({smTaskId : i,id:todoId , smTaskName:"",smDateDone:"",smTaskProgress:0})
    //         }
    //         console.log(smtempArr)
    //         localStorage.setItem('smArrTask',JSON.stringify(smtempArr));
    //         // const arrayOfObjects = JSON.parse(localStorage.getItem('smArrTask'));
    //         // smArr = smtempArr.filter(obj => obj.id === todoId);
    //         console.log(smArr)
    //         initialized = true
    //         // const updatedArrayOfObjects = arrayOfObjects.map(obj => obj.id === 'idToFind' ? objectToUpdate : obj);
    //     }

    // }

    function handleClickOpen(id){
        localStorage.setItem('smid',id);
        console.log('alo')
        console.log(id)

        var temp2 = JSON.parse(localStorage.getItem('subArrTask'))
        var subindex = temp2.findIndex(obj => obj.smTaskId === id)

        if((subindex !== -1) ) {
            setsmTaskName(temp2[subindex].smTaskName)
            setsmTaskProgress(temp2[subindex].smTaskProgress)
            setsmDateDone(temp2[subindex].smDateDone)
        }
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddClose = () => {
        console.log('Button was Add');
        const temp_id = localStorage.getItem('smid')
        console.log(temp_id)
        var subindex1 = temp1.findIndex(obj => obj.smTaskId === parseInt(temp_id))
        console.log(subindex1)
        console.log(temp1)
        temp1[subindex1].smTaskName = smTaskName
        temp1[subindex1].smTaskProgress = smTaskProgress
        temp1[subindex1].smDateDone = smDateDone
        localStorage.setItem('subArrTask',JSON.stringify(temp1))
        console.log(temp1)
        smArr[temp_id] = temp1[subindex1]
        localStorage.setItem('smArrTask',JSON.stringify(smArr))
        // console.log(smtempArr)
        console.log(smArr)
        setOpen(false);
    };
    function handleTaskName(event) {
        setsmTaskName(event.target.value);
    }
    function handleDateDone(event) {
        setsmDateDone(event.target.value);
    }
    function handleTaskProgress(event) {
        setsmTaskProgress(event.target.value);
    }
    function handleUpdateStatus(event){
        tempArr[todoindex].status = event.target.value
    }

    function handleUpdateDate(event){
        tempArr[todoindex].date = event.target.value
        // console.log(tempArr)
    }
    function handleUpdateDescript(event){
        tempArr[todoindex].description = event.target.value
    }

    function handleUpdate(){
        // const myArray = JSON.parse(localStorage.getItem('Data'));
        // const todoindex = myArray.findIndex(obj => obj.id === parseInt(todoId));
        // console.log(todoindex)
        // console.log(tempArr)
        localStorage.setItem('Data',JSON.stringify(tempArr))
    }


    return(
        <Container className="container-fluid">
            <h2>User ID: {todoId}</h2>
            <Link to='/'>Go Home</Link>
            <div className="row mt-4">
                <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4 mt-4">
                    <div className="card">
                        <div className="card-header p-3 pt-2 d-flex flex-column">
                            <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary  border-radius-xl mt-n4 d-flex align-items-center justify-content-between ">
                                <div className="align-items-center d-flex justify-content-lg-center">
                                    <i className="material-icons opacity-10">person</i>
                                    <h3> {tempArr[todoindex].name}</h3>
                                </div>
                                <BorderColorRoundedIcon className="btn-outline-darkn" style={{cursor:"pointer"}} onClick={handleEdit}></BorderColorRoundedIcon>

                            </div>
                            <div >
                                <p className="text-sm mb-2 ">Status</p>
                                <TextField
                                    hiddenLabel
                                    id="outlined-select-currency"
                                    select
                                    className="mb-2"
                                    defaultValue={tempArr[todoindex].status}
                                    size="small"
                                    fullWidth={true}
                                    // value={todoStatus}
                                    variant="filled"
                                    disabled={disableEdit}
                                    onChange={handleUpdateStatus}
                                >
                                    {status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <p className="text-sm mb-2 ">Date</p>
                                <TextField
                                    hiddenLabel
                                    className="mb-2"
                                    type={"date"}
                                    id="filled-hidden-label-small"
                                    defaultValue={tempArr[todoindex].date}
                                    variant="filled"
                                    size="small"
                                    fullWidth="true"
                                    disabled={disableEdit}
                                    onChange={handleUpdateDate}
                                />
                                <p className="text-sm mb-2 ">Task Count</p>
                                <TextField
                                    hiddenLabel
                                    className="mb-2"
                                    type={"text"}
                                    id="filled-hidden-label-small"
                                    defaultValue={tempArr[todoindex].count}
                                    variant="filled"
                                    size="small"
                                    fullWidth="true"
                                    disabled={true}
                                    onChange={handleUpdateDate}
                                />
                            </div>
                        </div>
                        <hr className="dark horizontal my-0"/>
                            <div className="card-footer p-3 " >
                                <p className="mb-2">
                                    <span className="text-success text-sm font-weight-bolder"></span>
                                    Description
                                </p>
                                <TextField
                                    hiddenLabel
                                    className="mb-2"
                                    id="filled-hidden-label-small"
                                    defaultValue={tempArr[todoindex].description}
                                    variant="filled"
                                    size="small"
                                    // value={todoDescript}
                                    fullWidth={true}
                                    disabled={disableEdit}
                                    multiline={true}
                                    minRows={2}
                                    onChange={handleUpdateDescript}
                                />

                                <div className="toast-parent">
                                    {disableEdit ? null : (
                                        <div style={{cursor:"pointer",float:"right"}} >
                                            <ToastComponent  handleClick={handleUpdate}> </ToastComponent>
                                        </div>
                                    ) }
                                </div>
                            </div>
                    </div>
                </div>

                <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4 px-3">
                    <div className="row">
                        {temp1.map((item,index) => (
                            <div className="col-lg-6 col-md-6 mt-4 mb-4">
                                <div className="card z-index-2 ">
                                    <div className="card-header  mt-n4 mx-3 z-index-2 bg-transparent text-center " >
                                        <Progress type="circle" percent={parseInt(item.smTaskProgress) }  />
                                    </div>
                                    <div className="card-body">
                                        <h6 className="mb-0 ">{item.smTaskId}</h6>

                                        <hr className="dark horizontal"/>
                                        <div className="d-flex ">
                                            <i className="material-icons text-sm my-auto me-1">schedule</i>
                                            <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
                                        </div>
                                        <div>
                                            <Button size="small" onClick={() => handleClickOpen(item.smTaskId)} className="float-end mt-2">Update</Button>
                                            <Dialog open={open} onClose={handleClose} >
                                                <DialogTitle>Update Small Task</DialogTitle>
                                                <DialogContent style={{width:"400px"}}>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Name Small Task"
                                                        type="text"
                                                        fullWidth
                                                        value={smTaskName}
                                                        variant="standard"
                                                        className="mt-0"
                                                        onChange={handleTaskName}
                                                    />
                                                    <TextField
                                                        id="standard-select-currency-native"
                                                        type="date"
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        helperText="Please select task finished day"
                                                        variant="standard"
                                                        value={smDateDone}
                                                        fullWidth="true"
                                                        className="mt-2"
                                                        onChange={handleDateDone}
                                                    >
                                                    </TextField>
                                                    <TextField
                                                        id="standard-select-currency-native"
                                                        select
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        helperText="Please select your task's progress"
                                                        variant="standard"
                                                        value={smTaskProgress}
                                                        fullWidth="true"
                                                        className="mt-2"
                                                        onChange={handleTaskProgress}
                                                    >
                                                        {progress.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </TextField>


                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button onClick={handleAddClose}>Update</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>



        </Container>
    )
}

export default Detail
