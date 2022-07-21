import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import CardDropdown from './CardDropdown'

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function RecordCards(props) {
  const record = props.record.recordData
  const documents = props.record.documents.length
  let startDate, endDate
  // TODO: Add Date react component
  if (props.record.type === "education") {
    startDate = (new Date(record.startDate)).getFullYear()
    endDate = (record.endDate) ? (new Date(record.endDate)).getFullYear() : 'Present'
  } else {
    startDate = months[(new Date(record.startDate)).getMonth()] + ' ' + (new Date(record.startDate)).getFullYear()
    endDate = (record.endDate) ? months[(new Date(record.endDate)).getMonth()] + ' ' + (new Date(record.endDate)).getFullYear() : 'Present'
  }

  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Card
          style={{background: '#d9d9d9'}}
          text="black"
          className="mt-2 mb-4 p-1 text-center">
          <span className="text-right">
            {
              (!props.isPublic) ? <CardDropdown color='#000000' handleEdit={() => props.handleEdit()} handleDelete={() => props.handleDelete()} /> : <></>
            }
          </span>
          <Card.Body>
            <Card.Title className="text-capitalize">
              {record.organizationName}
              {
                (record.parentOrganizationName)
                  ? 
                    <>
                      <br />
                      <sub>{record.parentOrganizationName.toUpperCase()}</sub>
                    </>
                  : ''
              }
            </Card.Title>
            <Card.Text className="text-capitalize">
              {(record.certificationName) ? record.certificationName : ''} {(record.specialization) ? record.specialization : record.position}
            </Card.Text>
            <Card.Text>
              {startDate} - {endDate}
            </Card.Text>
            {
              (props.isPublic) 
                ? 
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Login to view</Tooltip>}>
                    <span className="d-inline-block">
                      <Button variant="dark" onClick={props.handleDocuments} disabled style={{ pointerEvents: 'none' }}>View Documents</Button> 
                    </span>
                  </OverlayTrigger>
                : <Button variant="dark" onClick={props.handleDocuments}>Manage Documents</Button>
            }
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default RecordCards
