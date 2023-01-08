import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {

    constructor() { }

    GetObjectsToBeSkipped(pageNumber: number, pageSize: number) {
        return pageSize * (pageNumber - 1);
    }
}
