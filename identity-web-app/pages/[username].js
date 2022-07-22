import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import Spinner from 'react-bootstrap/Spinner'

import DefaultLayout from '../layout/DefaultLayout'
import ProfileSection from '../components/ProfileSection'
import WellBeingSection from '../components/WellBeingSection'
import SkillSection from '../components/SkillSection'
import RecordSection from '../components/RecordSection'
import VirtueSection from '../components/VirtueSection'
import SoftskillSection from '../components/SoftskillSection'
import CustomModal from '../components/Modal'
import CommunitySection from '../components/CommunitySection'
import VideoSection from '../components/VideoSection'
import ErrorSection from '../components/ErrorSection'

import { domain } from '../config/config'

const introTitle = "A brief introduction about me"
const dreamsTitle = "My dreams and vision"

export default function PublicProfile() {

    const router = useRouter()
    const { username } = router.query

    // Show video 
    const [showVideo, toggleShowVideo] = useState(true)
    const [videoURL, setVideoURL] = useState()
    const [isUserSession, setUserSession] = useState(Cookies.get('token'))
    const [modalShow, setModalShow] = useState({show: false, form: {}})
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if ( userData == null && username) {
            fetch(domain + '/user/getidentityprofile?username=' + username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + isUserSession
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS' && data.user && data.user.username) {
                    setUserData(data.user)
                    
                    if (data.user.profile?.social?.youtube)
                    setVideoURL(data.user.profile.social.youtube)
                    else toggleShowVideo(false)

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

                } 

                if (data.status === 'SUCCESS' && data.user == null) {
                    setUserData(false)
                }

                // TODO: Handle other possible errors.
            })
        }        
    }, [userData, username])

    // Dreams, softskills, virtues
    const [hasDreams, setDream] = useState(false)
    const [dreamsUrl, setDreamsUrl] = useState()

    const [hasSoftskillEndorsement, setSoftskillEndorsement] = useState(false)
    const [softskillsUrl, setSoftskillsUrl] = useState()
    
    const [hasVirtueEndorsement, setVirtueEndorsement] = useState(false)
    const [virtueUrl, setVirtueUrl] = useState()

    if (userData == null) return (
        <Spinner animation="grow" variant="primary" size="sm" style={{marginTop: '20%', marginLeft: '45%'}} />
    )

    if (!userData) return (
        <>
            <Head>
                <title>Identity - Public Profile</title>
            </Head>
            <DefaultLayout isUserSession={isUserSession} toggleSession={(session) => setUserSession(session)}>
                <ErrorSection msg="User not found." />
            </DefaultLayout>
        </>
    )

    // Handle modal
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
    
    return (
        <>
            <Head>
                <title>Identity - Public Profile</title>
            </Head>
            <DefaultLayout isUserSession={isUserSession} toggleSession={(session) => setUserSession(session)}>
                <ProfileSection user={userData?.profile} username={userData?.username} handleModalShow={(form) => handleModalShow(form)} isPublic={true} playMedia={(url) => handleVideo(url)} />
                {
                    (showVideo)
                        ? <VideoSection url={videoURL} showVideo={showVideo} closeVideo={() => handleVideoClose()} hasClose={true} title={introTitle} />
                        : ""
                }
                <WellBeingSection title="Well-being/Productivity Score" subtitle={userData.wellbeing?.validator} isPublic={true} />
                <SkillSection title="Hard Skills" skills={userData?.skillRecords} handleModalShow={(form) => handleModalShow(form)} isPublic={true} />
                <SoftskillSection title="Soft Skills" softskills={userData?.softskills} isPublic={true} endorsed={hasSoftskillEndorsement} endoresementUrl={softskillsUrl} />
                <VirtueSection title="Virtues" virtues={userData?.virtues} isPublic={true} endorsed={hasVirtueEndorsement} endoresementUrl={virtueUrl} />
                {
                    (hasDreams)
                        ? <VideoSection url={dreamsUrl} showVideo={hasDreams} hasClose={false} title={dreamsTitle} />
                        : ""
                }
                <CommunitySection title="Community" communities={userData?.communities} isPublic={true} />
                <RecordSection title="Education" handleModalShow={(form) => handleModalShow(form)} records={userData?.educationRecords} isPublic={true} />
                <RecordSection title="Work" handleModalShow={(form) => handleModalShow(form)} records={userData?.professionalRecords} isPublic={true} />
                <CustomModal show={modalShow.show} onHide={() => handleModalClose()} form={modalShow.form.type} formData={modalShow.form.data} isPublic={true} />
            </DefaultLayout>
        </>
    )
}