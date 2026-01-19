import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { businessInfo } from "@/lib/data/business-info"
import { generateLocalBusinessSchema, JsonLd } from "@/lib/seo/json-ld"
import { WibloDesignBridge } from "@/components/wiblo-design-bridge"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: `${businessInfo.name} | ${businessInfo.tagline}`,
  description: businessInfo.description,
}

// Early error bridge script - runs before React to catch render-time errors
const earlyErrorBridgeScript = `
(function() {
  if (typeof window === 'undefined') return
  if (window.__wibloEarlyBridge__) return
  window.__wibloEarlyBridge__ = true

  window.__wibloReportedErrors__ = window.__wibloReportedErrors__ || {}
  var reported = window.__wibloReportedErrors__
  window.__wibloPreviewReadySent__ = false

  // Clear reported errors and reset flags on navigation (prevents stale deduplication)
  window.addEventListener('beforeunload', function() {
    window.__wibloReportedErrors__ = {}
    window.__wibloPreviewReadySent__ = false
  })

  function postError(error) {
    try {
      window.parent && window.parent.postMessage({
        type: 'PREVIEW_ERROR',
        error: error
      }, '*')
    } catch (e) {}
  }

  function postClear(errorType) {
    try {
      window.parent && window.parent.postMessage({
        type: 'PREVIEW_ERROR_CLEAR',
        errorType: errorType
      }, '*')
    } catch (e) {}
  }

  // FIX: Clear overlay keys so same error can be re-reported
  function clearOverlayKeys() {
    for (var key in reported) {
      if (key.indexOf('overlay:') === 0) {
        delete reported[key]
      }
    }
  }

  // FIX: Check if element is actually visible
  function isElementVisible(el) {
    if (!el) return false
    var style = window.getComputedStyle(el)
    return style.display !== 'none' &&
           style.visibility !== 'hidden' &&
           style.opacity !== '0' &&
           el.offsetParent !== null
  }

  window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('extension://')) return
    if (e.message === 'Script error.' && !e.filename) return

    var key = (e.message || 'unknown') + ':' + (e.lineno || 0) + ':' + (e.colno || 0)
    if (reported[key]) return
    reported[key] = true

    postError({
      message: e.message || 'Unknown error',
      filename: e.filename || undefined,
      lineno: e.lineno || undefined,
      colno: e.colno || undefined,
      stack: e.error && e.error.stack,
      type: 'runtime'
    })
  })

  window.addEventListener('unhandledrejection', function(e) {
    var msg = (e.reason && e.reason.message) || String(e.reason || 'Unknown rejection')
    if (reported[msg]) return
    reported[msg] = true

    postError({
      message: msg,
      stack: e.reason && e.reason.stack,
      type: 'unhandled-rejection'
    })
  })

  var origConsoleError = console.error
  console.error = function() {
    origConsoleError.apply(console, arguments)

    try {
      var msg = Array.prototype.slice.call(arguments).map(function(arg) {
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg) } catch (e) { return String(arg) }
        }
        return String(arg)
      }).join(' ')

      var isError = msg.includes('Error') ||
                    msg.includes('Uncaught') ||
                    msg.includes('Invalid') ||
                    msg.includes('Failed') ||
                    msg.includes('Cannot')

      var isReactInternal = msg.includes('Warning:') ||
                            msg.includes('React does not recognize') ||
                            msg.includes('validateDOMNesting')

      if (isError && !isReactInternal) {
        var key = 'console:' + msg.slice(0, 100)
        if (!reported[key]) {
          reported[key] = true
          postError({
            message: msg.slice(0, 2000),
            type: 'console-error'
          })
        }
      }
    } catch (e) {}
  }

  // === OVERLAY DETECTION ===
  var shadowObserver = null
  var observedPortal = null
  var portalShadowAttempts = 0
  var MAX_PORTAL_SHADOW_ATTEMPTS = 10
  var lastOverlayPresent = false

  function extractOverlayMessage(errorDialog) {
    var header =
      (errorDialog.querySelector('[data-nextjs-dialog-header]') || errorDialog.querySelector('h1') || {}).textContent || ''
    var body =
      (errorDialog.querySelector('[data-nextjs-dialog-body]') ||
       errorDialog.querySelector('[data-nextjs-error-message]') || {}).textContent || ''
    var codeframe =
      (errorDialog.querySelector('[data-nextjs-codeframe]') || errorDialog.querySelector('pre') || {}).textContent || ''

    var message = [header, body, codeframe].filter(Boolean).join('\\n').trim()

    if (!message) {
      var rawText = errorDialog.innerText || errorDialog.textContent || ''
      message = rawText.replace(/\\n{3,}/g, '\\n\\n').trim()
    }

    if (!message) {
      message = 'Next.js error overlay detected'
    }

    return message.slice(0, 2000)
  }

  function findOverlayDialog(root) {
    if (!root) return null
    return root.querySelector('[data-nextjs-dialog]') ||
           root.querySelector('[data-nextjs-error-overlay]') ||
           root.querySelector('#__next-build-watcher') ||
           root.querySelector("[role='dialog']")
  }

  function checkForNextjsErrorOverlay() {
    var errorDialog = findOverlayDialog(document)

    if (!errorDialog) {
      var portal = document.querySelector('nextjs-portal')
      if (portal && portal.shadowRoot) {
        errorDialog = findOverlayDialog(portal.shadowRoot)
      }
    }

    // FIX: Also check if the overlay is actually visible
    if (errorDialog && !isElementVisible(errorDialog)) {
      errorDialog = null
    }

    // If no visible overlay and we previously had one, send clear signal
    if (!errorDialog) {
      if (lastOverlayPresent) {
        console.log('[Wiblo] Error overlay disappeared, sending clear signal')
        lastOverlayPresent = false
        // FIX: Clear overlay keys so same error can be re-reported later
        clearOverlayKeys()
        postClear('nextjs-overlay')
      }
      return
    }

    // Overlay is present and visible
    lastOverlayPresent = true

    var message = extractOverlayMessage(errorDialog)
    var key = 'overlay:' + message.slice(0, 100)
    if (!message || reported[key]) return

    reported[key] = true
    postError({
      message: message,
      type: 'nextjs-overlay'
    })
  }

  function observePortalShadowRoot() {
    var portal = document.querySelector('nextjs-portal')

    if (!portal) {
      if (observedPortal) {
        shadowObserver && shadowObserver.disconnect()
        shadowObserver = null
        observedPortal = null
      }
      portalShadowAttempts = 0
      return
    }

    if (portal !== observedPortal) {
      observedPortal = portal
      portalShadowAttempts = 0
      shadowObserver && shadowObserver.disconnect()
      shadowObserver = null
    }

    var shadowRoot = portal.shadowRoot
    if (!shadowRoot) {
      if (portalShadowAttempts < MAX_PORTAL_SHADOW_ATTEMPTS) {
        portalShadowAttempts += 1
        setTimeout(observePortalShadowRoot, 50)
      }
      return
    }

    if (!shadowObserver) {
      shadowObserver = new MutationObserver(function() {
        checkForNextjsErrorOverlay()
      })
      shadowObserver.observe(shadowRoot, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      })
      checkForNextjsErrorOverlay()
    }
  }

  function startOverlayObservers() {
    if (!document.body) {
      setTimeout(startOverlayObservers, 50)
      return
    }

    var bodyObserver = new MutationObserver(function() {
      observePortalShadowRoot()
      checkForNextjsErrorOverlay()
    })
    bodyObserver.observe(document.body, { childList: true, subtree: true })

    observePortalShadowRoot()
    if (document.readyState === 'complete') {
      checkForNextjsErrorOverlay()
    } else {
      window.addEventListener('load', checkForNextjsErrorOverlay)
    }
  }

  startOverlayObservers()

  // === PREVIEW_READY SIGNAL ===
  function postReady() {
    if (window.__wibloPreviewReadySent__) return
    window.__wibloPreviewReadySent__ = true
    try {
      window.parent && window.parent.postMessage({ type: 'PREVIEW_READY' }, '*')
    } catch (e) {}
  }

  if (document.readyState === 'complete') {
    postReady()
  } else {
    window.addEventListener('load', postReady)
  }
})()
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="wiblo-early-error-bridge" strategy="beforeInteractive">
          {earlyErrorBridgeScript}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WibloDesignBridge />
        <JsonLd data={generateLocalBusinessSchema()} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
