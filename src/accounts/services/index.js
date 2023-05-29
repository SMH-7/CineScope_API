import Account from '../entities/Account';

export default {
  registerAccount: async  (email, password, {accountsRepository, authenticator}) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, email, password);
    return accountsRepository.persist(account);
  },
  updateAccount: async (id, email, password, {accountsRepository})=>{
    const updatedAcc = new Account(id, email, password);
    return accountsRepository.merge(updatedAcc);
  },
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },
  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },
  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },
authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
  const account = await accountsRepository.getByEmail(email);
  const result = await authenticator.compare(password, account.password);
  if (!result) {
    throw new Error('Bad credentials');
  }
  const token = tokenManager.generate({ email: account.email });
  return token;
},
verifyToken:   async (token,{accountsRepository, tokenManager}) => {
  const decoded = await tokenManager.decode(token);
  const user = await accountsRepository.getByEmail(decoded.email);
  if (!user) {
      throw new Error('Bad token');
  }
  return user.id;
},
getFavourites: async (accountId, { accountsRepository }) => {
  const account = await accountsRepository.get(accountId);
  return account.favourites;
},
getWatchlist: async (accountId, { accountsRepository }) => {
  const account = await accountsRepository.get(accountId);
  return account.watchList;
},
addFavourite: async (accountId, movieId, { accountsRepository }) => {
  const account = await  accountsRepository.get(accountId);
  if (account.favourites.includes(movieId)) {
    throw new Error('Movie already added to favourites');
  }
  account.favourites.push(movieId);
  return await accountsRepository.merge(account);
},
addWatchlist: async (accountId, movieId, { accountsRepository }) => {
  const account = await  accountsRepository.get(accountId);
  if (account.watchList.includes(movieId)) {
    throw new Error('Movie already added to watchlist');
  }
  account.watchList.push(movieId);
  return await accountsRepository.merge(account);
},
deleteFavourite: async (accountId, movieId, { accountsRepository }) => {
  const account = await accountsRepository.get(accountId);
  const movieIndex = account.favourites.indexOf(movieId);
  if (movieIndex === -1) {
    throw new Error('Movie is not in favorites');
  }
  account.favourites.splice(movieIndex, 1);
  return await accountsRepository.merge(account);
},
deleteWatchlist: async (accountId, movieId, { accountsRepository }) => {
  const account = await accountsRepository.get(accountId);
  const movieIndex = account.watchList.indexOf(movieId);
  if (movieIndex === -1) {
    throw new Error('Movie is not in watchlist');
  }
  account.watchList.splice(movieIndex, 1);
  return await accountsRepository.merge(account);
},
};
