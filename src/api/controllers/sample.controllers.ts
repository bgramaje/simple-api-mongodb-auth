import { Model } from 'mongoose';

import Service from "../services/services";
import Controller from './controller';

import { Sample, SampleModel } from "../../config/db/models/sample.model";
import { sampleService } from '../services/sample.services';

export class sampleController extends Controller<Sample>{
    protected model: Model<Sample>;
    protected service: Service<Sample>;

    constructor() {
        super();
        this.model = SampleModel;
        this.service = new sampleService();
    }
}