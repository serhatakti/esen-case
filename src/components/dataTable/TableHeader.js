import './style/header.css';
import {useDispatch, useSelector} from "react-redux";
import {shortData} from "../../redux/slices/message";

const TableHeader = () => {

    const dispatch = useDispatch();

    const columns=useSelector(state => state.message.columns);

    const onShort = (field, orderType) => (event) => {
        dispatch(shortData({field, orderType}))
    };

    return (
        <thead>
        <tr>
            {
                columns.map((column, i) => {
                    return <th className="px-1" key={i}>
                        <div className="d-flex align-items-center justify-content-evenly">
                            <div className="me-3 d-flex align-items-center">{column.title} {column.sortable &&
                                <i onClick={onShort(column.field, column.orderType === "asc" ? "desc" : "asc")}
                                   className={`ms-2 arrow ${column.orderType === 'asc' ? 'up' : 'down'}`}></i>}</div>
                        </div>

                    </th>
                })
            }
        </tr>
        </thead>
    );
};

export default TableHeader;
