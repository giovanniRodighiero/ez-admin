import React from 'react';
import { MdSave } from 'react-icons/md';

import PageTitle from '../components/PageTitle';
import FieldMetaTags from '../components/FieldMetaTags';
import PagesHomepageHero from '../components/PagesHomepageHero';
import PagesHomepageServices from '../components/PagesHomepageServices';
import PagesHomepageCta from '../components/PagesHomepageCta';
import FloatingButton from '../components/FloatingButton';

import I18n from '../config/I18n';
import GlobalContext from '../components/GlobalContext';
import Api from '../Api';

const HOMEPAGE_PATH = '/api/v1/pages/homepage';

class PagesHomepage extends React.Component {

    defaultService = {
        title: '',
        description: '',
        image: '',
        position: -1
    };

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

    constructor (props) {
        super(props);

        this.onImageUploaded = this.onImageUploaded.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onAddServiceItem = this.onAddServiceItem.bind(this);
        this.onRemoveServiceItem = this.onRemoveServiceItem.bind(this);
        this.onImageUploadedServiceItem = this.onImageUploadedServiceItem.bind(this);
        this.onChangeServiceItem = this.onChangeServiceItem.bind(this);
        this.onMoveServiceItem = this.onMoveServiceItem.bind(this);
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
        const { meta, hero, services, cta } = this.state;
        return (
            <form onSubmit={this.onSave} autoComplete="off">
                <input type="hidden" autoComplete="false" />
                <PageTitle>{I18n.t.homepage.pageTitle}</PageTitle>

                    <FieldMetaTags
                        cardSubtitle={I18n.t.homepage.metaTagsDescription}
                        meta={meta}
                        onMetaChange={this.onFieldChange('meta')}
                        onImageUploaded={this.onImageUploaded({ prefix: 'meta' })}
                    />

                    <PagesHomepageHero
                        hero={hero}
                        onImageUploaded={this.onImageUploaded}
                        onHeroChange={this.onFieldChange('hero')}
                    />

                    <PagesHomepageServices
                        services={services}
                        onServiceChange={this.onFieldChange('services')}
                        onAddServiceItem={this.onAddServiceItem}
                        onRemoveServiceItem={this.onRemoveServiceItem}
                        onImageUploaded={this.onImageUploadedServiceItem}
                        onChangeServiceItem={this.onChangeServiceItem}
                        onMoveServiceItem={this.onMoveServiceItem}
                    />

                    <PagesHomepageCta
                        cta={cta}
                        onCtaChange={this.onFieldChange('cta')}
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

    onImageUploaded ({ prefix, fieldName = 'image' }) {
        return (image, done) => this.setState(prevState => (
            { [prefix]: { ...prevState[prefix], [fieldName]: image }
        }), done);
    }


    /****************  SERVICE ITEMS MANAGEMENT *************/

    onImageUploadedServiceItem (index) {
        return (image, done) => this.setState(prevState => {
            const items = [ ...prevState.services.items ];
            items[index].image = image;
            return { services: { ...prevState.services, items } };
        }, done);
    }

    onAddServiceItem (type) {
        return _ => {
            const items = [ ...this.state.services.items ];
            items.push({ ...this.defaultService });
            this.setState(prevState => ({ services: { ...prevState.services, items } }));
        }
    }

    onRemoveServiceItem (serviceIndex) {
        return _ => {
            const { items } = this.state.services;
            const newItems = items.slice(0, serviceIndex).concat(items.slice(serviceIndex + 1, items.length));
            this.setState(prevState => ({ services: { ...prevState.services, items: newItems } }));
        }
    }

    onChangeServiceItem (index) {
        return event => {
            const { value, name } = event.target;
            this.setState(prevState => {
                const items = [ ...prevState.services.items ];
                items[index][name] = value;
                return { services: { ...prevState.services, items } };
            });
        }
    }

    onMoveServiceItem (dragIndex, hoverIndex) {
        this.setState(prevState => {
            const items = [ ...prevState.services.items ];
            items[dragIndex].position = hoverIndex;
            items[hoverIndex].position = dragIndex;
            return { services: { ...prevState.services, items } };
        });
    }

    /****************  FORM SAVE  ****************/

    async onSave (event) {
        
        try {
            event.preventDefault();
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
