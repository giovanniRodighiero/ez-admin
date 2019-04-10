export default {
    generic: {
        error: 'Si è verificato un errore',
        upload: 'Seleziona nuova immagine',
        savedSuccessfully: 'Salvato correttamente'
    },

    topBar: {
        title: 'Amministrazione'
    },

    navBar: {
        pages: 'Pagine e contenuti',
        admin: 'Amministrazione',
        users: 'Utenti',
        settings: 'Impostazioni sito',
        pagesHomepage: 'Homepage'
    },

    tables: {
        labelRowsPerPage: 'Numero di righe visibili'
    },

    loginPage: {
        title: 'Base Admin',
        subtitle: 'Effettua il login per accedere all\'area di amministrazione.',
        button: 'Login',
        not_found: 'Utente non esistente.',
        not_confirmed: 'L\'account non è stato ancora confermato.',
        wrong_password: 'Combinazione utente/password non trovata.',
    },

    users: {
        pageTitle: 'Gestione utenti',
        newUsersPageTitle: 'Creazione utente',
        newUsersPersonalInfos: 'Informazioni utente',
        updateUsersPageTitle: 'Modifica utente',
        role: 'Ruolo',
        roles: {
            70: 'Utente',
            80: 'Editor',
            90: 'Amministratore',
            100: 'Super Admin'
        },
        listDialog: {
            title: 'Conferma cancellazione utente',
            text: 'Sei sicuro di voler eliminare questo utente ?',
            cancel: 'Annulla',
            confirm: 'Elimina'
        },
        actions: 'Azioni',
        accountStatus: 'Stato account',
        accountConfirmed: 'Account confermato',
        accountNotConfirmed: 'Account non confermato',
        writes: {
            emailHelper: 'Verrà inviata una mail di conferma a questo indirizzo'
        },
        notification: {
            success: 'Utente salvato con successo !',
            error: 'Errore durante il salvataggio dell\'utente',
            deleteSuccess: 'Utente eliminato con successo'
        },
        errors: {
            'already_existing': 'Indirizzo email già in uso'
        }
    },

    profile: {
        pageTitle: 'Modifica profilo',
        profileSave: 'Salva',
        updatedSuccess: 'Aggiornato con successo',
        updatedError: 'Si è verificato un errore',
        personalData: 'Informazioni personali',
        updatePassword: 'Modifica password'
    },

    settings: {
        pageTitle: 'Gestione impostazioni sito',
        metaTags: 'Meta tags',
        metaTagsSubtitle: 'Utilizzati come default per tutte le pagine in mancanza di specifici',
        generic: 'Impostazioni generiche',
        image: 'Immagine di anteprima',
        lang: 'Lingua',
        langs: { it: 'Italiano', en: 'Inglese' },
        notification: {
            success: 'Impostazioni aggiornate con successo'
        }
    },

    homepage: {
        pageTitle: 'Modifica homepage del sito',
        metaTagsDescription: 'Informazioni per SEO e social',
        hero: {
            imageDesktop: 'Immagine di copertina (Desktop)',
            imageMobile: 'Immagine di copertina (Mobile)',
            cardTitle: 'Testata della pagina',
            cardSubtitle: 'Informazioni riguardanti l\'immagine di copertina, titolo seo e abstract del sito',
            title: 'Titolo SEO (H1)',
            subtitle: 'Sottotitolo SEO (H2)',
            description: 'Abstract / descrizione'
        },
        services: {
            cardTitle: 'Sezione servizi',
            cardSubtitle: 'Informazioni riguardati la sezione servizi',
            title: 'Titolo della sezione',
            itemsTitle: 'Nome del servizio',
            itemsDescription: 'Descrizione del servizio',
            itemsImage: 'Immagine del servizio'
        },
        notification: {
            success: 'Homepage aggiornata con successo'
        }
    }
}