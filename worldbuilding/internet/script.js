let currWebsite = -1; 
let unlockedSiteCount = 0;

function updateNavbarVisibility() {
    const navbar = document.getElementById("navbar");
    for (let i = 0; i < navbar.children.length; i++) {
        if (i > unlockedSiteCount) {
            navbar.children[i].hidden = true;
        } else {
            navbar.children[i].hidden = false;
        }
    }
}
function switchTab(event, newIdx) {
    const srcBtn = event.srcElement;
    let switched = newIdx !== currWebsite;
    currWebsite = newIdx;
    if (switched) {
        let toDeselect = document.getElementsByClassName("selected");
        for (let i = 0; i < toDeselect.length; i++) {
            toDeselect[i].classList.remove("selected")
        }
        srcBtn.classList.add("selected");

        updateNavbarVisibility()
    } else {
        return;
    }
    let webpagediv = document.getElementById("webpage")
    webpagediv.className = `webpage${currWebsite}`
    webpagediv.innerHTML = ""
    switch (newIdx) {
        case 0:
            initializeSystem();
            break;
        case 1:
            initWikiSite();
            break;
        case 2:
            initNewsSite();
            break;
        case 3:
            initTownSite();
            break;
        case 4:
            initPoliceSite();
            break;
        case 5:
            initForum();
            break;
        case 6:
            initOlsen();
            break;
    } 
}

window.onload = function () {

    document.getElementById("navbar").children[0].click()

}