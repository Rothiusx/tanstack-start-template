import { useRouteContext } from '@tanstack/react-router'

export function useLocale() {
  const locale = useRouteContext({
    from: '__root__',
    select: ({ locale }) => locale,
  })
  return locale
}
