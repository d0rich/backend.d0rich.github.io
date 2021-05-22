import type { Sequelize, Model } from "sequelize";
import { projects } from "./projects";
import type { projectsAttributes, projectsCreationAttributes } from "./projects";
import { projects_tags } from "./projects_tags";
import type { projects_tagsAttributes, projects_tagsCreationAttributes } from "./projects_tags";
import { tags } from "./tags";
import type { tagsAttributes, tagsCreationAttributes } from "./tags";
import { technologies } from "./technologies";
import type { technologiesAttributes, technologiesCreationAttributes } from "./technologies";
import { technologies_in_project } from "./technologies_in_project";
import type { technologies_in_projectAttributes, technologies_in_projectCreationAttributes } from "./technologies_in_project";

export {
  projects,
  projects_tags,
  tags,
  technologies,
  technologies_in_project,
};

export type {
  projectsAttributes,
  projectsCreationAttributes,
  projects_tagsAttributes,
  projects_tagsCreationAttributes,
  tagsAttributes,
  tagsCreationAttributes,
  technologiesAttributes,
  technologiesCreationAttributes,
  technologies_in_projectAttributes,
  technologies_in_projectCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  projects.initModel(sequelize);
  projects_tags.initModel(sequelize);
  tags.initModel(sequelize);
  technologies.initModel(sequelize);
  technologies_in_project.initModel(sequelize);

  projects.belongsToMany(tags, { as: 'tagId_tags', through: projects_tags, foreignKey: "projectId", otherKey: "tagId" });
  projects.belongsToMany(technologies, { as: 'technologyId_technologies', through: technologies_in_project, foreignKey: "projectId", otherKey: "technologyId" });
  tags.belongsToMany(projects, { as: 'projectId_projects', through: projects_tags, foreignKey: "tagId", otherKey: "projectId" });
  technologies.belongsToMany(projects, { as: 'projectId_projects_technologies_in_projects', through: technologies_in_project, foreignKey: "technologyId", otherKey: "projectId" });
  projects_tags.belongsTo(projects, { as: "project", foreignKey: "projectId"});
  projects.hasMany(projects_tags, { as: "projects_tags", foreignKey: "projectId"});
  technologies_in_project.belongsTo(projects, { as: "project", foreignKey: "projectId"});
  projects.hasMany(technologies_in_project, { as: "technologies_in_projects", foreignKey: "projectId"});
  projects_tags.belongsTo(tags, { as: "tag", foreignKey: "tagId"});
  tags.hasMany(projects_tags, { as: "projects_tags", foreignKey: "tagId"});
  technologies_in_project.belongsTo(technologies, { as: "technology", foreignKey: "technologyId"});
  technologies.hasMany(technologies_in_project, { as: "technologies_in_projects", foreignKey: "technologyId"});

  return {
    projects: projects,
    projects_tags: projects_tags,
    tags: tags,
    technologies: technologies,
    technologies_in_project: technologies_in_project,
  };
}
