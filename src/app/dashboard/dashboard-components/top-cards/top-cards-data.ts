export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string | number;
}

export const topcards: topcard[] = [

  
    {
        bgcolor: 'success',
        icon: 'bi bi-file',
        title: 'Form DA',
        subtitle: 0,
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: 'Form ITCM',
        subtitle: 0,
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: 'BA ITCM',
        subtitle: 0,
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: 'Hak Akses',
        subtitle: ''
    },

] 