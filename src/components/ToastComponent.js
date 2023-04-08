import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import SaveIcon from '@mui/icons-material/Save';

export default function ToastComponent(props) {
    const [showToast, setToast] = useState(false)
    function handleClick(){
        setToast(true);
        props.handleClick();

    }
    return (
        <div>
            <Toast
                onClose={() => setToast(false)}
                autohide
                show={showToast}
                delay={1800}
                className="my-toast"
            >
                <Toast.Header>
                    <strong className="mr-auto" >Save Task</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body>Save Data Success.</Toast.Body>
            </Toast>
            <SaveIcon onClick={handleClick}></SaveIcon>
        </div>
    )
}