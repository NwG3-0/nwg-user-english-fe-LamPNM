export interface GiphyData {
  id: number
  title: string
  images: {
    fixed_width: {
      webp: string
    }
    fixed_width_small: {
      webp: string
    }
  }
}
