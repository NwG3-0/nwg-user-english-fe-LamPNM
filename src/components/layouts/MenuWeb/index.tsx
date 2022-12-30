import { AUTH_TOKEN, USER_INFO } from '@src/models/api'
import { useQuery } from '@tanstack/react-query'
import { checkCard, getDictionary } from '@utils/api'
import { safeParseJSON } from '@utils/json'
import { useMemo, useState } from 'react'
import HotKeys from 'react-hot-keys'
import { CustomModal } from '@components/common/CustomModal'
import { SaveCardModal } from '@components/widgets/SaveCardModal'
import { MessageIcon } from '@components/common/CustomIcon'
import { DictionaryModal } from '@components/common/DictionaryModal'
import { MessageModal } from '@components/common/MessageModal'
import { QUERY_KEYS } from '@utils/keys'

const trueHotKeysWindow = 'alt+m'
const trueHotKeysMacOS = 'command+m'

export const MenuWeb = () => {
  const [isOpenDictionary, setIsOpenDictionary] = useState<boolean>(false)
  const [isMessageModal, setIsMessageModal] = useState<boolean>(false)
  const [isOpenSaveCardModal, setIsSaveCardModal] = useState<boolean>(false)
  const [searchWordValue, setSearchWordValue] = useState<string>('')
  const [saveChecked, setSaveChecked] = useState<boolean>(false)

  const userInfo: any = useMemo(() => {
    if (typeof window !== 'undefined') {
      return safeParseJSON(localStorage.getItem(USER_INFO) as string)
    }
  }, [])

  const accessToken = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN)
    }
  }, [])

  const { data: wordDetail, isLoading: isLoadingWord } = useQuery(
    [QUERY_KEYS.DICTIONARY_SEARCH, searchWordValue],
    async () => {
      try {
        const response = await getDictionary(searchWordValue)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: searchWordValue !== '' && isOpenDictionary,
    },
  )

  const onSearch = async (wordSearch: string) => {
    setSearchWordValue(wordSearch)
    let word = wordSearch
    try {
      const userId = userInfo?.id
      if (accessToken) {
        const { data: dataCheck } = await checkCard({ word, userId })
        if (dataCheck) {
          setSaveChecked(true)
        } else {
          setSaveChecked(false)
        }
      }
    } catch (error) {}
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
    <div className="relative z-[1000]">
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
        <SaveCardModal word={wordDetail} />
      </CustomModal>
    </div>
  )
}
