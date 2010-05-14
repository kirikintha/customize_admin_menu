$(document).ready(function() {

    //add ids to the elements
    $('#admin-menu li').each( function() {
      var name = $(this).children('a').text();
      name = name.toLowerCase();
      name = name.replace( /\//gi, '' );
      name = name.replace( /\s/gi, '-' );
      if ( name && !$(this).hasClass( 'admin-menu-icon' )  && !$(this).hasClass( 'admin-menu-logout' ) ) {
        $(this).addClass( Drupal.t( name ) );
      }
      
    } );
    
    //Hover Intent for admin, this makes the darn thing understand your hover better
    $('#admin-menu li').bind( 'hover', { speed:0, delay:750 }, function() {
      // Stop the timer.
      clearTimeout(this.sfTimer);
      // Display child lists.
      $('> ul', this).css({left: 'auto', display: 'block'})
        // Immediately hide nephew lists.
        .parent().siblings('li').children('ul').css({left: '-999em', display: 'none'});
    }, function() {
      // Start the timer.
      var uls = $('> ul', this);
      this.sfTimer = setTimeout(function() {
        uls.css({left: '-999em', display: 'none'});
      }, 400);
    });

});
