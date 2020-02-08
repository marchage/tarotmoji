import { Cards } from '../data/cards.js';
import dayjs from '../dayjs';

export default {
    name: 'Card',
    data() {
        return {
            DEBUG: true
        }
    },
    methods: {
        // all has to be methods, no caching
        rndEndOf() {
            return [
                "year",
                "day",
                "hour",
                "minute",
                "month",
                "day",
                "hour",
                "minute",
                "quarter",
                "day",
                "hour",
                "minute",
                "week",
                "day",
                "hour",
                "minute",
                "second"].reduce((s, d, i, a) => s || a[Math.round(Math.random() * 16)], '');
        },
        rndDirection() {
            return !!Math.floor(Math.random() * 2);
        },
        rndCardId() {
            return Math.floor(Math.random() * (Cards.length));
        },
        getCardInstance(dT = 'day', reversed = this.rndDirection(), id = this.rndCardId()) {
            const card = { ...Cards.find(d => d.id === id) };

            card.timestamp = !dayjs.isDayjs(dT) ? dayjs().endOf(dT).format() : dT.format();
            card.reversed = reversed;

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

            if (!reversed) {
                card.meaning = card.meaning_up;
                card.icon = 'emoji';
            } else {
                card.meaning = card.meaning_rev;
                card.icon = 'emoji reversed';
            }

            return card;
        },
        // not in use anymore (left here to confuse you?)
        loadCardThisProps(dT = 'day', reversed = this.rndDirection(), id = this.rndCardId()) {
            let card = this.getCardInstance(dT, reversed, id);

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
