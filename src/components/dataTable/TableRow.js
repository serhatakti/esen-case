import {useEffect, useRef, useState} from "react";
import {usePrevious} from "../../hooks/usePrevious";
import '../dataTable/style/row.css'
import React from "react";
import {useSelector} from "react-redux";

const TableRow = React.memo((props) => {

    const columns = useSelector(state => state.message.columns);

    const {
        row
    } = props;


    const [className, setClassName] = useState("add-highlight");

    const prevRow = usePrevious(row);

    useEffect(() => {
        if (prevRow) {
            if (prevRow.dataId === row.dataId) {
                setClassName("update-highlight")
            }

        }
    }, [row])

    return (
        <tr className={className}>
            {columns.map(column => {
                return <td key={column.field}>
                    {
                        column.formatDate ? Number(row[column.field]).epocToLocaleString() : row[column.field].toString()
                    }
                </td>
            })}
        </tr>
    );
});

export default TableRow;
