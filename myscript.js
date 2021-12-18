function downloadFile(urlToSend, fileName) {
    let myFileNme = fileName;
    console.log("Downloading: " + myFileNme);

    var req = new XMLHttpRequest();
    req.open("GET", urlToSend, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = myFileNme;
        link.click();
    };
    req.send();
}

function parseVideoUrlandDownload() {
    let videos = document.getElementsByClassName("vjs-tech");

    let courseName = document.getElementsByClassName("clamp-1 t-16");
    var title1 = courseName[0].textContent.trim().replace(':', '#').replaceAll(' ', '_');
    var title2 = courseName[1].textContent.trim().replace(':', '#').replaceAll(' ', '_');

    var fileName = (title1 + "_-_" + title2 + ".mp4");
    downloadFile(videos[0].getAttribute("src"), fileName);
}

function monitorURLChange() {
    let oldlocation = window.location.pathname;
    console.log("URL monitoring started");

    var detect = function () {
        if (oldlocation != window.location.pathname) {
            console.log("Url chenged to " + window.location.pathname);
            oldlocation = window.location.pathname;

            parseVideoUrlandDownload();
        }
    };
    this.Check = setInterval(function () { detect() }, 2000);
}


{
    
    console.log("Linkedin Learning courses Downloader script Started");
    setTimeout(function () { parseVideoUrlandDownload() }, 5000);
    var monitor = new monitorURLChange();
    
};
