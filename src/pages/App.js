import DataTable from "../components/dataTable/DataTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useDispatch} from "react-redux";
import {setMessage} from "../redux/slices/message";
import {Alert, Button, FormControl, FormLabel, InputGroup} from "react-bootstrap";

function App() {

    const dispatch = useDispatch();

    const {lastJsonMessage, readyState} = useWebSocket(process.env.REACT_APP_SOCKET_URL);

    useEffect(() => {
        if (lastJsonMessage && lastJsonMessage.length) {
            dispatch(setMessage(lastJsonMessage))
        }

    }, [lastJsonMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [interval, setInterval] = useState(1000);
    const [started, setStarted] = useState(false);

    const handleChange = (event) => {
        setInterval(event.target.value);
    }

    const start = () => {
        if (interval < 100) {
            setShowAlert(true);
            setAlertText("Interval can be at least 100")
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/stream/start/${interval}`, {
                method: 'POST',
                mode: 'no-cors'
            }).catch(err => console.log(err))
            setStarted(true);
        }
    }

    const stop = () => {
        fetch(`${process.env.REACT_APP_API_URL}/stream/stop`, {
            method: 'POST',
            mode: 'no-cors'
        }).catch(err => console.log(err));
        setStarted(false);
    }

    return (
        <div className="mt-5 px-5">
            <div className="d-flex align-items-center justify-content-between">
                <InputGroup className="mb-3 w-50">
                    <FormControl type="number"
                                 value={interval}
                                 onChange={handleChange}
                                 placeholder="Interval"
                                 aria-label="Interval"
                                 aria-describedby="basic-addon2"
                    />
                    <Button onClick={start} disabled={readyState !== ReadyState.OPEN || started} variant="success"
                            id="button-addon2">
                        Start
                    </Button>
                    <Button onClick={stop} disabled={readyState !== ReadyState.OPEN || !started} variant="danger"
                            id="button-addon2">
                        Stop
                    </Button>
                </InputGroup>
                {
                    showAlert &&
                    <Alert variant="danger" className="py-1" onClose={() => setShowAlert(false)} dismissible>
                        {alertText}
                    </Alert>
                }

                <FormLabel className={`${readyState === ReadyState.OPEN ? 'text-success' : 'text-danger'} fw-bold`}>The
                    WebSocket
                    is {connectionStatus}</FormLabel>
            </div>

            <DataTable rowKey={"dataId"} showRowCount={14}/>
        </div>

    );
}

export default App;
