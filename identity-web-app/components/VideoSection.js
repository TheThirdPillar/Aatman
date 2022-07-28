import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ReactPlayer from 'react-player/youtube'

import styles from '../styles/Dashboard.module.css'
import SectionTitle from './SectionTitle'

import { GrClose } from 'react-icons/gr'

function VideoSection(props) {
  return (
    <>
        <SectionTitle title={props.title} addButtonEnabled={false} />
        {
          (props.hasClose)
            ?
              <Row>
                <Col xs={12} md={12} lg={12} className="d-flex justify-content-end">
                  <GrClose onClick={() => props.closeVideo()} />
                </Col>
              </Row>
            : ''
        }
        <Row className={"m-2 " +  styles.section}>
            <Col xs={12} md={12} lg={12} className={"justify-text-center " + styles.video}>
                <ReactPlayer url={props.url} />
            </Col>
        </Row>
    </>
  )
}

export default VideoSection
