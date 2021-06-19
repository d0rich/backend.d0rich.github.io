import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects_tags, projects_tagsId } from './projects_tags';
import type { tags, tagsId } from './tags';
import type { technologies, technologiesId } from './technologies';
import type { technologies_in_project, technologies_in_projectId } from './technologies_in_project';

export interface projectsAttributes {
  id?: number;
  stringId: string;
  title: string[];
  imgUrl: string[];
  description: string[];
  url?: string;
  githubUrl?: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type projectsPk = "id";
export type projectsId = projects[projectsPk];
export type projectsCreationAttributes = Optional<projectsAttributes, projectsPk>;

export class projects extends Model<projectsAttributes, projectsCreationAttributes> implements projectsAttributes {
  id?: number;
  stringId!: string;
  title!: string[];
  imgUrl!: string[];
  description!: string[];
  url?: string;
  githubUrl?: string;
  date!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // projects hasMany projects_tags via projectId
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
  // projects belongsToMany tags via projectId and tagId
  tagId_tags!: tags[];
  getTagId_tags!: Sequelize.BelongsToManyGetAssociationsMixin<tags>;
  setTagId_tags!: Sequelize.BelongsToManySetAssociationsMixin<tags, tagsId>;
  addTagId_tag!: Sequelize.BelongsToManyAddAssociationMixin<tags, tagsId>;
  addTagId_tags!: Sequelize.BelongsToManyAddAssociationsMixin<tags, tagsId>;
  createTagId_tag!: Sequelize.BelongsToManyCreateAssociationMixin<tags>;
  removeTagId_tag!: Sequelize.BelongsToManyRemoveAssociationMixin<tags, tagsId>;
  removeTagId_tags!: Sequelize.BelongsToManyRemoveAssociationsMixin<tags, tagsId>;
  hasTagId_tag!: Sequelize.BelongsToManyHasAssociationMixin<tags, tagsId>;
  hasTagId_tags!: Sequelize.BelongsToManyHasAssociationsMixin<tags, tagsId>;
  countTagId_tags!: Sequelize.BelongsToManyCountAssociationsMixin;
  // projects belongsToMany technologies via projectId and technologyId
  technologyId_technologies!: technologies[];
  getTechnologyId_technologies!: Sequelize.BelongsToManyGetAssociationsMixin<technologies>;
  setTechnologyId_technologies!: Sequelize.BelongsToManySetAssociationsMixin<technologies, technologiesId>;
  addTechnologyId_technology!: Sequelize.BelongsToManyAddAssociationMixin<technologies, technologiesId>;
  addTechnologyId_technologies!: Sequelize.BelongsToManyAddAssociationsMixin<technologies, technologiesId>;
  createTechnologyId_technology!: Sequelize.BelongsToManyCreateAssociationMixin<technologies>;
  removeTechnologyId_technology!: Sequelize.BelongsToManyRemoveAssociationMixin<technologies, technologiesId>;
  removeTechnologyId_technologies!: Sequelize.BelongsToManyRemoveAssociationsMixin<technologies, technologiesId>;
  hasTechnologyId_technology!: Sequelize.BelongsToManyHasAssociationMixin<technologies, technologiesId>;
  hasTechnologyId_technologies!: Sequelize.BelongsToManyHasAssociationsMixin<technologies, technologiesId>;
  countTechnologyId_technologies!: Sequelize.BelongsToManyCountAssociationsMixin;
  // projects hasMany technologies_in_project via projectId
  technologies_in_projects!: technologies_in_project[];
  getTechnologies_in_projects!: Sequelize.HasManyGetAssociationsMixin<technologies_in_project>;
  setTechnologies_in_projects!: Sequelize.HasManySetAssociationsMixin<technologies_in_project, technologies_in_projectId>;
  addTechnologies_in_project!: Sequelize.HasManyAddAssociationMixin<technologies_in_project, technologies_in_projectId>;
  addTechnologies_in_projects!: Sequelize.HasManyAddAssociationsMixin<technologies_in_project, technologies_in_projectId>;
  createTechnologies_in_project!: Sequelize.HasManyCreateAssociationMixin<technologies_in_project>;
  removeTechnologies_in_project!: Sequelize.HasManyRemoveAssociationMixin<technologies_in_project, technologies_in_projectId>;
  removeTechnologies_in_projects!: Sequelize.HasManyRemoveAssociationsMixin<technologies_in_project, technologies_in_projectId>;
  hasTechnologies_in_project!: Sequelize.HasManyHasAssociationMixin<technologies_in_project, technologies_in_projectId>;
  hasTechnologies_in_projects!: Sequelize.HasManyHasAssociationsMixin<technologies_in_project, technologies_in_projectId>;
  countTechnologies_in_projects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof projects {
    projects.init({
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
    title: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'projects',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "projects_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "projects_stringid_uindex",
        unique: true,
        fields: [
          { name: "stringId" },
        ]
      },
      {
        name: "projects_title_uindex",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
  return projects;
  }
}
