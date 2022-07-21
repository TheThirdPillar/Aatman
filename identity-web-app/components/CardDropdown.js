import Dropdown from 'react-bootstrap/Dropdown'
import { ImMenu3 } from 'react-icons/im'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

function CardDropdown(props) {
    return (
        <Dropdown>
            <Dropdown.Toggle>
                <ImMenu3 style={{color: props.color}}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.handleEdit()}>Edit <AiFillEdit className="float-right mt-1" /></Dropdown.Item>
                <Dropdown.Item onClick={() => props.handleDelete()}>Delete <AiFillDelete className="float-right mt-1" /></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CardDropdown