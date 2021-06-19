import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { tags, tagsId } from './tags';

export interface projects_tagsAttributes {
  projectId: number;
  tagId: number;
}

export type projects_tagsPk = "projectId" | "tagId";
export type projects_tagsId = projects_tags[projects_tagsPk];
export type projects_tagsCreationAttributes = Optional<projects_tagsAttributes, projects_tagsPk>;

export class projects_tags extends Model<projects_tagsAttributes, projects_tagsCreationAttributes> implements projects_tagsAttributes {
  projectId!: number;
  tagId!: number;

  // projects_tags belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // projects_tags belongsTo tags via tagId
  tag!: tags;
  getTag!: Sequelize.BelongsToGetAssociationMixin<tags>;
  setTag!: Sequelize.BelongsToSetAssociationMixin<tags, tagsId>;
  createTag!: Sequelize.BelongsToCreateAssociationMixin<tags>;

  static initModel(sequelize: Sequelize.Sequelize): typeof projects_tags {
    projects_tags.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'projects_tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "projects_tags_pk",
        unique: true,
        fields: [
          { name: "tagId" },
          { name: "projectId" },
        ]
      },
    ]
  });
  return projects_tags;
  }
}
