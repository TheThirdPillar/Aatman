import { useState } from 'react'
import Cookies from 'js-cookie'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { domain } from '../config/config'

import Toasts from './Toasts'

export default function ConfirmBox(props) {

    const [toastShow, setToastShow] = useState(false)
    const [toastType, setToastType] = useState()
    const [toastMessage, setToastMessage] = useState()

    const deleteItem = () => {
        let request = {}
        request.objectId = props.data._id
        request.object = props.object

        console.info(request);

        fetch(domain + `/application/listen/identity/deleteItem/${request.object}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(request)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.status === 'SUCCESS') {
                setToastMessage(data.message)
                setToastType("success")
                setToastShow(true) 

                setTimeout(() => {
                    props.closeModal()
                    location.reload()
                }, 3000)
            } else {
                setToastMessage("Unable to delete item at the moment.")
                setToastType("danger")
                setToastShow(true)

                setTimeout(() => {
                    props.closeModal()
                })
            }
        })     
    }
    
    return (
        <>    
            <Row>
                <Col>
                    <p className="text-center">
                        Are you sure you want to delete this item ?
                    </p>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button className="btn btn-success m-1" onClick={() => props.closeModal()}>Cancel</Button>
                    <Button className="btn btn-danger m-1" onClick={() => deleteItem()}>Accept</Button>
                </Col>
            </Row>
            <Toasts show={toastShow} message={toastMessage} type={toastType} />
        </>
    )
}