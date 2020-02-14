import { initCardState } from './card';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

const PPF = () => new ObservableArray([
    // texts: @source https://www.simplytarot.com/tarot-spreads/past-present-future-tarot-spread/
    // icm with the word "seeker" from @see https://divinationandfortunetelling.com/articles/2017/4/30/the-celtic-cross-tarot-spread
    { title: 'Past', detail: 'past - highlights people, situations and/or influences from the past that still have an affect on the seeker' },
    { title: 'Present', detail: 'present - illustrates the current situation and key people who may bear influence on the seeker' },
    { title: 'Future', detail: 'future - based on what is happening now: the natural follow on, or outcome, for the seeker' }
]);
export const initPPFState = () => PPF().map(position => ({ ...position, ...initCardState() }));

const CC = () => new ObservableArray([
    // titles from @source https://i.pinimg.com/474x/b9/d6/04/b9d60400bb7b33a7872bf7b87012a86c--tarot-spreads-celtic-crosses.jpg
    // texts from @source https://divinationandfortunetelling.com/articles/2017/4/30/the-celtic-cross-tarot-spread
    { title: 'Significator', detail: 'significator - determines the positions of the rest of the reading' },
    { title: 'Covering Card', detail: 'covers seeker - outlines the situation which the seeker finds themselves in' },
    { title: 'Crossing Card', detail: 'crosses seeker - indicates the problem which the seeker is going through and why they have come for a reading' },
    { title: 'Crown', detail: 'crowns seeker - usually shows the best the seeker can hope for out of the situation' },
    { title: 'Grave', detail: 'below seeker - it drives the psychological reasons why the seeker wishes to know what is going to happen in the future instead of letting it just be as it will be' },
    { title: 'Past Influence', detail: 'behind seeker - concerns the recent past of the situation at hand' },
    { title: 'Future Influence', detail: 'in front of seeker - what can be expected in the very short term future' },
    { title: 'Personal', detail: 'seeker him/her self - outlines the seeker and their attitude towards the situation in general' },
    { title: 'Environmental', detail: 'seeker’s house - outlines the environment which the seeker finds themselves in which influences the question' },
    { title: 'Psychological', detail: 'hopes & fears - read a ‘positive’ card in this position as hopes and negative cards as ‘fears’' },
    { title: 'Future', detail: 'outcome - shows the long term outcome which the seeker will get for the whole situation' }
]);
export const initCCState = () => CC().map(position => ({ ...position, ...initCardState() }));
