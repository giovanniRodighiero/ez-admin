import update from 'immutability-helper';
import React from 'react';
import { MdSave } from 'react-icons/md';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PageTitle from '../components/PageTitle';
import FieldMetaTags from '../components/FieldMetaTags';
import PagesHomepageHero from '../components/PagesHomepageHero';
import PagesHomepageServices from '../components/PagesHomepageServices';
import PagesHomepageCta from '../components/PagesHomepageCta';
import FloatingButton from '../components/FloatingButton';

import I18n from '../config/I18n';
import { availableLangs } from '../config';
import GlobalContext from '../components/GlobalContext';
import Api from '../Api';

import BasicDispatchers, { ACTIONS } from '../services/dispatchers';

const HOMEPAGE_PATH = '/api/v1/pages/homepage';

const defaultService = {
    title: '',
    description: '',
    image: '',
    position: -1
};
const initialState = {};
availableLangs.forEach(lang => {
    initialState[lang] = {
        meta: {
            image: '',
            title: '',
            description: '',
    
            ogUrl: '',
            ogTitle: '',
            ogDescription: '',
    
            twitterUrl: '',
            twitterTitle: '',
            twitterDescription: '',
        },
        hero: {
            title: '',
            subtitle: '',
            description: EditorState.createEmpty()
        },
        services: {
            title: '',
            items: []
        },
        cta: {
            title: '',
            link: ''
        }
    }
});

const useStyles = makeStyles(theme => ({
    tabs: {
        marginBottom: '15px'
    }
}));

function reducer (state, action) {
    switch (action.type) {
        case ACTIONS.base_field_change:
            return update(state, {
                [action.lang || 'it']: { [action.prefix]: { [action.name]: { $set: action.value } } }
            });
    
        case ACTIONS.add_service_item:
            return update(state, {
                [action.lang || 'it']: { services: { items: { $push: [ defaultService ] } } }
            });
        
        case ACTIONS.remove_service_item:
            return update(state, {
                [action.lang || 'it']: { services: { items: { $splice: [[action.index, 1]] } } }
            });
        
        case ACTIONS.change_service_item:
            return update(state, {
                [action.lang || 'it']: { services: { items: { [action.index]: { [action.name]: { $set: action.value } } } } }
            });

        case ACTIONS.move_service_item:
            return update(state, {
                [action.lang || 'it']: { services: { items: {
                    [action.dragIndex]: { position: { $set: action.hoverIndex } },
                    [action.hoverIndex]: { position: { $set: action.dragIndex } }
                } } }
            });
        
        case ACTIONS.replace_whole:
            return update(state, { $set: action.value });
    }
}

function PagesHomePage () {

    const globalContext = React.useContext(GlobalContext);
    const [ activeLang, setActiveLang ] = React.useState(availableLangs[0]);
    const [ state, dispatch ] = React.useReducer(reducer, initialState);


    // NEW FETCHED DATA CALLBACK
    const onFetchedData = homepage => {
        availableLangs.forEach(lang => {
            const descriptionBlocksFromHtml = convertFromHTML(homepage[lang].hero.description);
            homepage[lang].hero.description = EditorState.createWithContent(ContentState.createFromBlockArray(
                descriptionBlocksFromHtml.contentBlocks,
                descriptionBlocksFromHtml.entityMap
            ));
        });
        dispatch({ type: ACTIONS.replace_whole, value: homepage });
    }

    /************************* BASIC CALLBACKS ******************************/
    const { onFieldChange, onImageUploaded, onRichEditorUpdate } = BasicDispatchers(dispatch, activeLang);

    /***************************** SERVICES CALLBACKS *******************/
    const onAddServiceItem = type => _ => dispatch({
        type: ACTIONS.add_service_item,
        lang: activeLang
    });

    const onRemoveServiceItem = index => _ => dispatch({
        type: ACTIONS.remove_service_item,
        index,
        lang: activeLang
    });

    const onImageUploadedServiceItem = ({ index, fieldName = 'image' }) => (value, done) => {
        dispatch({
            type: ACTIONS.change_service_item,
            index,
            name: fieldName,
            value,
            lang: activeLang
        });
        done();
    };

    const onChangeServiceItem = ({ index }) => event => dispatch({
        type: ACTIONS.change_service_item,
        index,
        name: event.target.name,
        value: event.target.value,
        lang: activeLang
    });

    const onMoveServiceItem = (dragIndex, hoverIndex) => dispatch({
        type: ACTIONS.move_service_item,
        dragIndex,
        hoverIndex,
        lang: activeLang
    });


    /***************************** SAVING CALLBACK ***********************/
    const onSave = async event => {
        event.preventDefault();

        const payload = { ...state };
        availableLangs.forEach(lang => {
            payload[lang].hero.description = draftToHtml(convertToRaw(state[lang].hero.description.getCurrentContent()));
        });
        try {
            const homepage = await Api.put(HOMEPAGE_PATH, payload);
            onFetchedData(homepage);
            globalContext.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.homepage.notification.success
            });
        } catch (error) {
            console.log(error);
            globalContext.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }

    React.useEffect(() => {

        async function fetchData () {
            try {
                const homepage = await Api.get(HOMEPAGE_PATH);
                onFetchedData(homepage);
            } catch (error) {
                console.log(error);
                globalContext.setNotification({
                    notificationType: 'error',
                    notificationMessage: I18n.t.generic.error
                });
            }
        }

        fetchData();
    }, []);

    const classes = useStyles();

    return (
        <form onSubmit={onSave} autoComplete="off">
            <input type="hidden" autoComplete="false" />
            <PageTitle>{I18n.t.homepage.pageTitle}</PageTitle>

            <Tabs
                value={activeLang}
                onChange={(e, activeLang) => setActiveLang(activeLang)}
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabs}
            >
                { availableLangs.map(lang => (
                    <Tab label={I18n.t.generic[lang]} key={lang} value={lang} />
                ))}
            </Tabs>

            <FieldMetaTags
                cardSubtitle={I18n.t.homepage.metaTagsDescription}
                meta={state[activeLang].meta}
                onMetaChange={onFieldChange('meta')}
                onImageUploaded={onImageUploaded({ prefix: 'meta' })}
            />

            <PagesHomepageHero
                hero={state[activeLang].hero}
                onImageUploaded={onImageUploaded}
                onHeroChange={onFieldChange('hero')}
                onRichEditorUpdate={onRichEditorUpdate}
            />

            <PagesHomepageServices
                services={state[activeLang].services}
                onServiceChange={onFieldChange('services')}
                onAddServiceItem={onAddServiceItem}
                onRemoveServiceItem={onRemoveServiceItem}
                onImageUploaded={onImageUploadedServiceItem}
                onChangeServiceItem={onChangeServiceItem}
                onMoveServiceItem={onMoveServiceItem}
            />

            <PagesHomepageCta
                cta={state[activeLang].cta}
                onCtaChange={onFieldChange('cta')}
            />

            <FloatingButton type="submit">
                <MdSave size="28px" />
            </FloatingButton>
        </form>
    );

};

export default PagesHomePage;