type FileTree = {
    value: number,
    name: string,
    isDirectory: boolean,
    parent: FileTree | null,
    subFiles: Map<string, FileTree>,
}

function findSumOfAllDirectories(root: FileTree, threashold: number = 100000): number {
    return Array.from(root.subFiles.values()).reduce((sum: number, child: FileTree): number => {
        if(!child.isDirectory){
            return sum;
        }

        let size = findSizeOfDirectory(child);

        if(size < threashold){
            sum += size;
        }

        sum += findSumOfAllDirectories(child);

        return sum;
    }, 0);
}

function findSizeOfDirectory(root: FileTree): number {
    if(!root.isDirectory) {
        return root.value;
    }

    return Array.from(root.subFiles.values()).reduce((sum: number, child: FileTree): number => {
        return sum + findSizeOfDirectory(child);
    }, root.value);
}

function parseInputs(file: string): FileTree {
    const root: FileTree = {
        value: 0,
        name: '/',
        isDirectory: true,
        parent: null,
        subFiles: new Map<string, FileTree>(),
    }

    let current = root;

    const fs = require("fs");

    const allFileContents = fs.readFileSync(file, "utf-8");

    const splittedLines = allFileContents.split(/\r?\n/);

    for(let i = 0 ; i<splittedLines.length ; ) {
        let line: string = splittedLines[i];
        if (line[0] == '$') {
            const command = line.substr(2,3).trim();
            const subCommand = line.substr(5).trim();
            
            switch(command) {
                case 'cd':
                    if(subCommand == '..' && current.parent) {
                        current = current.parent;
                    }
                    else if(subCommand == '/'){
                        current = root;
                    }
                    else {
                        current = current.subFiles.get(subCommand) ?? root;
                    }

                    i++;

                    break;

                case 'ls':

                    i++;

                    while (i < splittedLines.length && splittedLines[i][0] != '$') {
                        line = splittedLines[i];
                        let listSections = line.split(' ');

                        if(listSections[0] == 'dir') {
                            current.subFiles.set(listSections[1], {
                                value: 0,
                                name: listSections[1],
                                isDirectory: true,
                                parent: current,
                                subFiles: new Map<string, FileTree>(),
                            });
                        }
                        else {
                            current.subFiles.set(listSections[1], {
                                value: Number(listSections[0]),
                                name: listSections[1],
                                isDirectory: false,
                                parent: current,
                                subFiles: new Map<string, FileTree>(),
                            });
                        }
                        i++;
                    }
                    break;
            }
        }
    }

    return root;
}
   
console.log(findSumOfAllDirectories(parseInputs("input.txt")));
