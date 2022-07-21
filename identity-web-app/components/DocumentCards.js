import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { FcDataEncryption } from 'react-icons/fc'

import styles from '../styles/Dashboard.module.css'
import connectToExtension from '../utils/extension'

function DocumentCards(props) {

  const viewDocument = (document) => {
    let encryptedKey = document.encryptedKey
    let encryptedData = document.encryptedFile
    let request = {}
    request.query = 'decrypt'
    request.data = {
      encryptedData: encryptedData,
      encryptedKey: encryptedKey,
      originalPublicKey: false
    }
    connectToExtension(request)
    .then((response) => {
      if (response && response.status === 'SUCCESS') {
          // Show in a different tab
          let imageSource = response.decryptedData
          var image = new Image()
          image.src = imageSource
          var w = window.open("")
          w.document.write(image.outerHTML)
      } else {
          setResponse('Failed to decrypt document.')
          setClass('danger')
      }
    })
  }

  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Card
          bg="dark"
          text="white"
          className="mt-4 mb-4 p-1 text-center">
          <Card.Header>
            <FcDataEncryption />
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-capitalize">
              Untitled
            </Card.Title>
            <Button variant="primary" onClick={() => viewDocument(props.document)}>View Document</Button>
          </Card.Body>
          <Card.Footer>
            Last Updated <Badge variant="success">{new Date(props.document.dateCreated).toLocaleDateString()}</Badge>
          </Card.Footer>
        </Card>
      </Col>
    </>
  )
}

export default DocumentCards
