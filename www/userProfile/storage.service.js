(function () {

    angular.module('app.userProfile')
        .factory('userInfo', function () {
            var userInfo = {};

            return {
                saveUserInfo: function (info) {
                    userInfo = info;
                },
                getUserInfo: function () {
                    return userInfo;
                }
            };
        });
})();