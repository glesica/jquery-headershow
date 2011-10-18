# jQuery-headershow

A small jQuery plugin to create a nice little slideshow for use 
at the top of a landing page, something like that.

You can see a demo here: [http://extragoto10line.com/~george/demo.html](http://extragoto10line.com/~george/demo.html "Demo").

## Screenshot

![Screenshot](http://github.com/glesica/jquery-headershow/raw/master/screenshot.png "Screenshot")

## Using

Include `jquery.headershow.js` and `css/default.css` in your page. After 
that, using HS is pretty simple. For example:

    <script language="javascript">
    $('#slides > div').headershow({
        container: '#slideshow',
    })
    </script>

Where the HTML document looks something like this:

    <div id="slideshow"></div>
    
    <div id="slides">
        <div>
            <img src="img1.png" />
            <p>This is the first slide.</p>
        </div>
        <div>
            <img src="img2.png" />
            <p>This is the second slide.</p>
        </div>
    </div>

HS is designed to be easy to drop in to an existing layout. The only 
requirement is that the first thing in each block that will become 
a slide be an image. Beyond that, it's up to you to style the slides if 
your content doesn't work properly with the default CSS.

## Options

There are quite a few options that can be passed in when creating 
a slideshow. They are described below.

### id

Default: `null`. This will be used in the future.

### container

Default: `'#hs-container'`. This is the tag into which the 
slideshow should be inserted.

### width, height, minwidth, minheight, maxwidth, maxheight

Default: `null`. These will be applied to the slideshow itself. Obviously 
setting the size of the slideshow could be accomplished with CSS, 
but this makes it a little easier in some cases.

### txtheight, mintxtheight, maxtxtheight

Default: `null`. Height (set, min and max) for the content area that 
accompanies each image. Again, they can be set in CSS as well.

### txtoverlay

Default: `false`. Whether or not the content area should overlay the image.

### containerclass, imgclass, txtclass

Default: `''`. Additional classes to apply to the slideshow container, 
the image and the content area, respectively.

### hidecontent

Default: `true`. Whether or not the original content should be 
removed (hidden) after the slides are constructed.

### displaycontrols

Default: `true`. Whether or not to display forward and backward 
buttons along with the slideshow.

### fwdbuttonsrc, bwdbuttonsrc

Default: `'img/button_fwd.png'` and `'img/button_bwd.png'`. Paths to 
icons to use for the forward and backward buttons, respectively.

### pausebuttonsrc, playbuttonsrc

Default: `'img/button_pause.png'` and `'img/button_play.png'`. Unused.

### delay

Default: `5000`. The number of milliseconds to pause on each slide.

### Credits

jQuery-headershow created by George Lesica <glesica@gmail.com>

Background image from http://www.behance.net/pixilated (CC-BY)



