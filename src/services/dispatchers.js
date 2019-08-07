export const ACTIONS = {
    base_field_change: 'base_field_change',
    add_service_item: 'add_service_item',
    remove_service_item: 'remove_service_item',
    change_service_item: 'change_service_item',
    move_service_item: 'move_service_item',
    replace_whole: 'replace_whole'
};

// BASE FIELD CALLBACKS

function basicDispatchers (dispatch, activeLang) {

    const onFieldChange = prefix => event => dispatch({
        type: ACTIONS.base_field_change,
        prefix,
        name: event.target.name,
        value: event.target.value,
        lang: activeLang
    });
    
    const onImageUploaded = ({ prefix, fieldName = 'image' }) => (image, done) => {
        dispatch({
            type: ACTIONS.base_field_change,
            prefix,
            name: fieldName,
            value: image,
            lang: activeLang
        });
        done();
    };
    
    const onRichEditorUpdate = ({ prefix, fieldName = 'description' }) => value => dispatch({
        type: ACTIONS.base_field_change,
        prefix,
        name: fieldName,
        value,
        lang: activeLang
    });

    return {
        onFieldChange,
        onImageUploaded,
        onRichEditorUpdate
    }
};

export default basicDispatchers;