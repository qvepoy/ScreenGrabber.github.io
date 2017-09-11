$(function() {
	// Custom JS
  ReplaceSVGWithInline();
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

function ReplaceSVGWithInline() {
  /*
    * Replace all SVG images with inline SVG
    */
       jQuery('img.svg').each(function(){
           var $img = jQuery(this);
           var imgID = $img.attr('id');
           var imgClass = $img.attr('class');
           var imgURL = $img.attr('src');

           jQuery.get(imgURL, function(data) {
               // Get the SVG tag, ignore the rest
               var $svg = jQuery(data).find('svg');

               // Add replaced image's ID to the new SVG
               if(typeof imgID !== 'undefined') {
                   $svg = $svg.attr('id', imgID);
               }
               // Add replaced image's classes to the new SVG
               if(typeof imgClass !== 'undefined') {
                   $svg = $svg.attr('class', imgClass+' replaced-svg');
               }

               // Remove any invalid XML tags as per http://validator.w3.org
               $svg = $svg.removeAttr('xmlns:a');

               // Replace image with new SVG
               $img.replaceWith($svg);

           }, 'xml');

       });
}
