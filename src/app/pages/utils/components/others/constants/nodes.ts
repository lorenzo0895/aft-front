import { TreeNode } from "primeng/api";

export const nodes: TreeNode[] = [
  {
    key: '0',
    label: 'Holistor',
    icon: 'pi pi-fw pi-inbox',
    expanded: true,
    children: [
        {
            key: '0.0',
            label: 'Templates para Ventas',
            icon: 'pi pi-fw pi-cog',
            expanded: true,
            children: [
                { key: '0.0.0', label: 'Transformar Ventas Balducchi', icon: 'pi pi-fw pi-file' },
                { key: '0.0.1', label: 'Ventas General', icon: 'pi pi-fw pi-file' }
            ]
        },
        {
            key: '0.1',
            label: 'Templates para Compras',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0.1.0', label: 'Compras Generales (Próximamente)', icon: 'pi pi-fw pi-file' },
            ]
        },
    ]
  }
]