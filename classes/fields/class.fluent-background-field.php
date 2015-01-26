<?php
/**
 * Fluent_Background_Field
 *
 * @package Fluent
 * @since 1.0.7
 * @version 1.0.0
 */

add_action('fluent/options/field/background/render', array('Fluent_Background_Field', 'render'), 1, 2);
add_action('fluent/options/field/background/schema', array('Fluent_Background_Field', 'schema'), 1, 2);
add_action('fluent/options/field/background/enqueue', array('Fluent_Background_Field', 'enqueue'));

/**
 * Fluent_Background_Field simple select field.
 */
class Fluent_Background_Field extends Fluent_Field{

    /**
     * @var string $version Class version.
     */
    public $version = '1.0.0';
    
    /**
     * Returns the default field data.
     *
     * @since 1.0.0
     *
     * @return array default field data
     */
    public static function field_data(){
        $self = new self;
        return array(
            'upload_title' => __('Select Media', $self->domain), 
            'media_title' => __('Media Library', $self->domain), 
            'media_select' => __('Select Media', $self->domain),
            'value' => array(
                'color' => '',
                'transparent' => false,
                'background-image' => '',
                'background-attachment' => '',
                'background-position' => '',
                'background-size' => '',
                'background-repeat' => 'repeat'
            )
        );
    }

    /**
     * Enqueue or register styles and scripts to be used when the field is rendered.
     *
     * @since 1.0.0
     *
     * @param array $data field data.
     *
     * @param array $field_data locations and other data for the field type.
     */
    public static function enqueue( $data = array(), $field_data = array() ){
        wp_enqueue_script('underscore');
        wp_enqueue_media();
        wp_enqueue_style( 'wp-color-picker' );
        wp_enqueue_script( 'wp-color-picker' );
    }
    
    /**
     * Notify the Fluent_Options class of the schema needed for this field type within the values array.
     *
     * Generally this will be an empty string just to register the key in the array, but custom fields and things like multi selects will need this to be an array.
     * Groups use this to define the nested fields as well.
     *
     * @since 1.0.0
     *
     * @param string $value the current value that will be used.
     *
     * @param array $data field data as supplied by the section or group.
     */
    public static function schema($value = '', $data = array()){
        $data = self::data_setup($data);
        return array(
            'color' => '',
            'transparent' => false,
            'background-image' => '',
            'background-attachment' => '',
            'background-position' => '',
            'background-size' => '',
            'background-repeat' => 'repeat'
        );
    }
    
    /**
     * Render the field HTML based on the data provided.
     *
     * @since 1.0.0
     *
     * @param array $data field data.
     *
     * @param object $object Fluent_Options instance allowing you to alter anything if required.
     */
    public static function render($data = array(), $object){

        $self = new self;
        
        $data = self::data_setup($data);

        $val = (is_array($data['value'])) ? $data['value'] : array();

        $data['value'] = self::parse_args($val, self::schema());


        echo '<table>';
            echo '<tr>';
                echo '<td width="33%">';
                    echo '<input type="text" name="'.$data['option_name'].'['.$data['name'].'][color]" id="'.$data['id'].'-color" value="'.((isset($data['value']['color'])) ? $data['value']['color'] : '').'" class="color" />';
                echo '</td>';
                echo '<td width="33%">';
                    echo '<label><input type="checkbox" name="'.$data['option_name'].'['.$data['name'].'][transparent]" id="'.$data['id'].'-transparent" value="1"'.((isset($data['value']['transparent']) && $data['value']['transparent'] == true) ? ' checked="checked"' : '').' /> '.__('Transparent', $self->domain).'</label>';
                echo '</td>';
                echo '<td width="33%">';
                    //media field
                    $img_url = wp_get_attachment_image_src($data['value']['background-image'], 'thumbnail', false);
                    //if no value setup the array
                    if(!$data['value']['background-image']){
                        $img_url = array(
                            0 => ''
                        );
                    }
                    if($data['value']['background-image'] && empty($img_url)){
                        $img_url = array(
                            0 => $object::$field_types['media']['assets_path'].'images/unknown-file.jpg'
                        );
                    }
                    $button_display = ($data['value']['background-image']) ? ' style="display: none;"' : '';
                    echo '<div class="field-type-media">';
                        echo '<a href="#" class="button buttom-small upload"'.$button_display.' data-title="'.$data['media_title'].'" data-select="'.$data['media_select'].'">' . $data['upload_title'] . '</a>';
                        echo '<input type="hidden" name="'.$data['option_name'].'['.$data['name'].'][background-image]" id="'.$data['id'].'-background-image" value="'.$data['value']['background-image'].'" class="options-media-id" />';
                        $image_display = (!$data['value']['background-image']) ? ' style="display: none;"' : '';
                        echo '<div class="options-media-thumb"'.$image_display.'>';
                            echo '<img src="'.$img_url[0].'" />';
                            $edit_link = ( !empty($img_url) ) ? admin_url('post.php?action=edit&post='.$data['value']['background-image']) : '#';
                            echo '<a href="#" class="options-media-remove" title="' . __('Remove', $object->domain) . '"><div class="dashicons dashicons-no-alt"></div></a>';
                            echo '<a href="'.$edit_link.'" class="options-media-edit" title="' . __('Edit', $object->domain) . '" target="_blank"><div class="dashicons dashicons-edit"></div></a>';
                        echo '</div>';
                    echo '</div>';
                echo '</td>';
            echo '</tr>';
        echo '</table>';
        echo '<table>';
            echo '<tr class="image"'.(($data['value']['background-image']) ? '' : ' style="display: none;"').'>';
                echo '<td width="50%">';
                    echo '<select name="'.$data['option_name'].'['.$data['name'].'][background-attachment]" id="'.$data['id'].'-background-attachment" class="selectize" placeholder="'.__('Background Attachment', $self->domain).'">';
                        foreach(array('scroll','fixed','local','initial','inherit') as $key => $val){
                            echo '<option value="'.$val.'"'.(($data['value']['background-attachment'] == $val) ? ' selected="selected"' : '').'>'.$val.'</option>';
                        }
                    echo '</select>';
                echo '</td>';
                echo '<td width="50%">';
                    echo '<select name="'.$data['option_name'].'['.$data['name'].'][background-position]" id="'.$data['id'].'-background-position" class="selectize" placeholder="'.__('Background Position', $self->domain).'">';
                        foreach(array('left top','left center','left bottom','right top','right center','right bottom','center top','center center','center bottom') as $key => $val){
                            echo '<option value="'.$val.'"'.(($data['value']['background-position'] == $val) ? ' selected="selected"' : '').'>'.$val.'</option>';
                        }
                    echo '</select>';
                echo '</td>';
            echo '</tr>';
            echo '<tr class="image"'.(($data['value']['background-image']) ? '' : ' style="display: none;"').'>';
                echo '<td width="50%">';
                    echo '<select name="'.$data['option_name'].'['.$data['name'].'][background-size]" id="'.$data['id'].'-background-size" class="selectize" placeholder="'.__('Background Size', $self->domain).'">';
                        foreach(array('auto','cover','contain','initial','inherit') as $key => $val){
                            echo '<option value="'.$val.'"'.(($data['value']['background-size'] == $val) ? ' selected="selected"' : '').'>'.$val.'</option>';
                        }
                    echo '</select>';
                echo '</td>';
                echo '<td width="50%">';
                    echo '<select name="'.$data['option_name'].'['.$data['name'].'][background-repeat]" id="'.$data['id'].'-background-repeat" class="selectize" placeholder="'.__('Background Repeat', $self->domain).'">';
                        foreach(array('repeat','repeat-x','repeat-y','no-repeat','initial','inherit') as $key => $val){
                            echo '<option value="'.$val.'"'.(($data['value']['background-repeat'] == $val) ? ' selected="selected"' : '').'>'.$val.'</option>';
                        }
                    echo '</select>';
                echo '</td>';
            echo '</tr>';
        echo '</table>';
    }
    
}