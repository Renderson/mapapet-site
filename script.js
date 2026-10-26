/**
 * Links compartilhados:
 *   https://renderson.github.io/mapapet-site/post/{postId}
 *   https://renderson.github.io/mapapet-site/evento/{partnerId}/{eventId}
 * O GitHub Pages não cria arquivos por URL; 404.html espelha index.html para carregar esta página.
 */

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.mapapet.app"

function getPostIdFromLocation() {
  const path = window.location.pathname
  const match = path.match(/\/post\/([^/?#]+)\/?$/)
  return match ? decodeURIComponent(match[1]) : null
}

const postId =
  getPostIdFromLocation() ||
  new URLSearchParams(window.location.search).get("id")

function getEventPathFromLocation() {
  const match = window.location.pathname.match(/\/evento\/([^/?#]+)\/([^/?#]+)\/?$/)
  return match ? `evento/${match[1]}/${match[2]}` : null
}

const eventPath = getEventPathFromLocation()

/** Caminho (sem o prefixo do site) que o app reconhece como deep link. */
const appPath = eventPath || (postId ? `post/${encodeURIComponent(postId)}` : null)

/**
 * Abre o MapaPet via intent (Chrome Android) usando o mesmo URL https dos App Links.
 */
function openApp() {
  if (!appPath) return
  const fallback = encodeURIComponent(PLAY_STORE)
  const intentUrl =
    "intent://renderson.github.io/mapapet-site/" +
    appPath +
    "#Intent;scheme=https;package=com.mapapet.app;S.browser_fallback_url=" +
    fallback +
    ";end"
  window.location.href = intentUrl
}

function openStore() {
  window.location.href = PLAY_STORE
}

window.onload = function () {
  if (!appPath) return

  setTimeout(() => {
    openApp()
  }, 500)

  setTimeout(() => {
    window.location.href = PLAY_STORE
  }, 2500)
}
