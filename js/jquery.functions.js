$(document).ready(function() {
    //Add Id's to the elements
    $('#admin-menu li').each( function() {
      var name = $(this).children('a').text();
      name = name.toLowerCase();
      name = name.replace( /\//gi, '' );
      name = name.replace( /\s/gi, '-' );
      if ( name && !$(this).hasClass( 'admin-menu-icon' )  && !$(this).hasClass( 'admin-menu-logout' ) ) {
        $(this).addClass( Drupal.t( name ) );
        //If we match list, then add that class
        if (name.match(/list/gi)) {
          $(this).addClass('list');
        }
        //if we match add, then add that class
        if (name.match(/add/gi)) {
          $(this).addClass('add');
        }
        //if we match settings, then add that class
        if (name.match(/settings/gi)) {
          $(this).addClass('settings');
        }
      }
    });
});
