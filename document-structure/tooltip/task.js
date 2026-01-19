const tips = Array.from(document.querySelectorAll('.has-tooltip'));

tips.forEach(item => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = item.title;
    item.after(tooltip);
    item.removeAttribute('title')

    item.addEventListener('click', function(event) {
        event.preventDefault();
        const ifMarked = document.querySelector('.tooltip_active');
        if (ifMarked) {
            ifMarked.classList.remove('tooltip_active');
        }
        tooltip.classList.add('tooltip_active');
        const position = item.dataset.position || bottom;

        const rect = item.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        switch (position) {
            case 'top':
                tooltip.style.top = (rect.top - tooltipRect.height - 5) +'px';
                tooltip.style.left = (rect.left + (rect.width - tooltipRect.width) / 2) +'px';
                break;
            case 'bottom':
                tooltip.style.top = (rect.top + tooltipRect.height - 5) +'px';
                tooltip.style.left = (rect.left + (rect.width - tooltipRect.width) / 2) +'px';
                break;
            case 'left':
                tooltip.style.top = (rect.top + (rect.height - tooltipRect.height) / 2) +'px';
                tooltip.style.left = (rect.left - tooltipRect.width - 5) +'px';
                break;
            case 'right':
                tooltip.style.top = (rect.top + (rect.height - tooltipRect.height) / 2) +'px';
                tooltip.style.left = (rect.right + 5) +'px';
                break;
        }
    })
})