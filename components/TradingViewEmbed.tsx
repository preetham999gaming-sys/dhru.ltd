/* globals window */
'use client'
import { useEffect } from 'react'

export default function TradingViewEmbed({ id = 'tv_embed', widgetConfig = {} }: { id?: string, widgetConfig?: any }) {
  useEffect(() => {
    const existing = document.getElementById(id)
    if (!existing) return
    if ((window as any).TradingView) {
      try {
        new (window as any).TradingView.widget(Object.assign({container_id: id, theme: 'dark'}, widgetConfig))
      } catch (e) {
        console.error('tv widget', e)
      }
    } else {
      const s = document.createElement('script')
      s.src = 'https://s3.tradingview.com/tv.js'
      s.async = true
      s.onload = () => {
        try {
          new (window as any).TradingView.widget(Object.assign({container_id: id, theme: 'dark'}, widgetConfig))
        } catch (e) { console.error(e) }
      }
      document.body.appendChild(s)
    }
  }, [id, widgetConfig])

  return <div id={id} />
}
