import { TreeNode } from "primeng/api";

export const nodes: TreeNode[] = [
  {
    key: '0',
    label: 'Holistor',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0.0',
            label: 'Templates para Ventas',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0.0.0', label: 'Ventas Balducchi', icon: 'pi pi-fw pi-file' },
                { key: '0.0.1', label: 'Ventas General', icon: 'pi pi-fw pi-file' }
            ]
        },
        {
            key: '0.1',
            label: 'Templates para Compras',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0.0.0', label: 'Compras Generales', icon: 'pi pi-fw pi-file' },
            ]
        },
    ]
  }
]