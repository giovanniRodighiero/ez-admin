export default {
    generic: {
        error: 'Si è verificato un errore',
    },

    topBar: {
        title: 'Amministrazione'
    },

    navBar: {
        pages: 'Pagine e contenuti',
        admin: 'Amministrazione',
        users: 'Utenti',
        settings: 'Impostazioni sito'
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
        role: 'Ruolo',
        roles: {
            70: 'Utente',
            80: 'Editor',
            90: 'Amministratore'
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
            success: 'Utente creato con successo !',
            error: 'Errore durante la creazione dell\'utente'
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
        pageTitle: 'Impostazioni sito',
        metaTags: 'Meta tags',
        metaTagsSubtitle: 'Utilizzati come default per tutte le pagine in mancanza di specifici',
        notification: {
            success: 'Impostazioni aggiornate con successo'
        }
    }
}