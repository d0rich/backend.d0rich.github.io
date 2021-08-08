import type { Sequelize, Model } from "sequelize";
import { news } from "./news";
import type { newsAttributes, newsCreationAttributes } from "./news";

export {
  news,
};

export type {
  newsAttributes,
  newsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  news.initModel(sequelize);


  return {
    news: news,
  };
}
