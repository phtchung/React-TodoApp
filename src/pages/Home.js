import React ,{ useState,useEffect }from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
function Home(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedValue, setselectedValue] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [value, setValue] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [inputValueName, setInputValueName] = useState('');
    const [description, setDescription] = useState('');

    const [todoid, setTodoId] = useState(0);
    const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('Data')) || []);
    const [taskCount, setTaskCount] = useState('');
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState(JSON.parse(localStorage.getItem('Data') || "[]").length );
    // useEffect(() => {
    //     const storedData = localStorage.getItem('Data');
    //     if (storedData) {
    //         setTableData(JSON.parse(storedData));
    //         console.log(storedData)
    //     }
    // }, []);
    useEffect(() => {
        console.log(tableData)
        localStorage.setItem('Data', JSON.stringify(tableData));
    }, [tableData]);

    function handleAddClose() {
        console.log('Button was Add');
        if(disabled){
            const temp = { id: id, name: inputValueName, status: selectedValue, date: dateStart, description: description,count:taskCount };
            setTableData(tableData => [...tableData,temp])
        }else {
            const temp = { id: id, name: inputValueName, status: selectedValue, date: dateStart, description: description,count:0 };
            setTableData(tableData => [...tableData,temp])
        }
        handleClose();
        setInputValueName('');
        setDescription('');
        setDateStart('');
        setselectedValue('')
        setTaskCount('')
        setId(id+1);
        setDisabled(false)
    }

    const handleClickOpen = (id) => {
        console.log(id)
        localStorage.setItem('todoID',id);
        setTodoId(id);
        setOpen(true);
    };

    function handleRemoveClose1(){
        const temp_id =parseInt(localStorage.getItem('todoID'))
        const temp_arr = JSON.parse(localStorage.getItem('Data'))
        console.log(temp_arr)
        const index = temp_arr.findIndex(item => item.id === temp_id);
        if (index !== -1) {
            temp_arr.splice(index, 1);
        }
        localStorage.setItem('Data',JSON.stringify(temp_arr))
        setTableData(temp_arr);
        handleClose1()
    }


    const handleClose1 = () => {
        setOpen(false);
    };

    function handleChangeName(event) {
        setInputValueName(event.target.value);
    }
    function handleDate(event) {
        setDateStart(event.target.value);
    }
    function handleChangeStatus(event) {
        setselectedValue(event.target.value);
    }
    function handleDescrip(event) {
        setDescription(event.target.value);
    }
    function handleTaskCount(event) {
        setTaskCount(event.target.value);
    }



return(
    <div className="container">
        <AppBar position='static' >
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <CatchingPokemonIcon></CatchingPokemonIcon>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                    <a href="#" color='inherit' className=" nav-link">Todo App</a>
                    </Typography>
                <Stack direction='row' spacing={2}>
                        <Button variant="primary " className="mx-lg-5" onClick={handleShow}>
                            Add New Task
                        </Button>
                    <Button color='inherit'>About</Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Stack>
            </Toolbar>
        </AppBar>
        {/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/}
        {/*    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"*/}
        {/*            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">*/}
        {/*        <span className="navbar-toggler-icon"></span>*/}
        {/*    </button>*/}


        {/*    <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarTogglerDemo03">*/}

        {/*        <form className="form-inline my-2 my-lg-0 d-flex form_width">*/}
        {/*            <input className="form-control search_bar" type="search" placeholder="Search" aria-label="Search"/>*/}
        {/*                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
        {/*        </form>*/}
        {/*    </div>*/}
        {/*</nav>*/}

        <div className="m-auto">

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task name"
                            value={inputValueName}
                            autoFocus
                            onChange={handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.Control">
                        <Form.Label>Description</Form.Label>
                        <Form.Select aria-label="Default select example" value={selectedValue} onChange={handleChangeStatus}>
                        <option>Select Status</option>
                        <option value="Todo">Todo</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group
                        className="mb-3 "
                        controlId="exampleForm.datestart"
                    >
                        <Form.Label>Date Start</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter task name"
                            value={dateStart}
                            onChange={handleDate}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group
                        style={{marginTop:"10px"}}

                        controlId="formRange">
                        <Form.Label>Progress</Form.Label>
                        <div className="d-flex align-items-center justify-content-between">
                            <Form.Check

                            type="switch"
                            id="custom-switch"
                            label="Add detail small task ? "
                            checked={disabled}
                            onChange={e => setDisabled(e.target.checked)}
                            />
                        <span>
                            {!disabled ? null : (
                                    <Form.Group  controlId="exampleForm.ControlInput1" style={{paddingBottom:"15px"}}>
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter task count"
                                            value={taskCount}
                                            autoFocus
                                            onChange={handleTaskCount}/>
                                    </Form.Group>
                            ) }
                        </span>
                        </div>
                        <Form.Range className="mt-1" value={value} disabled={!disabled}/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={handleDescrip} rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddClose}>
                    Add Task
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        {/*Nội dung dialog xóa */}
        <Dialog
            open={open}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Task?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure  want to delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose1} >Cancel</Button>
                <Button onClick={handleRemoveClose1}>Accept</Button>
            </DialogActions>
        </Dialog>
        <div>
            <Table striped="columns" className="text-center" bordered={true} style={{width:'70%',margin:"auto",marginTop:'3.5rem'}}>
                <thead >
                <tr>
                    <th style={{width : '10%'}}>Task No</th>
                    <th>Task Name</th>
                    <th style={{width : '18%'}}>Status</th>
                    <th style={{width : '20%'}}>Date Start</th>
                    <th style={{width : '10%'}}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                     <td ><Link  to={`/detail/${item.id}`} style={{textDecoration:'none',color:'black'}}>{item.name}</Link></td>
                     <td>{item.status}</td>
                        <td>{item.date}</td>
                        <td  onClick={() => handleClickOpen(item.id)}>
                            <BackspaceIcon variant="outlined" style={{cursor:"pointer"}}>
                        </BackspaceIcon>
                    </td>
                     </tr>
                ))}
                </tbody>
            </Table>
        </div>
    </div>
)}

export default Home