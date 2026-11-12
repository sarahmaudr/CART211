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

    // Pages 2-4: clicking a card selects it and logs the choice.
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const group = card.dataset.group;
            document.querySelectorAll('.card[data-group="' + group + '"]')
                .forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            try { sessionStorage.setItem(group, card.dataset.value); } catch (e) {}
        });
    });

    // Page 2: one Play button per card. Only one sample plays at a time.
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();   // playing a sample does not select the card
            const audio = btn.parentElement.querySelector('audio');

            // Stop every other sample first.
            document.querySelectorAll('.play-btn').forEach(other => {
                if (other !== btn) {
                    other.parentElement.querySelector('audio').pause();
                    other.classList.remove('playing');
                    other.textContent = 'Play';
                }
            });

            if (audio.paused) {
                audio.play();
                btn.classList.add('playing');
                btn.textContent = 'Pause';
            } else {
                audio.pause();
                btn.classList.remove('playing');
                btn.textContent = 'Play';
            }
        });
    });

    // Reset the button when a sample finishes.
    document.querySelectorAll('.card audio').forEach(audio => {
        audio.addEventListener('ended', () => {
            const btn = audio.parentElement.querySelector('.play-btn');
            btn.classList.remove('playing');
            btn.textContent = 'Play';
        });
    });
});