import {  Model } from 'mongoose';

import Service from "./services";
import { SampleModel, Sample } from "../../config/db/models/sample.model";
import { sampleDB } from "../db/sample.db";

export class sampleService extends Service<Sample>{
    protected model: Model<Sample>;
    protected db: sampleDB;

    constructor() {
        super();
        this.model = SampleModel;
        this.db = new sampleDB();
    }
}