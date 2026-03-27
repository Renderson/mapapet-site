/**
 * Links compartilhados: https://renderson.github.io/mapapet-site/post/{postId}
 * O GitHub Pages não cria arquivos por URL; 404.html espelha index.html para carregar esta página.
 */

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.mapapet.app"

const SITE_ORIGIN = "https://renderson.github.io"
const POST_PATH_PREFIX = "/mapapet-site/post/"

function getPostIdFromLocation() {
  const path = window.location.pathname
  const match = path.match(/\/post\/([^/?#]+)\/?$/)
  return match ? decodeURIComponent(match[1]) : null
}

const postId =
  getPostIdFromLocation() ||
  new URLSearchParams(window.location.search).get("id")

function publicPostUrl(id) {
  return `${SITE_ORIGIN}${POST_PATH_PREFIX}${encodeURIComponent(id)}`
}

/**
 * Abre o MapaPet via intent (Chrome Android) usando o mesmo URL https dos App Links.
 */
function openApp() {
  if (!postId) return
  const httpsUrl = publicPostUrl(postId)
  const fallback = encodeURIComponent(PLAY_STORE)
  const intentUrl =
    "intent://renderson.github.io/mapapet-site/post/" +
    encodeURIComponent(postId) +
    "#Intent;scheme=https;package=com.mapapet.app;S.browser_fallback_url=" +
    fallback +
    ";end"
  window.location.href = intentUrl
}

function openStore() {
  window.location.href = PLAY_STORE
}

window.onload = function () {
  if (!postId) return

  setTimeout(() => {
    openApp()
  }, 500)

  setTimeout(() => {
    window.location.href = PLAY_STORE
  }, 2500)
}
