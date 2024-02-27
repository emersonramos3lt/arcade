window.onload = function() {
    setTimeout(function() {
    document.querySelector(".loader-wrapper").classList.add("hidden").style.display = "none"

    document.getElementById("content").style.display = "block"
    }, 2500)
}