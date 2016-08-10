(function () {

    angular.module('app.core')
        .factory('utility', function () {

            return {
                dialNumber: function (number) {
                    console.log('Call Number: ' + number);
                    window.open('tel:' + number, '_system');
                },
                replaceNullToString: function (value) {
                    return value === null ? '' : value;
                },
                convertImgToBase64URL: function (url, callback) {
                    try {
                        var dataURL,
                            img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.onload = function() {
                            var canvas = document.createElement('CANVAS'),
                                ctx = canvas.getContext('2d');
                            canvas.height = this.height;
                            canvas.width = this.width;
                            ctx.drawImage(this, 0, 0);
                            dataURL = canvas.toDataURL();
                            callback(dataURL);
                            console.log('Base64 string : ' + dataURL);
                            canvas = null;
                            return dataURL;
                        };
                        img.src = url;
                    } catch(error) {
                        return error;
                    }
                },
                isValidDate : function (date) {
                    if (date === undefined || date === null || date === '') {
                        return false;
                    }
                    return moment(date).isValid();
                },
                getFormatedDate : function(value, formate) {
                    formate = (formate === undefined || formate === null || formate === '') ? 'MM-DD-YYYY' : formate;
                    return moment(new Date(value)).format(formate);
                }
            };
        });
})();