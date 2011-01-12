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
        if (name.match(/(list|display)/gi)) {
          $(this).addClass('list');
        }
        //if we match add, then add that class
        if (name.match(/add/gi) || name.match(/create/gi)) {
          $(this).addClass('add');
        }
        //if we match settings, then add that class
        if (name.match(/settings/gi)) {
          $(this).addClass('settings');
        }
        //if we match edit, then add that class
        if (name.match(/edit/gi)) {
          $(this).addClass('edit');
        }
        //if we match delete, then add that class
        if (name.match(/delete/gi)) {
          $(this).addClass('remove');
        }
        //if we match import, then add that class
        if (name.match(/import/gi)) {
          $(this).addClass('import');
        }
        //if we match export, then add that class
        if (name.match(/export/gi)) {
          $(this).addClass('export');
        }
        //if we match export, then add that class
        if (name.match(/\bdate\b/gi)) {
          $(this).addClass('date');
        }
        //if we match export, then add that class
        if (name.match(/image/gi)) {
          $(this).addClass('picture');
        }
        //if we match comment, then add that class
        if (name.match(/comment/gi)) {
          $(this).addClass('admin-menu-comments');
        }
        //if we match comment, then add that class
        if (name.match(/\brss\b/gi) || name.match(/aggregat/gi) || name.match(/feed/gi)) {
          $(this).addClass('admin-menu-rss');
        }
        //if we match export, then add that class
        if (name.match(/schedule/gi)) {
          $(this).addClass('schedule');
        }
        //if we match export, then add that class
        if (name.match(/(gmap|location)/gi)) {
          $(this).addClass('location');
        }
      }
    });
});
