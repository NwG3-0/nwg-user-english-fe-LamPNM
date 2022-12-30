import { MicStart, MicStop } from '@components/common/CustomIcon'
import useRecorder from '@hooks/useRecoder'
import { useDataLoginInfoStore } from '@src/zustand'
import { addSpeakingFile } from '@utils/api'
import { useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'

export const SpeakingPage = () => {
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])
  const { fileAudio, audioURL, isRecording, startRecording, stopRecording }: any = useRecorder()
  const question = useRef() as React.MutableRefObject<HTMLInputElement>

  const onSend = async () => {
    try {
      if (accessToken && fileAudio) {
        const file = new File([fileAudio], `${uuidV4}.mp3`, { type: 'MPEG', lastModified: new Date().getTime() })

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'english-project')
        formData.append('resource_type', 'auto')

        const res = await fetch(`https://api.cloudinary.com/v1_1/website-selling-game/auto/upload`, {
          method: 'POST',
          body: formData,
        })

        const rawRes = await res.json()

        if (rawRes) {
          const response = await addSpeakingFile({
            result: rawRes?.secure_url as string,
            user_id: userInfo?.id,
            skill: 'Speaking',
            topic: 'Reading',
            accessToken,
          })

          console.log(response)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="pt-[30px] w-full">
      <div className="w-[calc(100%-50px)] mx-auto rounded-lg bg-[#FFFFFF] px-[20px] py-[30px]">
        <input ref={question} />
        <audio src={audioURL} controls />
        {isRecording ? (
          <div onClick={stopRecording} className="cursor-pointer">
            <MicStop width={90} height={90} color="" />
          </div>
        ) : (
          <div onClick={startRecording} className="cursor-pointer">
            <MicStart width={90} height={90} color="" />
          </div>
        )}
      </div>
      <audio
        src="https://res.cloudinary.com/website-selling-game/video/upload/v1670766508/english-project/snvop4isxuxecvkiykot.webm"
        controls
      />
      <div onClick={onSend}>Send</div>
    </div>
  )
}
