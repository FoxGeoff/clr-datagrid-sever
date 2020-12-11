import {ClrDatagridStringFilterInterface} from "@clr/angular";
import {User} from "../inventory/user";

export class PokemonFilter implements ClrDatagridStringFilterInterface<User> {
    accepts(user: User, search: string): boolean {
        return "" + user.pokemon.number === search || user.pokemon.name.toLowerCase().indexOf(search) >= 0;
    }
}
