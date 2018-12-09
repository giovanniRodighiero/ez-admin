class I18n {
    static supportedLangs = ['it', 'en'];

    static mapBrowserLangs = {
        'en': 'it',
        'en-US': 'it',
        'en-GB': 'it',
        'it': 'it',
        'it-IT': 'it'
    };

    static t = null;

    static async init (lang) {
        let langModule;
        this.activeI18n = null;

        if (!!lang && this.supportedLangs.includes(lang)) {
            langModule = await import(`./${lang}`);
        } else {
            const browserLang = this.mapBrowserLangs[navigator.language] ? this.mapBrowserLangs[navigator.language] : 'it';
            // const browserLang = 'it';

            langModule = await import(`./${browserLang}`);
        }

        this.t = langModule.default;

    }

}

export default I18n;