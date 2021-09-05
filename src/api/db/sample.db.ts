import { Model } from "mongoose";

import DB from "./db";
import { Sample, SampleModel } from "../../config/db/models/sample.model"

export class sampleDB extends DB<Sample> {
    protected model: Model<Sample>;

    constructor() {
        super()
        this.model = SampleModel
    }

}