// @flow
export const supressKeys = (e: KeyboardEvent) => {
    if (e.code === 'F11' || e.code === 'F12') {
        return;
    }

    e.preventDefault();
    e.stopPropagation();
};

