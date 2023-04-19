import { AUTH_TOKEN, USER_INFO } from '@src/models/api'

export const requireAuthenticated =
  (WrappedComponent: React.FC<React.PropsWithChildren<Record<string, never>>>) => (props: any) => {
    if (typeof window !== 'undefined' && !!!localStorage.getItem(USER_INFO) && !!!localStorage.getItem(AUTH_TOKEN)) {
      window.location.href = '/login'
    }

    return <WrappedComponent {...props} />
  }
