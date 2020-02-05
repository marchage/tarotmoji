export default {
    name: 'UtilFuncs',
    methods: {
        // util method to convert the input to string type
        convertToString(input) {
            if (input) {
                if (typeof input === "string") {
                    return input;
                }
                return String(input);
            }
            return '';
        },
        // convert string to words
        toWords(input) {
            input = this.convertToString(input);

            const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

            return input.match(regex);
        },
        // convert the input array to camel case
        toCamelCase(inputArray) {
            let result = "";

            for (let i = 0, len = inputArray.length; i < len; i++) {
                let currentStr = inputArray[i];
                let tempStr = currentStr.toLowerCase();
                if (i != 0) {
                    // convert first letter to upper case (the word is in lowercase) 
                    tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
                }
                result += tempStr;
            }
            return result;
        },
        // this method calls other methods
        toCamelCaseString(input) {
            let words = this.toWords(input);
            return this.toCamelCase(words);
        },
        // all has to be methods? no caching, or was...
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
        }
    },
};
