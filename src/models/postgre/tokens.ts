import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface tokensAttributes {
  userId: number;
  token?: string;
  expireAt: string;
}

export type tokensPk = "token";
export type tokensId = tokens[tokensPk];
export type tokensCreationAttributes = Optional<tokensAttributes, tokensPk>;

export class tokens extends Model<tokensAttributes, tokensCreationAttributes> implements tokensAttributes {
  userId!: number;
  token?: string;
  expireAt!: string;

  // tokens belongsTo users via userId
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tokens {
    tokens.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    expireAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tokens_pk",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
  return tokens;
  }
}
