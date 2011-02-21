<?php
/**
 * _customize_admin_menu_set_references();
 */
function _customize_admin_menu_references() {
  $references = array();
  //Get our data tree from admin_menu
  $data = menu_tree_all_data('admin_menu');
  //Get the root elements of the admin array as our base, and set the variable 'customize_admin_menu_settings'.
  foreach ($data as $root) {
    $references[$root['link']['link_path']] = $root['link']['mlid'];
  }
  //Make a $settings['references']['root'] array.
  $settings = array('references' => array( 'root' => $references ));
  variable_set('customize_admin_menu_settings', $settings);
}

function _customize_admin_menu_admin() {
  //Form: Main Settings.
  $form['main'] = array(
    '#type' => 'fieldset',
    '#title' => t('Main Settings'),
    '#description' => t('Select from the four "theme" options and also select your menu "layout". Please see the help documentation for more information.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  /** 
   * Theme settings
   * This is just a css replacement, to supply the correct css file to drupal.
   * alt.admin-menu-min.css - icons only on the root - in full color.
   * alt.admin-menu-min-bw.css - icons only on the root - in gray scale.
   * alt.admin-menu-bw.css - icons every where - in gray scale.
   * alt.admin-menu.css - icons every where - in full color.
   */
  $theme_options = array(
    0 => t('No Theme Changes.'),
    'alt.admin-menu-min.css' => t('Minimal Icons: Full Color'),
    'alt.admin-menu-min-bw.css' => t('Minimal Icons: Gray-scale'),
    'alt.admin-menu.css' => t('All Icons: Full Color'),
    'alt.admin-menu-bw.css' => t('All Icons: Gray-scale'),
  );
  $form['main']['customize_admin_menu_theme_settings'] = array(
    '#type' => 'radios',
    '#title' => t('Theme Settings'),
    '#description' => t('Choose from the theme settings supplied to choose an image theme.'),
    '#options' => $theme_options,
    '#default_value' => (variable_get('customize_admin_menu_theme_settings', NULL) == NULL) ? 0 : variable_get('customize_admin_menu_theme_settings', NULL),
  );
  $layout_options = array(
    0 => t('Default Admin Menu Layout'),
    1 => t('Custom Admin Menu Layout'),
  );
  $form['main']['customize_admin_menu_layout_settings'] = array(
    '#type' => 'radios',
    '#title' => t('Layout Settings'),
    '#description' => t('You have two options, use the default admin menu layout or use the "Custom" layout.'),
    '#options' => $layout_options,
    '#default_value' => (variable_get('customize_admin_menu_layout_settings', NULL) == NULL) ? 0 : variable_get('customize_admin_menu_layout_settings', NULL),
  );
  //Add our own validate handler.
  $form['#validate'][] = '_customize_admin_menu_admin_validate';
  //Enable vertical tabs if the module is installed.
  $form['#pre_render'][] = 'vertical_tabs_form_pre_render';
  //Return system settings.
  return system_settings_form( $form );
}

/**
 * _customize_admin_menu_admin_validate(&$form_state, $form);
 */
function _customize_admin_menu_admin_validate(&$form, $form_state) {
  //Delete menu items.
  module_load_include('inc', 'admin_menu');
  //If we are using the default form, wipe the admin menu and start over.
  if ($form_state['values']['customize_admin_menu_layout_settings'] == 0) {
    variable_set('customize_admin_menu_rebuild_links', FALSE);
    //Wipe menu for rebuild.
    admin_menu_wipe();
  } else {
    variable_set('customize_admin_menu_rebuild_links', TRUE);
    //When we rebuild, we HAVE to set our own references here, so we can have some sort of easy relationship when we alter links later.
    _admin_menu_rebuild_links();
    _customize_admin_menu_references();
    variable_set('admin_menu_rebuild_links', TRUE);
  }
}