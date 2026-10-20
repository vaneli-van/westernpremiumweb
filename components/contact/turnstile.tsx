'use client'

import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from 'react'
import Script from 'next/script'

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  execute: (widgetId: string) => void
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export type TurnstileHandle = { getToken: () => Promise<string> }

const TOKEN_TIMEOUT_MS = 30_000

/** Invisible Cloudflare Turnstile widget. A fresh token is requested for every submission. */
export function Turnstile({ siteKey, ref }: { siteKey: string; ref: Ref<TurnstileHandle> }) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const issued = useRef(false)
  const pending = useRef<{ resolve: (token: string) => void; reject: (err: Error) => void } | null>(null)

  const settle = (token: string | null) => {
    const p = pending.current
    pending.current = null
    if (!p) return
    if (token) p.resolve(token)
    else p.reject(new Error('Turnstile verification failed'))
  }

  const render = useCallback(() => {
    if (!window.turnstile || !container.current || widgetId.current) return
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      execution: 'execute',
      appearance: 'interaction-only',
      callback: (token: string) => settle(token),
      'error-callback': () => {
        settle(null)
        return true
      },
    })
  }, [siteKey])

  useEffect(() => {
    render()
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = null
    }
  }, [render])

  useImperativeHandle(ref, () => ({
    getToken: () =>
      new Promise<string>((resolve, reject) => {
        const api = window.turnstile
        const id = widgetId.current
        if (!api || !id) return reject(new Error('Turnstile not ready'))
        const timer = setTimeout(() => settle(null), TOKEN_TIMEOUT_MS)
        pending.current = {
          resolve: (token) => {
            clearTimeout(timer)
            resolve(token)
          },
          reject: (err) => {
            clearTimeout(timer)
            reject(err)
          },
        }
        if (issued.current) api.reset(id)
        issued.current = true
        api.execute(id)
      }),
  }))

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={container} />
    </>
  )
}
