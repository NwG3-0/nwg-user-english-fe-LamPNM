import { useEffect, useState } from 'react'

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState<string>('')
  const [fileAudio, setFileAudio] = useState<Blob | MediaSource>()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error)
      }
      return
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start()
    } else {
      recorder.stop()
    }

    // Obtain the audio when ready.
    const handleData = (e: { data: Blob | MediaSource }) => {
      setFileAudio(e.data)
      setAudioURL(URL.createObjectURL(e.data))
    }

    recorder.addEventListener('dataavailable', handleData)
    return () => recorder.removeEventListener('dataavailable', handleData)
  }, [recorder, isRecording])

  const startRecording = () => {
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  return { fileAudio, audioURL, isRecording, startRecording, stopRecording }
}
const requestRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  return new MediaRecorder(stream)
}
export default useRecorder
