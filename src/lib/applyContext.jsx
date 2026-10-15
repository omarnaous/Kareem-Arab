import { createContext, useCallback, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from './scroll'
import { track } from './contact'

const ApplyContext = createContext(null)

export function ApplyProvider({ children }) {
  const [offer, setOffer] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goTo = useCallback(
    (id) => {
      if (pathname !== '/') {
        navigate('/#' + id)
        return
      }
      scrollToId(id)
    },
    [navigate, pathname],
  )

  const startApplication = useCallback(
    (offerId = '') => {
      if (offerId) setOffer(offerId)
      track('apply_click', { offer: offerId || 'none' })
      goTo('apply')
    },
    [goTo],
  )

  return <ApplyContext.Provider value={{ offer, setOffer, startApplication, goTo }}>{children}</ApplyContext.Provider>
}

export const useApply = () => useContext(ApplyContext)
