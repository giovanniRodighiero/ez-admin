import React from 'react';
import { MdSave } from 'react-icons/md';

import PageTitle from '../components/PageTitle';
import FieldMetaTags from '../components/FieldMetaTags';
import PagesHomepageHero from '../components/PagesHomepageHero';
import FloatingButton from '../components/FloatingButton';

import I18n from '../config/I18n';
import GlobalContext from '../components/GlobalContext';
import Api from '../Api';

const HOMEPAGE_PATH = '/api/v1/pages/homepage';

class PagesHomepage extends React.Component {

    state = {
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
            imageDesktop: '',
            imageMobile: '',
            title: '',
            subtitle: '',
            description: ''
        }
    }

    constructor (props) {
        super(props);

        this.onImageUploaded = this.onImageUploaded.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    async componentDidMount () {
        try {
            const homepage = await Api.get(HOMEPAGE_PATH);
            this.setState(homepage);
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }

    render () {
        const { meta, hero } = this.state;
        return (
            <form onSubmit={this.onSave}>
                <PageTitle>{I18n.t.homepage.pageTitle}</PageTitle>

                <FieldMetaTags
                    cardSubtitle={I18n.t.homepage.metaTagsDescription}
                    meta={meta}
                    onMetaChange={this.onFieldChange('meta')}
                    onImageUploaded={this.onImageUploaded('meta')}
                />

                <PagesHomepageHero
                    hero={hero}
                    onImageUploaded={this.onImageUploaded}
                    onHeroChange={this.onFieldChange('hero')}
                />

                <FloatingButton type="submit">
                    <MdSave size="28px" />
                </FloatingButton>
            </form>
        )
    }

    onFieldChange (prefix) {
        return event => {
            const { value, name } = event.target;
            this.setState(prevState => ({ [prefix]: { ...prevState[prefix], [name]: value } }));
        }
    }

    onImageUploaded (prefix, fieldName = 'image') {
        return (image, done) => this.setState(prevState => ({
            [prefix]: { ...prevState[prefix], [fieldName]: image }
        }), done);
    }

    async onSave (event) {
        event.preventDefault();

        try {
            const homepage = await Api.put(HOMEPAGE_PATH, this.state);
            this.setState(homepage);
            this.context.setNotification({
                notificationType: 'success',
                notificationMessage: I18n.t.homepage.notification.success
            });
        } catch (error) {
            console.log(error);
            this.context.setNotification({
                notificationType: 'error',
                notificationMessage: I18n.t.generic.error
            });
        }
    }
};

PagesHomepage.contextType = GlobalContext;

export default PagesHomepage;
