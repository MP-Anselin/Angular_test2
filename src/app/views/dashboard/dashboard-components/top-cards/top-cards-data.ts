export interface topcard {
  bgcolor: string,
  icon: string,
  amount: number,
  subtitle: string
}

export const topcards: topcard[] = [
  {
    bgcolor: 'success',
    icon: 'bi bi-person-hearts',
    amount: 0,
    subtitle: 'Friends online'
  },
  {
    bgcolor: 'danger',
    icon: 'bi bi-person-fill-slash',
    amount: 0,
    subtitle: 'Friends dont disturb'
  },
  {
    bgcolor: 'warning',
    icon: 'bi bi-people-fill',
    amount: 0,
    subtitle: 'Person dont disturb'
  },
  {
    bgcolor: 'info',
    icon: 'bi bi-diagram-3-fill',
    amount: 0,
    subtitle: 'Persons on online'
  },

]
