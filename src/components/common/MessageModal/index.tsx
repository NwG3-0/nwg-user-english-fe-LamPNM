import { USER_INFO } from '@src/models/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { receiveMessage, sendMessage } from '@utils/api'
import { TYPE_MESSAGE } from '@utils/common'
import { safeParseJSON } from '@utils/json'
import { QUERY_KEYS } from '@utils/keys'
import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as io from 'socket.io-client'
import { CloseMessageIcon, EmojiIcon, UserIcon } from '../CustomIcon'
import { GifPopUp } from '../GifPopUp'
import { StickerPopUp } from '../StickerPopUp'

const socket = io.connect('https://nwg-ielts-backend.onrender.com/')

interface Props {
  onOpenMessageModal: () => void
}
export const MessageModal = ({ onOpenMessageModal }: Props) => {
  const queryClient = useQueryClient()
  const refMessage = useRef() as React.MutableRefObject<HTMLInputElement>

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [showGifPopup, setShowGifPopup] = useState<boolean>(false)
  const [showStickerPopup, setShowStickerPopup] = useState<boolean>(false)

  const [page] = useState<number>(1)
  const [messageValue, setMessageValue] = useState<string>('')
  const [receivedMsgData] = useState<any>({})
  const [messageData, setMessageData] = useState<any[]>([])

  const userInfo: any = useMemo(() => {
    if (typeof window !== 'undefined') {
      return safeParseJSON(localStorage.getItem(USER_INFO) as string)
    }
  }, [])
  // const accessToken = useMemo(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem(AUTH_TOKEN)
  //   }
  // }, [])

  useEffect(() => {
    if (userInfo) {
      socket.emit('users', userInfo.id)
    }
  }, [userInfo])

  const onEmojiClick = (e: { emoji: string }) => {
    setMessageValue((preMess: string) => preMess + e.emoji)
  }

  useEffect(() => {
    const updateMessage = (data: any) => {
      setMessageData((prev: any) => [data, ...prev])
    }

    socket.on('received_msg', updateMessage)

    return () => {
      socket.off('received_msg', updateMessage)
    }
  }, [socket])

  const onSend = async () => {
    try {
      if (messageValue != '') {
        const { success } = await sendMessage({
          from: userInfo.id,
          to: '6376f1cced1e5d49d84de006',
          message: messageValue,
          type: 'text',
        })
        if (success) {
          await socket.emit('send_msg', {
            fromSelf: userInfo.id,
            message: messageValue,
            type: TYPE_MESSAGE.TEXT,
            to: '6376f1cced1e5d49d84de006',
          })

          refMessage.current.value = ''
          refMessage.current.focus()
          setMessageValue('')

          queryClient.invalidateQueries([QUERY_KEYS.MESSAGE_LIST])
        }
      }
    } catch (error) {}
  }

  const onSendGiphy = async (url: string, type: TYPE_MESSAGE) => {
    try {
      const { success } = await sendMessage({
        from: userInfo.id,
        to: '6376f1cced1e5d49d84de006',
        message: url,
        type: type,
      })

      if (success) {
        queryClient.invalidateQueries([QUERY_KEYS.MESSAGE_LIST])
        setShowGifPopup(false)
      }
    } catch (error) {}
  }

  const { data: getMessage } = useQuery(
    [QUERY_KEYS.MESSAGE_LIST],
    async () => {
      try {
        const from = userInfo.id
        const to = '6376f1cced1e5d49d84de006'

        const response = await receiveMessage({ from, to, page })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      // enabled: deck && deck.data !== null,
    },
  )

  useEffect(() => {
    if (getMessage && getMessage?.data?.length > 0) {
      setMessageData(getMessage?.data)
    }
  }, [getMessage])

  const onSetSticker = async (stickerUrl: any) => {
    try {
      const { success } = await sendMessage({
        from: userInfo.id,
        to: '6376f1cced1e5d49d84de006',
        message: stickerUrl?.url,
        type: 'sticker',
      })

      if (success) {
        queryClient.invalidateQueries([QUERY_KEYS.MESSAGE_LIST])
        setShowStickerPopup(false)
      }
    } catch (error) {}
  }

  console.log(messageData)

  return (
    <div
      data-aos-offset="50"
      data-aos="fade-left"
      className="fixed z-1 top-[20%] shadow-2xl right-[16px] bg-slate-50 h-[60vh] w-[320px] rounded-lg overflow-hidden"
    >
      <div className="relative w-full h-full">
        <div className="w-full bg-[#808080] p-[10px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <UserIcon width={24} height={24} color="#FFFFFF" />
            <div className="text-[#FFF]">Admin</div>
          </div>
          <div onClick={onOpenMessageModal} className="mr-[10px] cursor-pointer">
            <CloseMessageIcon width={18} height={18} color="#FFFFFF" />
          </div>
        </div>
        <div className="w-full flex-col-reverse flex overflow-y-scroll h-[80%]">
          {messageData.length > 0 &&
            messageData.map((mess: any) => {
              return (
                <div className="w-full ">
                  {mess?.fromSelf === userInfo.id && receivedMsgData ? (
                    <div className="float-right  w-[60%] py-[8px] px-[12px] mr-[16px] rounded-[16px] my-[2px] text-white">
                      {mess.type !== TYPE_MESSAGE.TEXT ? (
                        <img src={mess?.message} alt={mess?.type} />
                      ) : (
                        <div className="break-words w-full rounded-2xl py-[4px] px-[10px] bg-blue-500">
                          {mess.message}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="float-left w-[60%] py-[8px] px-[12px] ml-[16px] rounded-[16px] my-[4px]">
                      {mess.type !== TYPE_MESSAGE.TEXT ? (
                        <img src={mess?.message} alt={mess?.type} />
                      ) : (
                        <div className="break-words rounded-2xl w-full py-[4px] px-[10px] bg-[#e4e6eb]">
                          {mess.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
        <div className="absolute flex bottom-0 bg-slate-50 h-[48px] w-full">
          <input
            className=" absolute cursor-pointer right-[48px] top-[50%] translate-y-[-50%] h-[30px] bg-slate-200 outline-none bg-transparent px-[8px] py-[4px] mx-auto block rounded-[20px]"
            placeholder="Aa"
            value={messageValue}
            ref={refMessage}
            onChange={(e) => {
              setMessageValue(e.target.value)
            }}
          />
          <div
            className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-[52px] hover:scale-125"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker)
            }}
          >
            <EmojiIcon width={24} height={24} color={'#0084ff'} />
          </div>
          <div className="absolute cursor-pointer top-[50%] translate-y-[-50%] left-[8px]">
            <img
              className="block m-0 w-[24px] h-[28px] py-[4px] hover:scale-125"
              src="/images/GifIcon.webp"
              alt=""
              onClick={() => setShowGifPopup(!showGifPopup)}
            />
            {showGifPopup && (
              <div className="absolute bottom-[36px] w-[360px]">
                <GifPopUp onSendGiphy={onSendGiphy} />
              </div>
            )}
          </div>
          <div className="absolute cursor-pointer top-[50%] translate-y-[-50%] left-[40px]">
            <img
              className="block m-0 w-[24px] h-[28px] py-[4px] hover:scale-125"
              src="/images/StickerIcon.webp"
              alt=""
              onClick={() => setShowStickerPopup(!showStickerPopup)}
            />
            {showStickerPopup && (
              <div className="absolute bottom-[36px] left-[-50px] w-[400px]">
                <StickerPopUp stickerUrl={onSetSticker} />
              </div>
            )}
          </div>

          <div
            className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-[8px] hover:scale-125"
            onClick={onSend}
          >
            <img className="block m-0 w-[32px] h-[32px] py-[4px]" src="/images/send-message.webp" />
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className="w-[50px] absolute bottom-[48px] cursor-pointer">
          <EmojiPicker width={320} height={360} lazyLoadEmojis={true} onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  )
}
