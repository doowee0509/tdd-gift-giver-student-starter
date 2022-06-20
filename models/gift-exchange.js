const { BadRequestError } = require("../utils/errors")

class GiftExchange{
    static pairs(names){
        if (names.length % 2) {
            throw new BadRequestError("The number of names provided cannot be odd.")
        }
        const pairs = []
        while (names.length) {
            let index1 = Math.floor(Math.random() * names.length)
            let person1 = names.splice(index1, 1)
            let index2 = Math.floor(Math.random() * names.length)
            let person2 = names.splice(index2, 1)
            pairs.push([person1[0], person2[0]])
        }
        return pairs
    }

    static traditional(names){
        // shuffling the array using Fisher-Yates (aka Knuth) Shuffle.
        let currentIndex = names.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

          // And swap it with the current element.
            [names[currentIndex], names[randomIndex]] = [
            names[randomIndex], names[currentIndex]];
        }

        // Creating the pairs strings
        const pairs = []
        for (let i = 0; i < names.length; i++) {
            const person1 = names[i]
            const person2 = i === names.length - 1 ? names[0] : names[i+1]
            pairs.push(`${person1} is giving a gift to ${person2}`)
        }

        return pairs
    }
}

module.exports = GiftExchange