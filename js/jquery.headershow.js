/*
    jquery-headershow
    A simple slideshow for page headers using jQuery.
    George Lesica <glesica@gmail.com>
*/

(function($){

    // Set up the slideshow
    var init = function(options) {
        // Set up global variables
        var settings; // For storing default settings
    
        // Configure default settings
        var settings = {
            id                  : null, // For future use

            container           : '#hs-container',
            width               : null,
            height              : null,
            minwidth            : null,
            minheight           : null,
            maxwidth            : null,
            maxheight           : null,
            
            txtheight           : null,
            mintxtheight        : null,
            maxtxtheight        : null,
            
            txtoverlay          : false,

            containerclass      : '',
            imgclass            : '',
            txtclass            : '',

            hidecontent         : true,

            delay               : 5000,
        };
        // Update default settings with options passed in
        if (options) {
            $.extend(settings, options);
        }

        // Set up the container for use with the slideshow
        var $container = $(settings.container)
            .addClass('hs-container ' + settings.containerclass)
            .width(settings.width)
            .height(settings.height)
            .css('min-width', settings.minWidth)
            .css('min-height', settings.minHeight)
            .append('<div class="hs-img ' + settings.imgclass + '" />') // UGLY
            .append('<div class="hs-txt ' + settings.txtclass + '" />') // UGLY
        
        // Set elements array to empty
        $container.data('elements', new Array());
        
        // Set running boolean
        $container.data('running', false);
        
        // Create slides from target objects and add them to the queue.
        this.each(function() {
            var $this = $(this); // The element we're working on

            // Find the image and text for this element
            var $image = $this.children('img').first();
            var $text = $image.nextAll();
            
            // Remove image and text from DOM if needed, otherwise clone
            if (settings.hidecontent) {
                $image = $image.detach();
                $text = $text.detach();
            } else {
                $image = $image.clone();
                $text = $text.clone();
            }
            
            // Wrap image and text for use in slideshow
            $image = $image
                .wrapAll('<div />')
                .parent()
                .addClass('hs-img ' + settings.imgclass);
            $text = $text
                .wrapAll('<div />')
                .parent()
                .addClass('hs-txt ' + settings.txtclass)
                .css('height', settings.txtheight)
                .css('min-height', settings.mintxtheight)
                .css('max-height', settings.maxtxtheight);
            
            // Add overlay class to content area if appropriate
            if (settings.txtoverlay) {
                $text.addClass('hs-txt-overlay');
            }

            // Add the new element to the end of the list
            $container.data('elements').push({
                'img'   : $image,
                'txt'   : $text,
            });
        });
        
        // Configure events
        $container.mouseenter(function() {
            pause.call(this);
        });
        
        $container.mouseleave(function() {
            resume.call(this);
        });
        
        // Set up the timer to swap elements
        window.setInterval(function() {
            if ($container.data('running')) {
                goForward.call($container);
            }
        }, settings.delay);
        
        // Show the first slide
        displaySlide.call($container, $container.data('elements').shift());
        
        // Set status to running so slideshow runs
        $container.data('running', true);
        
        return this;
    }

    // Function to display the slide passed to it and return the old
    // slide. This is where the transition animation is handled.
    var displaySlide = function(slide) {
        $(this).fadeTo('slow', 0.0, function() {
            $(this).children('.hs-img').replaceWith(slide.img);
            $(this).children('.hs-txt').replaceWith(slide.txt);
            $(this).fadeTo('slow', 1.0);
        });
    }

    // Advance the slideshow by one slide
    var goForward = function() {
        // Add the existing slide to the back of the queue
        $(this).data('elements').push({
            'img'   : $(this).children('.hs-img').first(),
            'txt'   : $(this).children('.hs-txt').first(),
        });
        // Grab the next element from the queue
        displaySlide.call(this, $(this).data('elements').shift());
        
        return this;
    }
    
    // Rewind the slideshow by one slide
    var goBackward = function() {
        // Add the existing slide to the front of the queue
        $(this).data('elements').unshift({
            'img'   : $(this).children('.hs-img').first(),
            'txt'   : $(this).children('.hs-txt').first(),
        });
        // Grab the last slide in the queue and make it the current slide
        displaySlide.call(this, $(this).data('elements').pop());
        
        return this;
    }
    
    // Pause / unpause the slideshow
    var togglePaused = function() {
        var current = $(this).data('running');
        $(this).data('running', !current);
    }
    
    // Pause the slideshow
    var pause = function() {
        if ($(this).data('running')) { togglePaused.call(this); }
        return this;
    }
    
    // Unpause the slideshow
    var resume = function() {
        if (! $(this).data('running')) { togglePaused.call(this); }
        return this;
    }
    
    // Define available methods
    var methods = {
        init            : init,
        forward         : goForward,
        backward        : goBackward,
        pause           : pause,
        resume          : resume,
    };
    
    $.fn.headershow = function(method, options) {
        // Decide which method we're supposed to call and call it
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.headershow');
        }
    };
    
})(jQuery);


