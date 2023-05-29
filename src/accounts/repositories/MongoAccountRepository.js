import Account from '../entities/Account';
import mongoose from 'mongoose';
import AccountRepository from './Repository';

export default class extends AccountRepository {

    constructor() {
        super();
        const accountsSchema = new mongoose.Schema({
            email: {type: String, unique: true, index: true},
            password: String,
            favourites: [Number],
            watchList : [Number]
        });
        this.model = mongoose.model('Account', accountsSchema);
    }

    async persist(accountEntity) {
        const {email, password} = accountEntity;
        const result = new this.model({ email, password});
        await result.save();
        accountEntity.id=result.id;
        return accountEntity;
    }

    async merge(accountEntity) {
        const {id, email, password, favourites, watchList } = accountEntity;
        await this.model.findByIdAndUpdate(id, { email, password, favourites, watchList });
        console.log({id, email, password, favourites, watchList });
        return accountEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const {id, email, password, favourites, watchList } = result;
        return new Account(id, email, password, favourites, watchList );
    }

    async getByEmail(userEmail) {
        const result = await this.model.findOne({email: userEmail.toLowerCase()});
        return new Account(result.id, result.email, result.password,result.favourites, result.watchList);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new Account(result.id, result.email, result.password, result.favourites, result.watchList);
        });
    }
}
