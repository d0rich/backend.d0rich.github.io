import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface imgPairsAttributes {
  originalPath: string;
  placeholderPath: string;
}

export type imgPairsPk = "originalPath";
export type imgPairsId = imgPairs[imgPairsPk];
export type imgPairsCreationAttributes = Optional<imgPairsAttributes, imgPairsPk>;

export class imgPairs extends Model<imgPairsAttributes, imgPairsCreationAttributes> implements imgPairsAttributes {
  originalPath!: string;
  placeholderPath!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof imgPairs {
    imgPairs.init({
    originalPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    placeholderPath: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'imgPairs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "imgOrigPathIndex",
        fields: [
          { name: "originalPath" },
        ]
      },
      {
        name: "imgPairs_pkey",
        unique: true,
        fields: [
          { name: "originalPath" },
        ]
      },
    ]
  });
  return imgPairs;
  }
}
