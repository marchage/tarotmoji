import { Cards } from '../data/cards.js';
import { UtilFuncs } from './UtilFuncs.js';

export default {
    name: 'Card',
    methods: {
        // all has to be methods, no caching
        todaysDate() {
            const todayDate = new Date();
            const dd = String(todayDate.getDate()).padStart(2, '0');
            const mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = todayDate.getFullYear();
            return mm + '/' + dd + '/' + yyyy;
        },
        howManyDaysAgo(ts) {
            const tsDateObj = new Date(ts);
            const timeDiff = new Date().getTime() - tsDateObj.getTime();
            return Math.floor(timeDiff / (1000 * 3600 * 24)); // difference in days
        },
        rndDirection() {
            return Math.round(Math.random() * 2);
        },
        rndCardId() {
            return Math.round(Math.random() * (Cards.length)); // TODO used to be 72???
        },
        getCardInstance(dir = this.rndDirection(), id = this.rndCardId()) {
            const card = { ...Cards.find(d => d.id === id) };

            card.timestamp = this.todaysDate();

            if (card.type !== 'major') {
                card.major = false;
                card.emoji = '';
                card.emoji1 = '~/assets/emoji/' + card.value + '.png';
                card.emoji2 = '~/assets/emoji/' + card.suit + '.png';
            } else {
                card.major = true;
                card.emoji = '~/assets/emoji/' + card.value + '.png';
                card.emoji1 = '';
                card.emoji2 = '';
            }

            if (!dir) {
                card.meaning = card.meaning_up;
                card.reversed = false;
                card.icon = 'emoji';
            } else {
                card.meaning = card.meaning_rev;
                card.reversed = true;
                card.icon = 'emoji reversed';
            }

            return card;
        },
        loadCardSetPropsToThis(dir = this.rndDirection(), id = this.rndCardId()) {
            let card = this.getCardInstance(dir, id);

            this.id = card.id;
            this.timestamp = card.timestamp;
            this.name = card.name;
            this.major = card.major;
            this.emoji = card.emoji;
            this.emoji1 = card.emoji1;
            this.emoji2 = card.emoji2;
            this.meaning = card.meaning;
            this.reversed = card.reversed;
            this.icon = card.icon;
        },
    },
};
