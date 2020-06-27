import axios from "axios";
import { Repository } from "../models/Repository";
import { getAPI } from "../utils";

export const getPinnedRepositories = async () => {
    return await axios.get<Repository>(`${getAPI()}/github-repos`);
};
