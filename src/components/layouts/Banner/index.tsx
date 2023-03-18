import ImgWithFallback from '@components/common/ImgWithFallback'

export interface Props {
  path: string
}

export type TRACKING_TYPE =
  | 'TELEGRAM'
  | 'DISCORD'
  | 'TWITTER'
  | 'FACEBOOK'
  | 'YOUTUBE'
  | 'TIKTOK'
  | 'MEDIUM'
  | 'DOWNLOAD_IOS'
  | 'DOWNLOAD_ANDROID'
  | 'PLAY_PC'

export const TRACKING_EVENT: Record<TRACKING_TYPE, string> = {
  TELEGRAM: 'CUSTOM_EVENT_1',
  DISCORD: 'CUSTOM_EVENT_2',
  TWITTER: 'CUSTOM_EVENT_3',
  FACEBOOK: 'CUSTOM_EVENT_4',
  YOUTUBE: 'CUSTOM_EVENT_5',
  TIKTOK: 'ADD_CARD',
  MEDIUM: 'AD_VIEW',
  DOWNLOAD_IOS: 'AD_CLICK',
  DOWNLOAD_ANDROID: 'PURCHASE',
  PLAY_PC: 'COMPLETE_TUTORIAL',
}
export const Banner = ({ path }: Props) => {
  const onTrackingData = (type: TRACKING_TYPE) => {
    void (window as any).snaptr('track', TRACKING_EVENT[type])
  }

  return (
    <div
      className={`relative w-full min-h-screen flex items-center bg-cover overflow-hidden`}
      style={{ backgroundImage: `url(${path})` }}
    >
      <div className="w-full h-full bg-[#00000056] absolute z-1" />
      <div className="mx-auto w-fit break-words relative z-20">
        <div className="sm:w-[373px] pt-10 mx-auto">
          <img src="/images/logo_background.svg" alt="The logo background" />
          <div className="text-[42px] w-[250px] bg-[#1a9664] py-[6px] rounded-md text-center font-semibold text-[#FFFFFF] mx-auto cursor-pointer mt-[10px]">
            Discovery
          </div>
          <div className="grid grid-cols-2 gap-4 md:flex justify-between pt-5 text-center">
            <div className="hover:scale-105 transition-all duration-300 cursor-pointer flex justify-center">
              <a
                href="https://apps.apple.com/app/id1448353176"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => onTrackingData('DOWNLOAD_IOS')}
              >
                <ImgWithFallback
                  src="/images/btn-ios.webp"
                  fallback="/images/btn-ios.png"
                  alt="Titan Hunters on App Store"
                />
              </a>
            </div>
            <div className="hover:scale-105 transition-all duration-300 cursor-pointer flex justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=topebox.games.titanhunters"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => onTrackingData('DOWNLOAD_ANDROID')}
              >
                <ImgWithFallback
                  src="/images/btn-android.webp"
                  fallback="/images/btn-android.png"
                  alt="Titan Hunters on Google Play Store"
                />
              </a>
            </div>
          </div>
        </div>
        <p className="text-[#FFFFFF] font-bold text-[48px] md:text-[58px] drop-shadow-xl pt-[20px]">
          English is your future, time to learn it!
        </p>
      </div>
    </div>
  )
}
