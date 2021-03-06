/*
 * js/styles/dark-flat.js
 *
 * This script contains code needed for the Dark Flat style.
 *
 * Subject to terms and conditions in LICENSE.md.
 *
 */

if (typeof window.Styles.Applied === 'undefined') {
    window.Styles.Applied = true;
    window.Styles.DarkFlat = true;
    
    // Thumbs up and down styles.
    var mediaChange = (function(list) {
        window.Styles.removeStyle('thumbsUpDown');

        // Create dummy elements to get the computed styles for these elements.
        var td = document.createElement('td');
        td.dataset.col = 'rating';

        var el = document.createElement('div');
        el.className = 'song-row';
        el.appendChild(td);
        el.style.display = 'none';
        document.body.appendChild(el);

        // Get the background-position for thumbs up.
        td.dataset.rating = '5';
        var thumbsUpStyle = document.defaultView.getComputedStyle(td, null);
        var thumbsUpBackX = parseInt(thumbsUpStyle.backgroundPositionX);
        var thumbsUpBackY = parseInt(thumbsUpStyle.backgroundPositionY);

        // Get the background-position for thumbs down.
        td.dataset.rating = '1';
        var thumbsDownStyle = document.defaultView.getComputedStyle(td, null);
        var thumbsDownBackX = parseInt(thumbsDownStyle.backgroundPositionX);
        var thumbsDownBackY = parseInt(thumbsDownStyle.backgroundPositionY);

        // Remove the element.
        document.body.removeChild(el);

        // Apply a new stylesheet for the new thumbs up and down positions.
        thumbsUpBackY -= 9;
        thumbsDownBackY -= 7;

        var thumbsUpPosition = thumbsUpBackX + 'px ' + thumbsUpBackY + 'px';
        var thumbsDownPosition = thumbsDownBackX + 'px ' + thumbsDownBackY + 'px';

        window.Styles.applyStyle('thumbsUpDown',
            '.song-row [data-col="rating"][data-rating="5"]:not(.stars) { background-position: ' + thumbsUpPosition + ' !important; } ' +

            '.song-row [data-col="rating"][data-rating="1"]:not(.stars), ' +
            '.song-row [data-col="rating"][data-rating="2"]:not(.stars) { background-position: ' + thumbsDownPosition + ' !important; } '
            );
    });

    mediaChange(null);

    var mql = window.matchMedia("screen and (-webkit-min-device-pixel-ratio:1.5),screen and (min--moz-device-pixel-ratio:1.5),screen and (-o-min-device-pixel-ratio:1.5),screen and (min-resolution:1.5dppx)");
    mql.addListener(mediaChange);
}