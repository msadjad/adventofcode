type FileTree = {
    value: number,
    name: string,
    isDirectory: boolean,
    parent: FileTree | null,
    subFiles: Map<string, FileTree>,
}


function findSmallestDeletableDirectory(root: FileTree, smallest: number = 70000000, threashold: number = 8381165): number {
    if (root.isDirectory){
        let size = findSizeOfDirectory(root); 
        if(size >= threashold && size < smallest){
            smallest = size;
        }
    }

    return Array.from(root.subFiles.values()).reduce((smallest: number, child: FileTree): number => {
        if(!child.isDirectory){
            return smallest;
        }

        let size = findSizeOfDirectory(child);

        if(size >= threashold && size < smallest){
            smallest = size;
        }

        return findSmallestDeletableDirectory(child, smallest);
    }, smallest);
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
   
console.log(findSmallestDeletableDirectory(parseInputs("input.txt")));
