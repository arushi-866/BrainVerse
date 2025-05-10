import { createPopper } from '@popperjs/core';

export function initializeDropdowns() {
    const popperInstance = {};
    
    document.querySelectorAll('.dropdown').forEach((item, index) => {
        const popperId = `popper-${index}`;
        const toggle = item.querySelector('.dropdown-toggle');
        const menu = item.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        menu.dataset.popperId = popperId;
        popperInstance[popperId] = createPopper(toggle, menu, {
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: [0, 8] }
                },
                {
                    name: 'preventOverflow',
                    options: { padding: 24 }
                }
            ],
            placement: 'bottom-end'
        });
    });

    return {
        hideDropdown() {
            document.querySelectorAll('.dropdown-menu').forEach(item => {
                item.classList.add('hidden');
            });
        },
        
        showPopper(popperId) {
            if (!popperInstance[popperId]) return;
            popperInstance[popperId].setOptions(options => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: true }
                ]
            }));
            popperInstance[popperId].update();
        },
        
        hidePopper(popperId) {
            if (!popperInstance[popperId]) return;
            popperInstance[popperId].setOptions(options => ({
                ...options,
                modifiers: [
                    ...options.modifiers,
                    { name: 'eventListeners', enabled: false }
                ]
            }));
        }
    };
}
