import { Cards } from '../data/cards.js';
import dayjs from '../dayjs';

export default {
    name: 'Card',
    data() {
        return {
            DEBUG: true,
            issuedCardIds: new Map()
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
            if (id % 1) id = Math.floor(id);
            // return copy of card data
            const card = { ...Cards.find(d => d.id === id) };

            // set id to [card data id].[instance num] 
            // @TODO dispatch load from long term storage
            // @TODO dispatch set to long term storage
            // @TODO (maybe) incorporate js big decimal for endless viewing pleasure?
            const instanceIds = this.issuedCardIds.get(card.id) || [];
            const lastIssuedId = instanceIds.pop() || 0.0;
            const lastInstanceSubId = lastIssuedId - Math.floor(lastIssuedId);
            const newCardId = +(card.id + '.' + (lastInstanceSubId + 1));
            this.issuedCardIds.set(card.id, [...instanceIds, newCardId]);
            card.id = newCardId;
            // set timestamp
            card.timestamp = !dayjs.isDayjs(dT) ? dayjs().endOf(dT).format() : dT.format();
            // set the rest
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
        }
    },
};
