const params = new URLSearchParams(window.location.search)
const postId = params.get("id")

const appLink = "adotapet://post/" + postId

const playStore =
"https://play.google.com/store/apps/details?id=com.adotapet.app"

function openApp() {
    window.location.href = appLink
}

function openStore() {
    window.location.href = playStore
}

/* tentativa automática de abrir o app */

window.onload = function() {

    if(postId){

        setTimeout(() => {
            window.location.href = appLink
        }, 500)

        setTimeout(() => {
            window.location.href = playStore
        }, 2500)

    }

}
