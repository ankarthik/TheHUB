(function () {

    angular.module('app.core')
        .factory('caseTypeService', function ($filter) {
            var caseTypes = {
                SR: [],
                RR: []
            };

            return {
                saveCaseTypes: function (cases) {
                    caseTypes.SR = $filter('filter')(cases, {Group: 'NEED HELP'});
                    caseTypes.RR = $filter('filter')(cases, {Group: 'RETURN/RELOCATE'});
                    console.log("Case Type Relocate and return "+caseTypes.RR);
                },
                getCaseTypes:function () {
                    return caseTypes;
                },
                getSRCaseTypes: function () {
                    return caseTypes.SR;
                },
                getRRCaseTypes: function () {
                    var RRcaseTypes = [];
                    var temp = $filter('filter')(caseTypes.RR, {TypeId: 1004});
                    RRcaseTypes.push(temp[0]);
                    RRcaseTypes.push(temp[1]);
                    temp = $filter('filter')(caseTypes.RR, {TypeId: 1003, SubCaseTypeId: 1003});
                    RRcaseTypes.push(temp[0]);
                    console.log(RRcaseTypes);
                    return RRcaseTypes;
                },
                getSRCasesLength: function () {
                    return caseTypes.SR.length;
                },
                getRRCasesLength: function () {
                    return caseTypes.RR.length;
                },
                getSRSubCaseTypes: function (TypeId){
                    return $filter('filter')(caseTypes.SR, {TypeId: TypeId});
                },
                getRRSubCaseTypes: function (TypeId){
                    return $filter('filter')(caseTypes.RR, {TypeId: TypeId});
                }
            };
        });
})();