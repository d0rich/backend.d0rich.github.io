import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface newsAttributes {
  id?: number;
  stringId: string;
  image: string[];
  title: string[];
  content: string[];
  contentShort: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type newsPk = "id";
export type newsId = news[newsPk];
export type newsCreationAttributes = Optional<newsAttributes, newsPk>;

export class news extends Model<newsAttributes, newsCreationAttributes> implements newsAttributes {
  id?: number;
  stringId!: string;
  image!: string[];
  title!: string[];
  content!: string[];
  contentShort!: string[];
  createdAt?: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof news {
    news.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stringId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    title: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    content: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    contentShort: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'news',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "news_id_uindex",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "news_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "news_stringid_uindex",
        unique: true,
        fields: [
          { name: "stringId" },
        ]
      },
    ]
  });
  return news;
  }
}
