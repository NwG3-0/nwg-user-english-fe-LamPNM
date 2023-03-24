import { useQuery } from '@tanstack/react-query'
import { checkCard } from '@utils/api'
import { useState } from 'react'
import HotKeys from 'react-hot-keys'
import { CustomModal } from '@components/common/CustomModal'
import { SaveCardModal } from '@components/widgets/SaveCardModal'
import { MessageIcon } from '@components/common/CustomIcon'
import { DictionaryModal } from '@components/common/DictionaryModal'
import { MessageModal } from '@components/common/MessageModal'
import { QUERY_KEYS } from '@utils/keys'
import { useDataLoginInfoStore, useOpenHeaderStore } from '@src/zustand'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'

const trueHotKeysWindow = 'alt+m'
const trueHotKeysMacOS = 'command+m'

export const MenuWeb = () => {
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])
  const [isOpen] = useOpenHeaderStore((state: any) => [state.isOpen, state.setIsOpen])

  const [isOpenDictionary, setIsOpenDictionary] = useState<boolean>(false)
  const [isMessageModal, setIsMessageModal] = useState<boolean>(false)
  const [isOpenSaveCardModal, setIsSaveCardModal] = useState<boolean>(false)
  const [searchWordValue, setSearchWordValue] = useState<string>('')
  const [saveChecked, setSaveChecked] = useState<boolean>(false)

  const { data: wordDetail, isLoading: isLoadingWord } = useQuery(
    [QUERY_KEYS.NEW_WORD, searchWordValue],
    async () => {
      try {
        const response = await fetch(`/api/get-meaning-word?searchWord=${searchWordValue}`, {
          method: 'GET',
        })

        const { data, success } = await response.json()

        if (success) {
          return data
        }

        return
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: searchWordValue !== '' && isOpenDictionary,
      refetchOnWindowFocus: false,
    },
  )

  const onSearch = async (wordSearch: string) => {
    setSearchWordValue(wordSearch)
    try {
      const userId = userInfo?.id
      if (accessToken) {
        const { data: dataCheck } = await checkCard({ word: wordSearch, userId })
        if (dataCheck) {
          setSaveChecked(true)
        } else {
          setSaveChecked(false)
        }
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Invalid word')
    }
  }

  const onCloseDictionaryModal = () => {
    setIsOpenDictionary(false)
  }

  const onOpenMessageModal = () => {
    setIsMessageModal(!isMessageModal)
  }

  const onOpenSaveCardModal = () => {
    setIsSaveCardModal(true)
  }

  const onKeyUp = (keyName: string) => {
    if (keyName === trueHotKeysWindow || keyName === trueHotKeysMacOS) {
      setIsOpenDictionary((prev) => !prev)
    }
  }

  return (
    <div className={`${isOpen && 'hidden'} relative z-100`}>
      <HotKeys keyName="alt+d" onKeyUp={onKeyUp}>
        {isOpenDictionary && (
          <DictionaryModal
            isLoading={isLoadingWord}
            word={wordDetail}
            onSearch={onSearch}
            onCloseDictionaryModal={onCloseDictionaryModal}
            onOpenSaveCardModal={onOpenSaveCardModal}
            isSave={saveChecked}
          />
        )}
      </HotKeys>
      {!isOpenDictionary && (
        <div
          data-aos-offset="0"
          data-aos="fade-left"
          data-aos-delay="500"
          onClick={() => {
            setIsOpenDictionary(true)
          }}
          className="fixed right-[12px] top-[50%] "
        >
          <img className="hover:scale-125 cursor-pointer w-[64px] h-[64px]" src="/images/DictionaryIcon.webp" />
        </div>
      )}
      <HotKeys keyName="alt+m" onKeyUp={onKeyUp}>
        {isMessageModal && <MessageModal onOpenMessageModal={onOpenMessageModal} />}
      </HotKeys>

      {!isMessageModal && (
        <div
          data-aos-offset="0"
          data-aos="fade-left"
          data-aos-delay="500"
          onClick={() => {
            setIsMessageModal(true)
          }}
          className="fixed right-[12px] top-[60%] hover:scale-125 cursor-pointer"
        >
          <MessageIcon width={72} height={72} color={''} />
        </div>
      )}
      <CustomModal
        classNameCustom="w-[500px]"
        isOpen={isOpenSaveCardModal}
        onRequestClose={() => setIsSaveCardModal(false)}
      >
        <SaveCardModal word={wordDetail} onRequestClose={() => setIsSaveCardModal(false)} />
      </CustomModal>
    </div>
  )
}
