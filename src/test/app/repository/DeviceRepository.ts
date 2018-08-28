import { sealed } from '../../../core/decorators/Sealed';
import { injectable } from 'inversify';
import InMemoryRepository from '../../../app/repository/base/InMemoryRepository';
import ITestModel from '../model/interfaces/ITestModel';
@sealed
@injectable()
export default class TestRepository extends InMemoryRepository<ITestModel> {
    constructor() {
        super();
    }
}