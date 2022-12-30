import { SearchComponent } from 'stipop-react-sdk'

export const StickerPopUp = (props: any) => {
  const onStickerClick = (e: any) => {
    props.stickerUrl(e)
  }

  return (
    <>
      <SearchComponent
        params={{
          apikey: '829e5854bff3a09fcd9e63d240e72dd1',
          userId: 'userId',
        }}
        stickerClick={onStickerClick}
      />
      {/* <PickerComponent
        params={{
          apikey: '829e5854bff3a09fcd9e63d240e72dd1',
          userId: 'userId',
        }}
        stickerClick={onStickerClick}
      /> */}
      {/* <StoreComponent
        params={{
          apikey: '829e5854bff3a09fcd9e63d240e72dd1',
          userId: 'userId',
        }}
        downloadParams={{
          isPurchase: 'S',
          countryCode: 'VN',
        }}
      /> */}
      {/* <UnifiedComponent
        params={{
          apikey: 'apikey',
          userId: 'userId',
        }}
      /> */}
    </>
  )
}
