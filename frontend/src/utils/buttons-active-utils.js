export class ButtonsActiveUtils {
    static buttonsActive(buttons) {
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active');
        }
    }
}