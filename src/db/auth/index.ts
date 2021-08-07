import type { Sequelize, Model } from "sequelize";
import { tokens } from "./tokens";
import type { tokensAttributes, tokensCreationAttributes } from "./tokens";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
    tokens,
    users,
};

export type {
    tokensAttributes,
    tokensCreationAttributes,
    usersAttributes,
    usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    tokens.initModel(sequelize);
    users.initModel(sequelize);

    tokens.belongsTo(users, { as: "user", foreignKey: "userId"});
    users.hasMany(tokens, { as: "tokens", foreignKey: "userId"});

    return {
        tokens: tokens,
        users: users,
    };
}
