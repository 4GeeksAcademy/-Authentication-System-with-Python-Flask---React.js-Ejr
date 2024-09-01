export function truncateName(name) {
    const words = name.split(' ');
    if (words.length > 3) {
        return words.slice(0, 3).join(' ') + '...';
    }
    return name;
}


export function showTooltip(index, event) {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) {
        const { top, left, width } = event.target.getBoundingClientRect();
        tooltip.style.top = `${top - tooltip.offsetHeight - 8}px`; // 8px de margen
        tooltip.style.left = `${left + width / 2 - tooltip.offsetWidth / 2}px`; // Centrar horizontalmente
        tooltip.classList.remove('invisible', 'opacity-0');
        tooltip.classList.add('visible', 'opacity-100');
    }
}

export function hideTooltip(index) {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) {
        tooltip.classList.remove('visible', 'opacity-100');
        tooltip.classList.add('invisible', 'opacity-0');
    }
}
