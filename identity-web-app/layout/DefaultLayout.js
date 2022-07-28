import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container'

import connectToExtension from '../utils/extension'

function DefaultLayout(props) {

  const router = useRouter()
  const [isShieldInstalled, toggleShieldIsInstalled] = useState(false)
  const [isChrome, toggleIsChrome] = useState(true);
  useEffect(() => {
    // Check if shield is installed
    if (!isShieldInstalled) {
      let request = {
        query: 'isExtensionAvailable'
      }
      connectToExtension(request)
      .then((response) => {
        if (response.status == 'SUCCESS') toggleShieldIsInstalled(true)
      })
      .catch((error) => {
        console.info(error.message);
        if (error.message === 'chrome is not defined') {
          toggleIsChrome(false);
        }
      })
    }
  }, [isShieldInstalled])

  const handleLogin = () => {
    let request = {}
    request['query'] = 'shieldLogin'
    request['applicationId'] = 'identity'
    connectToExtension(request)
    .then((response) => {
      if (response.status === 'SUCCESS') {
        Cookies.set('token', response.token)
        props.setUserSession(true)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleLogout = () => {
    let request = {}
    request['query'] = 'shieldLogout'
    request['applicationId'] = 'identity'
    connectToExtension(request)
      .then((response) => {
        if (response.status === 'SUCCESS') {
          Cookies.remove('token')
          router.push('/')
        }
      })
  }
  
  return (
    <>
      <Container fluid>
        <Topbar isUserSession={props.isUserSession} setUserSession={(session) => props.toggleSesion(session)} isShieldInstalled={isShieldInstalled} handleLogin={handleLogin} handleLogout={handleLogout} isChrome={isChrome} />
        <div>
          {props.children}
        </div>
          {
            (!props.isUserSession) ? <Footer /> : <></>
          }
      </Container>
    </>
  )
}

export default DefaultLayout
