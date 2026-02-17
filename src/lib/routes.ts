const adminBase = '/admin';
const usersBase = `${adminBase}/users`;
const categoryBase = `${adminBase}/category`;

export const ROUTES = {
  root: "/",
  admin: {
    root: {
        path: adminBase,
        roles: ['admin']
    },
    dashboard: {
        path: `${adminBase}/dashboard`,
        roles: ['admin']
    },
    users: {
        root: {
            path: usersBase,
            roles: ["admin", "manager"],
            permissions: ["users.view"],
        },

        create: {
            path: `${usersBase}/create`,
            roles: ["admin"],
            permissions: ["users.create"],
        },

        edit: {
            path: (id: string | number) => `${usersBase}/${id}/edit`,
            roles: ["admin"],
            permissions: ["users.edit"],
        },
    },
    category: {
        root: {
            path: categoryBase,
            roles: ["admin", "manager"],
            permissions: ["users.view"],
        },

        create: {
            path: `${categoryBase}/create`,
            roles: ["admin"],
            permissions: ["users.create"],
        },

        edit: {
            path: (id: string | number) => `${categoryBase}/${id}/edit`,
            roles: ["admin"],
            permissions: ["users.edit"],
        },
    }
  }
} as const;