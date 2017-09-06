$(function() {
	// Custom JS
  Onclick();
  GetReleases("qvepoy/ScreenGrabber");
});

function GetReleases(repo) {
    var lastSize = "", lastVersion = "", lastLink = "";
    var totalDownloadCount = 0;
    $.getJSON("https://api.github.com/repos/" + repo + "/releases").done(function(json) {


        for (var i = 0; i < json.length; i++) {
            var release = json[i];
            if (release.assets.length === 0) {
                continue;
            }
            var asset = release.assets[0];
            lastSize = Math.round(asset.size / 1024);
            lastLink = asset.browser_download_url;
            lastVersion = release.tag_name;
            var downloadCount = 0;
            for (var i2 = 0; i2 < release.assets.length; i2++) {
                downloadCount += release.assets[i2].download_count;
            }
            totalDownloadCount += downloadCount;
        }
        console.log(json)
        $('.lastVersion').text("Last version : " + lastVersion);
        $('.totalDownloads').text("Total downloads : " + totalDownloadCount);
        $('.lastSize').text("Size : " + lastSize + " Kb");
        $(".lastDownload").attr("href", lastLink);
    });
}

function Onclick() {
  var something = document.getElementById('donate');
  $( "#donate" ).click(function() {
    $( "#donates" ).toggleClass('hidden');
  });
}
