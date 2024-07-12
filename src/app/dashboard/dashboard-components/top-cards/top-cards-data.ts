export interface topcard {
    bgcolor: string;
    icon: string;
    title: string;
    href: string;
    subtitle: string | number;
}

export const topcards: topcard[] = [
    {
        bgcolor: 'success',
        icon: 'bi bi-file',
        title: 'Form DA',
        href: '/main/component/form-da',
        subtitle: 0,
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: 'Form ITCM',
        href: '/main/component/form-itcm',
        subtitle: 0,
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: 'BA ITCM',
        href: '/main/component/ba-itcm',
        subtitle: 0,
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: 'Hak Akses',
        href: '/main/component/hak-akses',
        subtitle: '',
    },
];
