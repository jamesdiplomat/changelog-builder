const CHARACTER_LIMIT = 15000;

export const setEventChange = (setter: (_: any) => void) => {
    const changer = (event: any) => {
        const input = event.target.value;
        if (input.length <= CHARACTER_LIMIT) {
            setter(input);
        }
    };
    return changer;
};