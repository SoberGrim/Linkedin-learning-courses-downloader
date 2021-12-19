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

var chapterCount = 1;
var videoCount = 1;
function parseVideoUrlandDownload() {
    var fileName = 'unknown';
    let courseName = document.getElementsByClassName("clamp-1 t-16");
    if (courseName.length == 2) {
        let title1 = courseName[0].textContent.trim().replace(':', '#').replaceAll(' ', '_');
        let title2 = courseName[1].textContent.trim().replace(':', '#').replaceAll(' ', '_');
        fileName = (title1 + "_-_#" + chapterCount + '-' + videoCount + '_' + title2 + ".mp4");
    }

    let videos = document.getElementsByClassName("vjs-tech");
    if (videos.length == 1) {
        downloadFile(videos[0].getAttribute("src"), fileName);
        videoCount++;
    } else {
        chapterCount++;
        videoCount = 1;
    }
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
