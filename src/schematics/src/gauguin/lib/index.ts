import { strings } from "@angular-devkit/core";
import { Rule, Tree, template, apply, move, url, chain, branchAndMerge, mergeWith } from "@angular-devkit/schematics";
import { getProject } from "@schematics/angular/utility/project";
import { parseName } from "@schematics/angular/utility/parse-name";

export function gauguinLib(options: any): Rule {
    return (tree: Tree) => {
        // todo: validate and configure
        // todo: copy fils and generate templates
        // todo: chain rules
        if (!options.project) {
            throw { message: "no way" };
        }

        const path = getProject(tree, options.project);
        const parsedPath = parseName(`${path.sourceRoot}`, options.name);

        const templateSource = apply(url("./files/lib"), [
            template({
                ...strings,
                "if-flat": (s: string) => (options.flat ? "" : s),
                ...options
            }),
            move(parsedPath.path)
        ]);

        return chain([
            branchAndMerge(
                chain([
                    // addDeclarationToNgModule(options),
                    mergeWith(templateSource)
                ])
            )
        ]);
    };
}
