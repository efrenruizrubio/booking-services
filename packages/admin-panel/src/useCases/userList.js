const { userList } = require('../../mocks/userList.mock');

const getUsers = (status, fullName) => {
  let fakeUserList = userList;
  // since this endpoint is just for listing regular users, we have to filter by profile
  // in this case, profile = 2 (means regular user, not admin)
  // if the user sent a status or a fullName, we have to make a filter
  fakeUserList = fakeUserList.filter((user) => user.profile === 1);
  if (status) {
    fakeUserList = fakeUserList.filter((user) => user.status === status);
  }
  if (fullName) {
    fakeUserList = fakeUserList.filter((user) => user.fullName.search(fullName) >= 0);
  }
  return fakeUserList;
};

module.exports = {
  getUsers,
};
