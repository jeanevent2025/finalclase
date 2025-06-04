interface NavItem{
    label: string
    url: string
    title: string
    icon: string
}

export const navItems: NavItem[] = [
    {label: "Inversiones", url: "/inversiones", title: "Observe nuestras inversiones", icon: ""},
    {label: "Proveedores", url: "/proveedores", title: "Conozca nuestros proveedores", icon: ""},
    {label: "Empleados", url: "/empleados", title: "Nuestro equipo", icon: ""},
    {label: "Tienda", url: "/tienda", title: "Los mejores productos", icon: ""},
    {label: "Carrito", url: "/carrito", title: "Carrito de compras", icon: ""},
]

export const navItemsRight: NavItem[] = [
    {label: "Carrito", url: "/carrito", title: "Carrito de compras", icon: "bi-basket"},
    {label: "Iniciar sesión", url: "/login", title: "Inicio de sesión", icon: "bi-basket"},
]