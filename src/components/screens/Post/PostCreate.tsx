import { LoadingButton } from '@components/common/LoadingButton'
import { useDataLoginInfoStore } from '@src/zustand'
import { createPost } from '@utils/api'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'

export const PostCreate = () => {
  const imageFile = useRef() as React.MutableRefObject<HTMLInputElement>
  const title = useRef() as React.MutableRefObject<HTMLInputElement>
  const [imageSrc, setImageSrc] = useState<any>('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [_uploadData, setUploadData] = useState()
  const [accessToken] = useDataLoginInfoStore((state: any) => state.accessToken)

  const onChangeFile = (changeEvent: any) => {
    const reader = new FileReader()

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target?.result)
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
    console.log(imageFile)
  }

  const onCreatePost = async (event: { preventDefault: () => void }) => {
    try {
      if (accessToken) {
        setIsLoading(true)

        event.preventDefault()
        const imgFile: any = imageFile.current.files

        const formData = new FormData()

        for (const file of imgFile) {
          formData.append('file', file)
        }

        formData.append('upload_preset', 'english-project')

        const res = await fetch('https://api.cloudinary.com/v1_1/website-selling-game/image/upload', {
          method: 'POST',
          body: formData,
        })

        const rawRes = await res.json()

        if (rawRes) {
          const response = await createPost({
            title: title.current.value,
            imageTitle: rawRes.secure_url,
            description,
            accessToken,
          })
          if (response.success) {
            notify(NOTIFICATION_TYPE.SUCCESS, response.message)
          } else {
            notify(NOTIFICATION_TYPE.ERROR, response.message)
          }
        }
      } else {
        notify(NOTIFICATION_TYPE.ERROR, 'AccessToken is invalid')
      }
    } catch (error: any) {
      console.log(error)
      notify(NOTIFICATION_TYPE.ERROR, 'Add fail')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-[30px] w-full">
      <form onSubmit={onCreatePost} className="w-[800px] mx-auto rounded-lg bg-[#FFFFFF] px-[20px] py-[30px]">
        <div className="text-center font-bold text-[2rem]">Create Post</div>
        <div className="w-full mt-[20px]">
          <div className="text-[1.35rem] font-medium">Title:</div>
          <input
            ref={title}
            className="border-[#808080] rounded-sm border-[1px] outline-none py-[5px] px-[10px] w-full"
          />
        </div>
        <div className="w-full mt-[20px]">
          <div className="text-[1.35rem] font-medium">Upload Image Title:</div>
          <input
            type="file"
            name="file"
            ref={imageFile}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeFile}
          />
          <img src={imageSrc} className="w-[500px] object-cover mx-auto mt-[20px]" />
        </div>

        <div className="mt-[30px]">
          <ReactQuill className="h-[200px]" theme="snow" value={description} onChange={setDescription} />
        </div>
        <LoadingButton type="submit" isLoading={isLoading} content="Create" classNameCustom="mt-[50px]" />
      </form>
    </div>
  )
}
