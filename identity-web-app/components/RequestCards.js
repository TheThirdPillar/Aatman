import Link from 'next/link'
import { useState } from 'react'
import Cookies from 'js-cookie'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import styles from '../styles/Home.module.css'

import connectToExtension from '../utils/extension'
import { domain } from '../config/config'

function RequestCards(props) {

    var otherUser = (props.type == 'sent') ? props.request.requestedTo : props.request.requestedBy
    const [logMessage, setLog] = useState()

    var variant
    if (props.request.status === 'pending') variant = "warning"
    if (props.request.status === 'signed') variant = "success"
    if (props.request.status === 'declined') variant = "danger"

    var viewDocument = () => {
        let encryptedData, encryptedKey, originalPublicKey
        encryptedData = props.request.document.encryptedFile
        if (props.type == "sent" && props.request.type == 'verification') {
            encryptedKey = props.request.document.encryptedKey        
            originalPublicKey = false
        } else if (props.type == "received" && props.request.type == 'verification') {
            encryptedKey = props.request.sharedKey
            originalPublicKey = props.request.requestedBy.shieldUser.publicKey
        } else if (props.type == "sent" && props.request.type == 'access'){
            encryptedKey = props.request.sharedKey
            originalPublicKey = props.request.requestedTo.shieldUser.publicKey
        } else if (props.type == "received" && props.request.type == 'access') {
            encryptedKey = props.request.document.encryptedKey
            originalPublicKey = false
        } 
        let request = {}
        request.query = 'decrypt'
        request.data = {
            encryptedData: encryptedData,
            encryptedKey: encryptedKey,
            originalPublicKey: originalPublicKey
        }
        connectToExtension(request)
        .then(response => {
            if (response && response.status && response.status === 'SUCCESS') {
                let imageSource = response.decryptedData
                var image = new Image()
                image.src = imageSource
                var w = window.open("")
                w.document.write(image.outerHTML)
            } else {
                setLog('Unable to decrypt file.')
            }
        })
    }

    const handleRequest = (status) => {
        var request = {}
        if (props.request.type == 'access') {
            // Handle access request
            // Access requests need to share key,
            // not required if declined
            if (status == 'declined') {
                request.status = status
                request.requestId = props.request._id
                fetch(domain + '/application/listen/identity/handleAccess', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('token')
                    },
                    body: JSON.stringify(request)
                })
                .then(response => response.json())
                .then((data) => {
                    if (data.status === 'SUCCESS') {
                        let toastData = {}
                        toastData.toastShow = true
                        toastData.toastType = 'success'
                        toastData.toastMessage = 'Successfully declined the access request.'
                        props.handleToast(toastData)
                        setTimeout(() => {
                            location.reload()
                        }, 3000)
                    } else {
                        let toastData = {}
                        toastData.toastShow = true
                        toastData.toastType = 'danger'
                        toastData.toastMessage = 'Unable to sign the decline request at the moment.'
                        props.handleToast(toastData)
                        setTimeout(() => {
                            location.reload()
                        }, 3000)
                    }
                })
            } else {
                let receiverPublicKey = props.request.requestedBy.shieldUser.publicKey
                let encryptedKey = props.request.document.encryptedKey
                let request = {}
                request.query = 'share'
                request.data = {
                    receiverPublicKey: receiverPublicKey,
                    encryptedKey: encryptedKey
                }
                connectToExtension(request)
                .then(response => {
                    if (response && response.status && response.status === 'SUCCESS') {
                        let request = {}
                        request.status = status
                        request.requestId = props.request._id
                        request.sharedKey = response.sharedKey
                        fetch(domain + '/application/listen/identity/handleAccess', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + Cookies.get('token')
                            },
                            body: JSON.stringify(request)
                        })
                        .then(response => response.json())
                        .then((data) => {
                            if (data.status == 'SUCCESS') {
                                let toastData = {}
                                toastData.toastShow = true
                                toastData.toastType = 'success'
                                toastData.toastMessage = 'Successfully signed the verification request.'
                                props.handleToast(toastData)
                                setTimeout(() => {
                                    location.reload()
                                }, 3000)
                            } else {
                                setLog('Unable to give access at the moment, please try again.')
                            }
                        })
                    } else {
                        setLog('Unable to create key for access request.')
                    }
                })
            }
        } else if (props.request.type == 'verification') {
            // Handle verification requests
            // Both accept and declined requests need to be signed.
            request.query = 'sign'
            request.data = props.request.document.encryptedFile
            connectToExtension(request)
            .then(response => {
                if (response && response.status && response.status === 'SUCCESS') {
                    // Prepare the request for API call
                    response.status = status
                    response.requestId = props.request._id
                    fetch(domain + '/application/listen/identity/handleVerification', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + Cookies.get('token')
                        },
                        body: JSON.stringify(response)
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.status === 'SUCCESS') {
                            let toastData = {}
                            toastData.toastShow = true
                            toastData.toastType = 'success'
                            toastData.toastMessage = 'Successfully signed the verification request.'
                            props.handleToast(toastData)
                            setTimeout(() => {
                                location.reload()
                            }, 3000)
                        } else {
                            let toastData = {}
                            toastData.toastShow = true
                            toastData.toastType = 'danger'
                            toastData.toastMessage = 'Unable to sign the verification request at the moment.'
                            props.handleToast(toastData)
                            setTimeout(() => {
                                location.reload()
                            }, 3000)
                        }
                    })
                } else {
                    setLog('Unable to sign the document')
                }
            })
        }
    }

    return (
        <>
            <Col xs={12} md={12} lg={6}>
                <Card
                bg="light"
                text="dark"
                className="m-2 p-4 text-center">
                    <Card.Header className="text-capitalize">
                        <Link href={"/" + otherUser.username}>
                            {otherUser.profile.fullname}
                        </Link> 
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className={styles.cardTitleX1}>
                        </Card.Title>
                        <Card.Text className="text-capitalize font-weight-bold">
                            {props.request.document.record?.recordData.organizationName}
                        </Card.Text>
                        <Card.Text>
                                <Button variant="dark" className={styles.requestActionButton}  onClick={() => viewDocument()} disabled={props.type == "sent" && props.request.type == "access" && props.request.status !== 'accepted'}  block>View Document</Button>
                        </Card.Text>
                    </Card.Body>
                    {
                        (props.type == "sent") ? <p><Badge variant={(props.request.status === 'accepted') ? 'success' : (props.request.status === 'pending') ? 'warning' : 'danger'} className="text-capitalize">{props.request.status}</Badge> </p>
                                            : <>
                                                {
                                                    (props.request.status === "pending") ? 
                                                    <Row>
                                                        <Col>
                                                            <Button variant="danger" className={styles.requestActionButton} onClick={() => handleRequest('declined')} block>Reject</Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="success" className={styles.requestActionButton} onClick={() => handleRequest('accepted')} block>Accept</Button>
                                                        </Col>
                                                    </Row>
                                                    : <p><Badge variant={(props.request.status === 'accepted') ? 'success' : 'danger'} className="text-capitalize">{props.request.status}</Badge> </p>
                                                }
                                              </>
                    }
                </Card>
                <p className='text-danger'>
                    {logMessage}
                </p>
            </Col>
        </>
    )
}

export default RequestCards