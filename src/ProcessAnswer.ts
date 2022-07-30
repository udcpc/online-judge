export const processAnswer = (
    submittedAnswer: string,
    actualAnswer: string
): boolean => {
    if (
        submittedAnswer.toLowerCase().replace(/\s/g, "") ===
        actualAnswer.toLowerCase().replace(/\s/g, "")
    ) {
        return true;
    }
    return false;
};
