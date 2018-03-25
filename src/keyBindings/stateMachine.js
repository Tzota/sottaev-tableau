// @flow
import {range} from 'ramda';
import store from '../store';

import {
    init,
    toggleCountdown,
    round,
    redPoints,
    bluePoints,
    redForbidden,
    blueForbidden,
    redOut,
    blueOut,
    redNonSport,
    blueNonSport,
    reset,
    swapCorners,
    historyBack,
} from '../actions';

const stateMachine = {
    F5: {
        none: () => reset(),
    },
    Escape: {
        none: () => reset(),
    },
    Space: {
        none: () => toggleCountdown(),
    },
    KeyS: {
        isRight: {
            none: () => swapCorners(),
        },
        isLeft: {
            none: () => swapCorners(),
        },
    },
    Backspace: {
        none: () => historyBack(),
    },
};

// 3. Время раунда от 1 минуты до 10 минут устанавливается при удержании левой кнопки клавиатуры «Ctrl» и нажатии цифирных кнопок «0,1,2,3,4....10»,
//     таймер должен включаться при нажатии на кнопку клавиатуры «ПРОБЕЛ»
//     пауза тоже срабатывает при нажатии «ПРОБЕЛА»
// 4. Номер раунда от 1 до 9 устанавливается при удержании левой кнопки клавиатуры «Ctrl» и кнопки русской буквы «Р», и нажатии цифирных кнопок «0,1,2,3,4….9».

range(0, 10).forEach(i => {
    stateMachine[`Digit${i}`] = {
        isRight: {
            none: () => init(i, store.getState().keyStoreHistory, store.getState().seconds),
            KeyH: () => round(i),
            // 6. Баллы «КРАСНОГО ФОНА» от 1 до 9 устанавливается при удержании левой кнопки клавиатуры «Ctrl» и кнопки русской буквы «Б» и нажатии цифирных кнопок «0,1,2,3,4….9».
            Comma: () => redPoints(i),
            // 8. Нарушения «ЗАПРЕЩЁННАЯ ТЕХНИКА» «КРАСНОГО ФОНА» от 1 до 9 устанавливается при удержании левой кнопки клавиатуры «Ctrl» и кнопки русской буквы «З» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyP: () => redForbidden(i),
            // 11. Нарушения «ВЫХОД ЗА ПЛОЩАДКУ» «КРАСНОГО ФОНА» от 1 до 9 устанавливается при удержании левой кнопки клавиатуры «Ctrl» и кнопки русской буквы «В» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyD: () => redOut(i),
            // 13. Нарушения «НЕСПОРТИВНОЕ ПОВЕДЕНИЕ» «КРАСНОГО ФОНА» от 1 до 9 устанавливается при удержании левой кнопки клавиатуры «Ctrl» и кнопки русской буквы «Н» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyY: () => redNonSport(i),
        },
        isLeft: {
            none: () => init(i, store.getState().keyStoreHistory, store.getState().seconds),
            KeyH: () => round(i),
            // 5. Баллы «СИНЕГО ФОНА» от 1 до 9 устанавливается при удержании правой кнопки клавиатуры «Ctrl» и кнопки русской буквы «Б» и нажатии цифирных кнопок «0,1,2,3,4….9».
            Comma: () => bluePoints(i),
            // 7. Нарушения «ЗАПРЕЩЁННАЯ ТЕХНИКА» «СИНЕГО ФОНА» от 1 до 9 устанавливается при удержании правой кнопки клавиатуры «Ctrl» и кнопки русской буквы «З» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyP: () => blueForbidden(i),
            // 10. Нарушения «ВЫХОД ЗА ПЛОЩАДКУ» «СИНЕГО ФОНА» от 1 до 9 устанавливается при удержании правой кнопки клавиатуры «Ctrl» и кнопки русской буквы «В» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyD: () => blueOut(i),
            // 12. Нарушения «НЕСПОРТИВНОЕ ПОВЕДЕНИЕ» «СИНЕГО ФОНА» от 1 до 9 устанавливается при удержании правой кнопки клавиатуры «Ctrl» и кнопки русской буквы «Н» и нажатии цифирных кнопок «0,1,2,3,4…».
            KeyY: () => blueNonSport(i),
        },
    };
});

export default stateMachine;