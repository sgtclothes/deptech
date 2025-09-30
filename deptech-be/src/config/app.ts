export default {
    protectedRolesCode: ["ADMIN", "SYSADMIN", "USER"],
    isEnabled: {
    },
    documents: {
        reports: ["report-exam"],
    },
    domains: {
        development: {
        },
        test: {
        },
        production: {
        },
    },
    database: {
        tables: [],
    },
    images: {
        logos: {
        },
    },
    paths: {
        migrations: {
            root: "/cores",
            apps: [],
        },
        seeders: {
            root: "/cores",
            apps: [],
        },
    },
    response: {
        messages: {
            checkIfUserNotExists: {
                messageFailed: "Invalid username, email, or password",
            },
            checkIfUserExists: {
                messageFailed: "Email, username, or phone number already exists",
            },
            verifyToken: {
                messageFailed: "Action cannot be processed",
            },
            resetPassword: {
                messageFailed: "Action cannot be processed",
            },
            checkIfUserActive: {
                messageFailed: "Action cannot be processed",
            },
            checkIfUserHasSysAdminRole: {
                messageFailed: "Action cannot be processed",
            },
            checkIfRoleIsProtected: {
                messageFailed: "Action cannot be processed",
            },
            checkIfAuthIsEnabled: {
                messageFailed: "You cannot do this action yet, please contact the admin :)",
            },
            checkIfTokenIsValid: {
                messageFailed: "Action cannot be processed",
            },
        },
    },
};
