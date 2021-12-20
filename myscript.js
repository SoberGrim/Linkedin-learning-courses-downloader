{
    var statusDiv = document.createElement('div');
    statusDiv.innerHTML = "<strong>Linkedin video Downloader</strong> (Searching video URL...)";
    document.body.prepend(statusDiv);
}

function downloadFile(urlToSend, fileName) {
    let myFileNme = fileName;
    statusDiv.innerHTML = "<strong>File:</strong> " + myFileNme + "  (Wating for file...)";
    window.scrollTo(0, 0);

    var req = new XMLHttpRequest();
    req.open("GET", urlToSend, true);
    req.responseType = "blob";

    req.onprogress = function (pe) {
        if (pe.lengthComputable) {
            statusDiv.innerHTML = "<strong>File:</strong> " + myFileNme + " (" + pe.loaded + "/" + pe.total + " bytes)";
        } else {
            statusDiv.innerHTML = "<strong>File:</strong> " + myFileNme + " (" + pe.loaded + " bytes)";
        }
    };

    req.onerror = function (event) {
        statusDiv.innerHTML = "<strong>File:</strong> " + myFileNme + " - <strong>Failed</strong>";
    };

    req.onload = function (event) {
        var blob = req.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = myFileNme;
        link.click();
    };

    req.onloadend = function (event) {
        statusDiv.innerHTML = "<strong>File:</strong> " + myFileNme + " - <strong>Success</strong>";
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

    var detect = function () {
        if (oldlocation != window.location.pathname) {
            console.log("Url changed to " + window.location.pathname);
            statusDiv.innerHTML = "<strong>Linkedin Learning courses Downloader status</strong><br>Status: URL changed to " + window.location.pathname;
            oldlocation = window.location.pathname;

            parseVideoUrlandDownload();
        }
    };
    this.Check = setInterval(function () { detect() }, 2000);
}


{

    setTimeout(function () { parseVideoUrlandDownload() }, 5000);
    var monitor = new monitorURLChange();

};
