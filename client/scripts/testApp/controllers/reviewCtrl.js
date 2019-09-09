testApp.controller("reviewCtrl",["$scope", "$rootScope", "$routeParams","testOps",
function($scope, $rootScope, $routeParams, testOps){
    
    testOps.fetch(localStorage.testApp, $routeParams.testid).then((data)=>{
        $scope.test = data.test
        console.log(data)
        // for(ques of data.questions){
        //     for(ans of data.answers){
        //         if(ques._id==ans.questionid){
        //             ques["chosen"] = ans["chosen"]
        //             ques["marks"] = ans["score"]
        //         }
        //     }
        // }
        $scope.questions = data.questions
        // $scope.answers = data.answers
        $scope.mapper = {}
        $scope.questions.forEach(element => {
            $scope.mapper[element._id] = false;
        });

    }).catch((err)=>{
        console.log(err)
        $scope.error=err.message
        if(err.promptlogin)$window.location.href = "#/home"
    })

    $scope.toggler = (quesid)=>{
        $scope.mapper[quesid] = !$scope.mapper[quesid]
        // attach ng-show="mapper[q._id]"
    }
}])