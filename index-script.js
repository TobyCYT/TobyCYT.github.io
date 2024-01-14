document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('summary')
  .forEach(element => element.addEventListener('click', (event) => {
    const detailsElement = event.target.parentElement;
    const contentElement = event.target.nextElementSibling;

    // Chrome sometimes has a hiccup and gets stuck.
    if (contentElement.classList.contains('animation')) {
      // So we make sure to remove those classes manually,
      contentElement.classList.remove('animation', 'collapsing');
      // ... enforce a reflow so that collapsing may be animated again,
      void element.offsetWidth;
      // ... and fallback to the default behaviour this time.
      return;
    }

    const onAnimationEnd = cb => contentElement.addEventListener(
      "animationend", cb, {once: true}
    );

    // request an animation frame to force Safari 16 to actually perform the animation
    requestAnimationFrame(() => contentElement.classList.add('animation'));
    onAnimationEnd(() => contentElement.classList.remove('animation'));

    const isDetailsOpen = detailsElement.getAttribute('open') !== null;
    if (isDetailsOpen) {
      // prevent default collapsing and delay it until the animation has completed
      event.preventDefault();
      contentElement.classList.add('collapsing');
      onAnimationEnd(() => {
        detailsElement.removeAttribute('open');
        contentElement.classList.remove('collapsing');
      });
    }
}));