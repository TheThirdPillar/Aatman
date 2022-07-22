import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import styles from '../styles/Dashboard.module.css'
import SectionTitle from './SectionTitle'
import { GrYoutube } from 'react-icons/gr'

function SoftskillSection(props) {

    return (
        <>
            <SectionTitle title={props.title} icon={<GrYoutube/>} iconEnabled={props.endorsed} iconUrl={props.endoresementUrl} addButtonEnabled={!props.isPublic} handleAdd={() => props.handleModalShow({type: "9", data: {softskills: props.softskills}})} />
            <Row className="justify-content-center m-2">
                <Col xs={12} md={12} lg={12}>
                    <CardDeck className={styles.section}>
                        {
                            props.softskills?.map((softskill, index) => {
                                return (
                                    <Button variant="warning" key={index} className="text-uppercase p-4 m-2">
                                        {softskill} <Badge variant="light">0</Badge>
                                    </Button>
                                )
                            })
                        }
                    </CardDeck>
                </Col>
            </Row>
        </>
    )
}

export default SoftskillSection
