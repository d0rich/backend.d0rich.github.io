import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { technologies_in_project, technologies_in_projectId } from './technologies_in_project';

export interface technologiesAttributes {
  id?: number;
  name: string;
  url?: string;
}

export type technologiesPk = "id";
export type technologiesId = technologies[technologiesPk];
export type technologiesCreationAttributes = Optional<technologiesAttributes, technologiesPk>;

export class technologies extends Model<technologiesAttributes, technologiesCreationAttributes> implements technologiesAttributes {
  id?: number;
  name!: string;
  url?: string;

  // technologies belongsToMany projects via technologyId and projectId
  projectId_projects_technologies_in_projects!: projects[];
  getProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManyGetAssociationsMixin<projects>;
  setProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManySetAssociationsMixin<projects, projectsId>;
  addProjectId_projects_technologies_in_project!: Sequelize.BelongsToManyAddAssociationMixin<projects, projectsId>;
  addProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManyAddAssociationsMixin<projects, projectsId>;
  createProjectId_projects_technologies_in_project!: Sequelize.BelongsToManyCreateAssociationMixin<projects>;
  removeProjectId_projects_technologies_in_project!: Sequelize.BelongsToManyRemoveAssociationMixin<projects, projectsId>;
  removeProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManyRemoveAssociationsMixin<projects, projectsId>;
  hasProjectId_projects_technologies_in_project!: Sequelize.BelongsToManyHasAssociationMixin<projects, projectsId>;
  hasProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManyHasAssociationsMixin<projects, projectsId>;
  countProjectId_projects_technologies_in_projects!: Sequelize.BelongsToManyCountAssociationsMixin;
  // technologies hasMany technologies_in_project via technologyId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof technologies {
    technologies.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'technologies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "technologies_name_uindex",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "technologies_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "technologies_url_uindex",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  return technologies;
  }
}
