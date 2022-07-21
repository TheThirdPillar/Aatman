import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

import styles from '../styles/Home.module.css'
import DefaultLayout from '../layout/DefaultLayout'
import ProcessCards from '../components/ProcessCards'

import { FaArrowCircleRight, FaFileAlt, FaCloudUploadAlt, FaStamp, FaThumbsUp, FaCoins } from 'react-icons/fa'

export default function Home() {


  // TODO: Search for token here itsel and redirect to user page if
  // sessions exists.
  const router = useRouter()
  const [isUserSession, setUserSession] = useState(Cookies.get('token'))
  useEffect(() => {
    if (isUserSession) {
      router.push('/user')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Identity 1.0</title>
      </Head>
      <DefaultLayout isUserSession={isUserSession} setUserSession={(session) => setUserSession(session)}>
          <Row>
            <Col xs={12} md={12} lg={6} className="p-3">
              <Jumbotron className="bg-white border-bottom">
                <h1>Hello,</h1>
                <p>
                  Identity lets you create, track and manage digitally verified documents that
                  certify pieces of information about you. All this while you, and only you, decides who gets
                  to access it.
                  <br />
                  <br />
                  While the scope of these information is limited to meta (DL, Aadhar, Passport), educational,
                  professional and other skill certifications for now, we have big plans. Big, big plans.
                </p>
                <p>
                  <Button variant="primary">Learn more | <FaArrowCircleRight /></Button>
                </p>
              </Jumbotron>
            </Col>
            <Col xs={12} md={12} lg={6} className="p-3 mt-lg-4 d-none d-lg-block">
              <Image
                src="/personalInformation.svg" fluid />
            </Col>
          </Row>
          <Row>
            <CardGroup>
              <ProcessCards
                title={<FaFileAlt />}
                text="Update documents to certify a claim, like your education or identity." />
              <ProcessCards
                title={<FaCloudUploadAlt />}
                text="The documents are then encrypted using Shield and uploaded to IPFS for eternity." />
              <ProcessCards
                title={<FaStamp />}
                text="A verification request is sent to the concerned organization or community, who then digitally sign and verify it." />
              <ProcessCards
                title={<FaThumbsUp />}
                text="Other users can then request the verified information, and you are in control, always." />
              <ProcessCards
                title={<FaCoins />}
                text="Every time you open your information to someone, you are paid in fiat currency." />
              <Card bg="primary" className="p-1 m-2 card-block d-flex">
                <Card.Body className="align-items-center d-flex justify-content-center blockquote">
                    <Link href="/"><a className={styles.cardLink}>Wait ! Are you telling me i can make money with my data ? </a></Link>
                </Card.Body>
              </Card>
              </CardGroup>
            </Row>
      </DefaultLayout>
    </>
  )
}
