import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, position: 'relative' }),
        animate('.2s .1s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true }
    ),
  ]),
]);
