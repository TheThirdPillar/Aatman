import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Spinner from 'react-bootstrap/Spinner'

import DefaultLayout from '../../layout/DefaultLayout'
import ProfileSection from '../../components/ProfileSection'
import RecordSection from '../../components/RecordSection'
import SkillSection from '../../components/SkillSection'
import SoftskillSection from '../../components/SoftskillSection'
import VirtueSection from '../../components/VirtueSection'
import CommunitySection from '../../components/CommunitySection'
import VideoSection from '../../components/VideoSection'
import WellBeingSection from '../../components/WellBeingSection'

import CustomModal from '../../components/Modal'

import { domain } from '../../config/config'


// Section headers
// Remember: Section Title should be generated from a config file

const introTitle = "A brief introduction about me"
const dreamsTitle = "My dreams and vision"

export default function UserDashboard() {

  const router = useRouter()
  const [isUserSession, setUserSession] = useState(Cookies.get('token'))
  const [userData, setUserData] = useState()

  // Video Section
  const [showVideo, toggleShowVideo] = useState(false)
  const [videoURL, setVideoURL] = useState()

  // Dreams, softskills, virtues
  const [hasDreams, setDream] = useState(false)
  const [dreamsUrl, setDreamsUrl] = useState()

  const [hasSoftskillEndorsement, setSoftskillEndorsement] = useState(false)
  const [softskillsUrl, setSoftskillsUrl] = useState()
  
  const [hasVirtueEndorsement, setVirtueEndorsement] = useState(false)
  const [virtueUrl, setVirtueUrl] = useState()

  useEffect(() => {
    if (!userData && !isUserSession) router.push('/')
    if (!userData && isUserSession) {
      fetch(domain + '/application/listen/identity/getUserData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + isUserSession
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'SUCCESS') {
          if (!data.user.username) return router.push('/user/onboarding')
          setUserData(data.user)

          if (data.user.profile?.social?.youtubeDreams) {
            setDreamsUrl(data.user.profile.social.youtubeDreams)
            setDream(true)
          }

          if (data.user.profile?.social?.youtubeSoftskills) {
            setSoftskillsUrl(data.user.profile.social.youtubeSoftskills)
            setSoftskillEndorsement(true)
          }

          if (data.user.profile?.social?.youtubeVirtues) {
            setVirtueUrl(data.user.profile.social.youtubeVirtues)
            setVirtueEndorsement(true)
          }

          updateProductivityStacks(data.user.wellBeingStacks)
          updateWellBeingValidation(data.user.wellBeingValidation)
          updateSoftskills(data.user.softskills)
          updateVirtues(data.user.virtues)
          updateCommunities(data.user.communities)
        } else {
          return (<h2>Unable to fetch user data.</h2>)
        }
      })
      .catch(error => {
        console.error(error)
        return (<h2>Unable to fetch user data.</h2>)
      })
    }
  }, [isUserSession])

  // TODO: Segregate all fields of user data
  // TODO: Create Backend data models for front end also
  const [softskills, updateSoftskills] = useState([])
  const [virtues, updateVirtues] = useState([])
  const [communities, updateCommunities] = useState([])
  const [productivityStacks, updateProductivityStacks] = useState()
  const [wellBeingValidation, updateWellBeingValidation] = useState()
  // TODO: Optimize performance - should only recalculate 
  // TODO: when productivityStack is updated.
  // I tried passing [productivityStack], but its not recalculating.
  const [overallScore, updateOverallScore] = useState()
  useEffect(() => {
    console.log("Stack updated")
    if (!productivityStacks || productivityStacks.length == 0) return  
    let localOverallScore = 0
    productivityStacks?.forEach(stack => {
        let score = 0
        for (var q of Object.keys(stack.stackRatings)) {
            score = score + Number(stack.stackRatings[q])
        }
        localOverallScore = localOverallScore + score  
    })
    updateOverallScore(localOverallScore)
  })

  // Handle modal
  const [modalShow, setModalShow] = useState({show: false, form: {}})
  const handleModalShow = (form) => {
    setModalShow({show: true, form: form})
  }
  const handleModalClose = () => {
    setModalShow({show: false, form: {}})
  }

  const handleVideo = (url) => {
    setVideoURL(url)
    toggleShowVideo(true)
  }

  const handleVideoClose = () => {
      toggleShowVideo(false)
      setVideoURL('')
  }

  const updateStack = (updatedStack) => {
    // Pass the updated stack
    // update `productivityStack`
    let currentStacks = productivityStacks
    let index = currentStacks.findIndex(stack => stack._id == updatedStack._id && stack.stackName == updatedStack.stackName)

    if (index < 0) {
      currentStacks.push(updatedStack)
    } else {
      currentStacks[index] = updatedStack
    }
    updateProductivityStacks(currentStacks)
  }

  const handleIdentityDocuments = () => {
    handleModalClose()
    handleModalShow({type: "12", data: userData.identityDocuments})
  }

  const handleValidationRequest = (wellBeingValidation) => {
    updateWellBeingValidation(wellBeingValidation)
  }

  if (!userData) return (
    <Spinner animation="grow" variant="primary" size="sm" style={{marginTop: '30%', marginLeft: '50%'}} />
  )

  return (
    <>
      <Head>
        <title>Identity - Dashboard</title>
      </Head>
      <DefaultLayout isUserSession={isUserSession} toggleSesion={(session) => setUserSession(session)} >
        <ProfileSection user={userData?.profile} username={userData?.username} documents={userData?.identityDocuments}  handleModalShow={(form) => handleModalShow(form)} isPublic={false} playMedia={(url) => handleVideo(url)} />
        {
            (showVideo)
                ? <VideoSection url={videoURL} showVideo={showVideo} closeVideo={() => handleVideoClose()} hasClose={true} title={introTitle} />
                : ""
        }
        <WellBeingSection title="Well-being Info" validation={wellBeingValidation} score={overallScore} stacks={productivityStacks} handleModalShow={(form) => handleModalShow(form)} handleValidationRequest={(wellBeingValidation) => handleValidationRequest(wellBeingValidation)} isPublic={false} />
        <SkillSection title="Hard Skills" skills={userData?.skillRecords} handleModalShow={(form) => handleModalShow(form)} isPublic={false} />
        <SoftskillSection title="Soft Skills" softskills={softskills} handleModalShow={(form) => handleModalShow(form)} isPublic={false} endorsed={hasSoftskillEndorsement} endoresementUrl={softskillsUrl} />
        <VirtueSection title="Virtues" virtues={virtues} isPublic={false} handleModalShow={(form) => handleModalShow(form)} endorsed={hasVirtueEndorsement} endoresementUrl={virtueUrl} />
        {
            (hasDreams)
                ? <VideoSection url={dreamsUrl} showVideo={hasDreams} hasClose={false} title={dreamsTitle} />
                : ""
        }
        <CommunitySection title="Communities" communities={communities} isPublic={false} handleModalShow={(form) => handleModalShow(form)} />
        <RecordSection title="Education" handleModalShow={(form) => handleModalShow(form)} records={userData?.educationRecords} isPublic={false} />
        <RecordSection title="Work Experience" handleModalShow={(form) => handleModalShow(form)} records={userData?.professionalRecords} isPublic={false} />
        <CustomModal show={modalShow.show} onHide={() => handleModalClose()} form={modalShow.form.type} formData={modalShow.form.data} object={modalShow.form.object} isPublic={false} updateVirtues={(list) => updateVirtues(list)} updateUserCommunities={(list) => updateCommunities(list)} updateSoftskills={(list) => updateSoftskills(list)} updateStack={(updatedStack) => updateStack(updatedStack)} handleIdentityDocuments={() => handleIdentityDocuments()}/>
      </DefaultLayout>
    </>
  )
}
