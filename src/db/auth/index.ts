import type { Sequelize, Model } from "sequelize";
import { imgPairs } from "./imgPairs";
import type { imgPairsAttributes, imgPairsCreationAttributes } from "./imgPairs";
import { tokens } from "./tokens";
import type { tokensAttributes, tokensCreationAttributes } from "./tokens";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
    imgPairs,
    tokens,
    users,
};

export type {
    imgPairsAttributes,
    imgPairsCreationAttributes,
    tokensAttributes,
    tokensCreationAttributes,
    usersAttributes,
    usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    imgPairs.initModel(sequelize);
    tokens.initModel(sequelize);
    users.initModel(sequelize);

    tokens.belongsTo(users, { as: "user", foreignKey: "userId"});
    users.hasMany(tokens, { as: "tokens", foreignKey: "userId"});

    return {
        imgPairs: imgPairs,
        tokens: tokens,
        users: users,
    };
}
