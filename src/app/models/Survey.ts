import { User } from "./User";

export class Survey {
    id?: number | string;
    name?: string;
    owner?: User;
    published?: boolean;
}