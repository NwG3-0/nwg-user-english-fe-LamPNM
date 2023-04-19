import { useDataLoginInfoStore } from '@src/zustand'
import { DataLoginInfo } from '@utils/zustand'

export const requireAuthenticated =
  (WrappedComponent: React.FC<React.PropsWithChildren<Record<string, never>>>) => (props: any) => {
    const [userInfo, accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.userInfo, state.accessToken])

    if (typeof window !== 'undefined' && !!!userInfo && !!!accessToken) {
      window.location.href = '/login'
    }

    return <WrappedComponent {...props} />
  }
