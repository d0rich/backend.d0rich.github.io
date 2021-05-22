import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { projects_tags, projects_tagsId } from './projects_tags';

export interface tagsAttributes {
  id?: number;
  text?: string;
}

export type tagsPk = "id";
export type tagsId = tags[tagsPk];
export type tagsCreationAttributes = Optional<tagsAttributes, tagsPk>;

export class tags extends Model<tagsAttributes, tagsCreationAttributes> implements tagsAttributes {
  id?: number;
  text?: string;

  // tags belongsToMany projects via tagId and projectId
  projectId_projects!: projects[];
  getProjectId_projects!: Sequelize.BelongsToManyGetAssociationsMixin<projects>;
  setProjectId_projects!: Sequelize.BelongsToManySetAssociationsMixin<projects, projectsId>;
  addProjectId_project!: Sequelize.BelongsToManyAddAssociationMixin<projects, projectsId>;
  addProjectId_projects!: Sequelize.BelongsToManyAddAssociationsMixin<projects, projectsId>;
  createProjectId_project!: Sequelize.BelongsToManyCreateAssociationMixin<projects>;
  removeProjectId_project!: Sequelize.BelongsToManyRemoveAssociationMixin<projects, projectsId>;
  removeProjectId_projects!: Sequelize.BelongsToManyRemoveAssociationsMixin<projects, projectsId>;
  hasProjectId_project!: Sequelize.BelongsToManyHasAssociationMixin<projects, projectsId>;
  hasProjectId_projects!: Sequelize.BelongsToManyHasAssociationsMixin<projects, projectsId>;
  countProjectId_projects!: Sequelize.BelongsToManyCountAssociationsMixin;
  // tags hasMany projects_tags via tagId
  projects_tags!: projects_tags[];
  getProjects_tags!: Sequelize.HasManyGetAssociationsMixin<projects_tags>;
  setProjects_tags!: Sequelize.HasManySetAssociationsMixin<projects_tags, projects_tagsId>;
  addProjects_tag!: Sequelize.HasManyAddAssociationMixin<projects_tags, projects_tagsId>;
  addProjects_tags!: Sequelize.HasManyAddAssociationsMixin<projects_tags, projects_tagsId>;
  createProjects_tag!: Sequelize.HasManyCreateAssociationMixin<projects_tags>;
  removeProjects_tag!: Sequelize.HasManyRemoveAssociationMixin<projects_tags, projects_tagsId>;
  removeProjects_tags!: Sequelize.HasManyRemoveAssociationsMixin<projects_tags, projects_tagsId>;
  hasProjects_tag!: Sequelize.HasManyHasAssociationMixin<projects_tags, projects_tagsId>;
  hasProjects_tags!: Sequelize.HasManyHasAssociationsMixin<projects_tags, projects_tagsId>;
  countProjects_tags!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tags {
    tags.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tags_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "tags_text_uindex",
        unique: true,
        fields: [
          { name: "text" },
        ]
      },
    ]
  });
  return tags;
  }
}
