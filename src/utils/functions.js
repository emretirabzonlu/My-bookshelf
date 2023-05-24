export const upperFirstLetters = (str) => {

    const words = str.split(" ")
    let tempArr = []
    for (let i = 0; i < words.length; i++) {
        let tempWords = ""
        for (let j = 0; j < words[i].length; j++) {
            if (j === 0) {
                tempWords += words[i][j].toUpperCase()
            }

            else (
                tempWords += words[i][j].toLowerCase()
            )

        }
        tempArr.push(tempWords)
    }

    const newStr = tempArr.join(" ")
    return newStr


}