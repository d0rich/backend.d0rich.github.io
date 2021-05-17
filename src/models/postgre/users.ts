import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tokens, tokensId } from './tokens';

export interface usersAttributes {
  id?: number;
  login: string;
  password: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = Optional<usersAttributes, usersPk>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id?: number;
  login!: string;
  password!: string;

  // users hasMany tokens via userId
  tokens!: tokens[];
  getTokens!: Sequelize.HasManyGetAssociationsMixin<tokens>;
  setTokens!: Sequelize.HasManySetAssociationsMixin<tokens, tokensId>;
  addToken!: Sequelize.HasManyAddAssociationMixin<tokens, tokensId>;
  addTokens!: Sequelize.HasManyAddAssociationsMixin<tokens, tokensId>;
  createToken!: Sequelize.HasManyCreateAssociationMixin<tokens>;
  removeToken!: Sequelize.HasManyRemoveAssociationMixin<tokens, tokensId>;
  removeTokens!: Sequelize.HasManyRemoveAssociationsMixin<tokens, tokensId>;
  hasToken!: Sequelize.HasManyHasAssociationMixin<tokens, tokensId>;
  hasTokens!: Sequelize.HasManyHasAssociationsMixin<tokens, tokensId>;
  countTokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_login_uindex",
        unique: true,
        fields: [
          { name: "login" },
        ]
      },
      {
        name: "users_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return users;
  }
}
