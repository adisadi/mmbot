import chalk from "chalk";
import * as gdax from "gdax";
import { Argv, CommandModule } from "yargs";

export class ProductsCommandModule implements CommandModule {

    public aliases = ["p"];
    public command = "products";
    public describe = "list all products";

    public builder = (yargs: Argv) => {
        return yargs;
    }
    public handler = (args: any) => {
        const client = new gdax.PublicClient();
        console.log(chalk.bold.green("Gdax Products:"));
        client.getProducts().then((products) => {
            products.map((p) => {
                console.log(`* ${p.id}`);
            });
        });
        return;
    }
}
