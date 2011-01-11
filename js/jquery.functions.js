$(document).ready(function() {
    //Add Id's to the elements
    $('#admin-menu li').each( function() {
      var name = $(this).children('a').text();
      name = name.toLowerCase();
      name = name.replace( /\//gi, '' );
      name = name.replace( /\s/gi, '-' );
      if ( name && !$(this).hasClass( 'admin-menu-icon' )  && !$(this).hasClass( 'admin-menu-logout' ) ) {
        $(this).addClass( Drupal.t( name ) );
      }
    });
});
