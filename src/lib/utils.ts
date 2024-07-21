export const isLastLetterOfWord = (index: number, text: string) => {
    const nextChar = text[index + 1];
    return nextChar === ' ' || nextChar === undefined;
};