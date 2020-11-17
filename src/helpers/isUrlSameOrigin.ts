interface OriginParams {
  href: string
  host: string
  protocol: string
  port: string
  [propName: string]: string
}

interface HandleUrlSameOrigin {
  isSameOrigin: (requestUrl: string) => boolean
  resolveUrl: (requestUrl: string) => OriginParams
}

function handleUrlSameOrigin(): HandleUrlSameOrigin {
  const element = document.createElement('a')

  /**
   * @param  {string} requestUrl 请求的url
   */
  const resolveUrl = function(requestUrl: string): OriginParams {
    element.setAttribute('href', requestUrl)
    return {
      href: element.href,
      host: element.host,
      protocol:
        typeof element.protocol === 'string'
          ? element.protocol.replace(/:$/, '')
          : '',
      port: element.port
    }
  }

  const origin = resolveUrl(window.location.href)

  function isSameOrigin(requestUrl: string | OriginParams): boolean {
    const request =
      typeof requestUrl === 'string' ? resolveUrl(requestUrl) : requestUrl
    return origin.host === request.host && origin.protocol === request.protocol
  }

  return { resolveUrl, isSameOrigin }
}

const { isSameOrigin, resolveUrl } = handleUrlSameOrigin()

export default isSameOrigin

export { resolveUrl }
