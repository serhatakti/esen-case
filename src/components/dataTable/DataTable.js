import {Table} from "react-bootstrap";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import {useSelector} from "react-redux";

const DataTable = (props) => {

    const data = useSelector(state => state.message.messageList);

    const {
        rowKey,
        showRowCount
    } = props;

    const style = {
        height: showRowCount ? showRowCount * 60 : "auto",
        display: "flex",
        overflow: "auto",
        flexDirection: "column-reverse"
    }

    return (
        <div style={data.length >= showRowCount ? style : null}>
            <Table striped bordered hover size="sm">
                <TableHeader/>
                <tbody>
                {
                    data.map(row => <TableRow row={row} key={row[rowKey]}/>)
                }
                </tbody>

            </Table>
        </div>

    );
};

export default DataTable;
