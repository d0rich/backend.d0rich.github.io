import {Sequelize} from "sequelize";
import {createImgPair} from "./imgPair";

export const createPostgreModels = (sequelize: Sequelize) => {
    return {
        imgPair: createImgPair(sequelize)
    }
}
