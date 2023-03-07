const generateRandomQuestion = require("./generateRandomQuestion");

describe(generateRandomQuestion, () => {
    it("generated a random math question", () => {
        const {question, answer} = generateRandomQuestion();
        expect(answer).toBeLessThan(100);
    })
});