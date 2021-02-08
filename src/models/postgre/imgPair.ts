import {Sequelize, DataTypes} from "sequelize";

export const createImgPair = (sequelize: Sequelize) => {
    return sequelize.define('imgPair', {
        originalPath: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        placeholderPath: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        indexes: [
            {
                name: 'imgOrigPathIndex',
                using: "BTREE",
                fields: ['originalPath']
            }
        ]
    })
}
