(function () {

    angular.module('app.core')
        .factory('imageService', imageService);

    function imageService($rootScope,
                          utility,
                          $cordovaActionSheet,
                          $cordovaImagePicker,
                          $cordovaCamera) {

        var service  = {};

        var config = {
            maximumImagesCount: 1,
            width: 0,
            height: 800,
            quality: 100
        }

        service.attachImage = function (images) {
            var actionSheetOptions = {
                title: 'Upload Image',
                buttonLabels: ['Choose from gallery', 'Take new photo'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton : true
            };

            console.log('attachImage called.');
            $cordovaActionSheet.show(actionSheetOptions)
                .then(function(btnIndex) {
                    console.log('$cordovaActionSheet called.');
                    if (btnIndex == 1) {
                        console.log('Selected Index: ' + btnIndex);
                        console.log('Choose from gallery.');
                        service.getPhotoFromGallery(function (result) {
                            var image = {
                                id: images.length + 1,
                                src: result
                            }
                            images.pop();
                            images.push(image);
                            $rootScope.$apply();
                        });
                    }
                    if (btnIndex == 2) {
                        console.log('Selected Index: ' + btnIndex);
                        console.log('Take a new photo.');
                        service.getPhotoFromCamera(function (result) {
                            var image = {
                                id: images.length + 1,
                                src: result
                            }
                            images.pop();
                            images.push(image);
                            $rootScope.$apply();
                        });
                    }

                });
        }

        service.getPhotoFromGallery = function (callback) {
            var imagePickerOptions = {
                maximumImagesCount: config.maximumImagesCount,
                width: config.width,
                height: config.height,
                quality: config.quality
            };

            $cordovaImagePicker.getPictures(imagePickerOptions)
                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                        utility.convertImgToBase64URL(results[i], function (result) {
                            console.log('In getPhotoFromGallery base64 value: ' + result);
                            callback(result);
                        });
                    }
                }, function(error) {
                    console.error('Error getting photos' + error);
                });
        }

        service.getPhotoFromCamera = function (callback) {
            var cameraOptions = {
                quality: config.quality,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.PNG,
                targetWidth: config.width,
                targetHeight: config.height,
                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(cameraOptions)
                .then(function(result) {
                    console.log('Image Data: ' + result);
                    callback('data:image/png;base64, ' + result);
                }, function(error) {
                    console.error('Error occurred while get camera picture: ' + error);
                });

        }

        return service;
    }

})();