import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import Logo from './Logo'
import { FaArrowCircleDown, FaSignInAlt, FaSignOutAlt, FaRegIdCard, FaWallet, FaFolder } from 'react-icons/fa'
import { RiSendPlane2Fill } from "react-icons/ri"
import { MdExplore } from 'react-icons/md'

function Topbar(props) {
  
  const router = useRouter()
  const isUserSession = props.isUserSession
  const isShieldInstalled = props.isShieldInstalled
  const [navLinkDisabled, toggleNavLink] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  useEffect(() => {
    if (router.pathname === '/user') {
      setActiveKey(1)
    } else if (router.pathname === '/user/request') {
      setActiveKey(2)
    } else if (router.pathname === '/user/wallet') {
      setActiveKey(3)
    } else if (router.pathname === '/user/documents') {
      setActiveKey(4)
    } else if (router.pathname === '/user/explorer') {
      setActiveKey(5)
    } else if (router.pathname === '/user/onboarding') {
      toggleNavLink(true)
    }
  }, [])

  const handleShieldInstallation = () => {
    window.open('https://chrome.google.com/webstore/detail/skillschain-shield/jfjlbdapmilmhjhcjmkjngemobhkjpgh', '_blank', 'location=yes,height=200,width=720,scrollbars=yes,status=yes, left: 100, top: 200');
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Navbar bg="white" expand="lg" sticky="top">
            <Navbar.Brand href={(isUserSession) ? '/user' : '/'}>
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle />
            {isUserSession &&
              <Navbar.Collapse className="justify-content-center">
                <Nav activeKey={activeKey}>
                  <Nav.Item>
                    <Nav.Link eventKey={1} href="/user" disabled={navLinkDisabled}><FaRegIdCard /> Dashboard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={2} href="/user/request" disabled={navLinkDisabled}><RiSendPlane2Fill /> Requests</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={3} href="/user/wallet" disabled={navLinkDisabled}><FaWallet /> Wallet</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={4} href="/user/documents" disabled={navLinkDisabled}><FaFolder /> Documents</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey={5} href="#" disabled><MdExplore /> Explorer <sup><Badge variant="dark">Coming Soon</Badge></sup></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            }
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {!isShieldInstalled &&
                  <Button variant="primary" size="md" block="true" onClick={() => handleShieldInstallation()}>
                    Download Shield | <FaArrowCircleDown />
                  </Button>
                }
                {(isShieldInstalled && !isUserSession) &&
                  <Button variant="success" size="md" onClick={props.handleLogin} >
                    Shield Login | <FaSignInAlt />
                  </Button>
                }
                {(isShieldInstalled && isUserSession) &&
                  <Button variant="dark" size="md" onClick={props.handleLogout}>
                    Shield Logout | <FaSignOutAlt />
                  </Button>
                }
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </>
  )
}

export default Topbar
