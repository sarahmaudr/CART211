// Prototype interaction: remember each choice in sessionStorage
// (this is the "tracking" the project is about to expose later).
document.addEventListener('DOMContentLoaded', () => {

    // Page 1: the Start button initialises the session.
    const start = document.querySelector('.start-btn');
    if (start) {
        start.addEventListener('click', () => {
            sessionStorage.setItem('sessionStart', new Date().toISOString());
        });
    }

    // Pages 2-4, 6-7: clicking a card selects it and logs the choice.
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const group = card.dataset.group;
            document.querySelectorAll('.card[data-group="' + group + '"]')
                .forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            try { sessionStorage.setItem(group, card.dataset.value); } catch (e) {}
        });
    });

    // Page 5 : clicking a card selects it and logs the choice.
    document.querySelectorAll('.like').forEach(like => {
        like.addEventListener('click', () => {
            const group = like.dataset.group;
            document.querySelectorAll('.like[data-group="' + group + '"]')
                .forEach(c => c.classList.remove('selected'));
            like.classList.add('selected');
            try { sessionStorage.setItem(group, like.dataset.value); } catch (e) {}
        });
    });
    // Only one audio plays at a time
    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('play', () => {
            document.querySelectorAll('audio').forEach(other => {
                if (other !== audio) other.pause();
            });
        });
    });
});