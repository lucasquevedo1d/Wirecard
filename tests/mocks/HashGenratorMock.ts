export class HashGeneratorMock{
    public hash = (s: string) => {
        return "hash"
    }

    public compareHash = (s: string, hash: string):boolean => {
        return s === hash
    }
}

