import React from 'react'

import { Providers } from './providers'
import { Home } from './windows/home'


export const App: React.VFC = () => {
  const option = {
    page: '',
    title: '',
  }
  window.location.search
    .substring(1)
    .split('&')
    .forEach((o) => {
      const [key, value] = o.split('=')
      key && (option[key as keyof typeof option] = decodeURIComponent(value))
    })

  const Content = () => {
    switch (option.page) {
      case 'home':
        return <Home />
      default:
        return <></>
    }
  }

  return (
    <Providers>
      <Content />
    </Providers>
  )
}
