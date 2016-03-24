export class Score {
    constructor(
        public _id: number,
        public user: string,
        public points: number,
        public flagsCounter: number,
        public flagsFirstOwnerCounter: number,
        public lastFlagTimestamp: number
    ) {};
};