import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { technologies, technologiesId } from './technologies';

export interface technologies_in_projectAttributes {
  projectId: number;
  technologyId: number;
  version: string;
}

export type technologies_in_projectPk = "projectId" | "technologyId";
export type technologies_in_projectId = technologies_in_project[technologies_in_projectPk];
export type technologies_in_projectCreationAttributes = Optional<technologies_in_projectAttributes, technologies_in_projectPk>;

export class technologies_in_project extends Model<technologies_in_projectAttributes, technologies_in_projectCreationAttributes> implements technologies_in_projectAttributes {
  projectId!: number;
  technologyId!: number;
  version!: string;

  // technologies_in_project belongsTo projects via projectId
  project!: projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<projects, projectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<projects>;
  // technologies_in_project belongsTo technologies via technologyId
  technology!: technologies;
  getTechnology!: Sequelize.BelongsToGetAssociationMixin<technologies>;
  setTechnology!: Sequelize.BelongsToSetAssociationMixin<technologies, technologiesId>;
  createTechnology!: Sequelize.BelongsToCreateAssociationMixin<technologies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof technologies_in_project {
    technologies_in_project.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    technologyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'technologies',
        key: 'id'
      }
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'technologies_in_project',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "technologies_in_project_pk",
        unique: true,
        fields: [
          { name: "technologyId" },
          { name: "projectId" },
        ]
      },
    ]
  });
  return technologies_in_project;
  }
}
