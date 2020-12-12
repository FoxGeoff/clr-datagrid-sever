import {ClrDatagridComparatorInterface} from "@clr/angular";
import {User} from "../inventory/user";

export class PokemonComparator implements ClrDatagridComparatorInterface<User> {
    compare(a: User, b: User) {
        return a.pokemon.number - b.pokemon.number;
    }
}
