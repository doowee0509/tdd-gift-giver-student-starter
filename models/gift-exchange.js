const { BadRequestError } = require("../utils/errors")

const quiz = [
    {
        question: "question #1",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #2",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #3",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #4",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
    {
        question: "question #5",
        answerChoices: [
            "a. first answer choice",
            "b. second answer choice",
            "c. third answer choice",
            "d. fourth answer choice",
        ],
    },
]

const pointsLookUp = [
    {
        a: 2,
        b: 3,
        c: 1,
        d: 0,
    },
    {
        a: 1,
        b: 2,
        c: 3,
        d: 0,
    },
    {
        a: 0,
        b: 1,
        c: 3,
        d: 2,
    },
    {
        a: 1,
        b: 3,
        c: 2,
        d: 0,
    },
    {
        a: 3,
        b: 2,
        c: 1,
        d: 0,
    },
]
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

    static async quiz(){
        return quiz
    }

    static async quizResults(answers) {
        let totalPoints = 0

        answers.forEach((answer, index) => {
            if (!pointsLookUp[index][answer] && pointsLookUp[index][answer] !== 0) {
                throw new BadRequestError("One or more of your answer choices was not listed. Try again!")
            }
            totalPoints += pointsLookUp[index][answer]
        })

        if (totalPoints < 4)return "personal care"
        if (totalPoints >= 4 && totalPoints < 8)return "clothing"
        if (totalPoints >= 8 && totalPoints < 12)return "accessories"
        if (totalPoints >= 12 && totalPoints < 16)return "home products"
        if (totalPoints >= 16 && totalPoints < 20)return "consumables"
        if (totalPoints >= 20)return "technology"
    }
}

module.exports = GiftExchange