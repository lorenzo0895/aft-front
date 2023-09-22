export interface ICoaIcon {
  [key: string]: ICoaIconItem
}
export interface ICoaIconItem {
  icon: string,
  iconClass?: string,
}

export const getIconValue = (type: string, value: any) => {
  switch(type) {
    case 'trueFalse':
      return String(value);
    default:
      return 'default';
  }
}

export const coaIcon: ICoaIcon = {
  active: {
    icon: 'flash_on',
    iconClass: 'active-style',
  },
  inactive: {
    icon: 'flash_off',
    iconClass: 'inactive-style',
  },
  pause: {
    icon: 'flash_off',
    iconClass: 'inactive-style',
  },
  incomplete: {
    icon: 'flash_off',
    iconClass: 'inactive-style',
  },
  internal: {
    icon: 'present_to_all',
    iconClass: 'primary-coa',
  },
  in: {
    icon: 'call_received',
    iconClass: 'green-coa',
  },
  out: {
    icon: 'call_made',
    iconClass: 'lightblue-coa',
  },
  unknown: {
    icon: 'cancel_presentation',
    iconClass: 'yellow-coa',
  },
  true: {
    icon: 'pi-check',
    iconClass: 'green',
  },
  false: {
    icon: 'pi-times',
    iconClass: 'red',
  },
  max: {
    icon: 'high',
  },
  med: {
    icon: 'medium',
  },
  min: {
    icon: 'low',
  },
  default: {
    icon: '',
    iconClass: 'inactive-style',
  },
};
