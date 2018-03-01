import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';

export const moveAnimation = trigger('itemAnim', [
  transition(':enter', [
    style({ transform: 'translateY(10%)', opacity: 0 }),
    animate(600)
  ]),
  transition(':leave', [
    style({ transform: 'translateY(10%)', opacity: 0 }),
    animate(600)
  ])
]);

export const fadeAnimation = trigger('itemFade', [
  transition(':enter', [style({ opacity: 0 }), animate(500)]),
  transition(':leave', [style({ opacity: 0 }), animate(500)])
]);
