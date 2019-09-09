testApp.controller("createCtrl",["$scope", "$rootScope", "$window", "testOps",
function($scope, $rootScope, $window, testOps){
    $scope.crudFlag = false;
    if($rootScope.loggedInS)$window.location.href = "#/dashboard"
    $scope.create = ()=>{
        testOps.create(localStorage.testApp, $scope.test, $scope.questions).then((data)=>{
            $window.location.href = "#/dashboard"
        }).catch((err)=>{
            console.log(err)
            $scope.error = err.message
            if(err.promptlogin)$window.location.href = "#/home"
        })
    }

    $scope.showCrud = ()=>{
        $scope.crudFlag = true;
        console.log($scope.test.duration)
    }

    $scope.questions = []
    $scope.ques = {"options":[]}
    $scope.addQues = ()=>{
        console.log($scope.ques)
        if($scope.ques.options.indexOf($scope.ques.correct)==-1){
            $scope.error = "Provided correct answers does not exist in options"
            return
        }
        $scope.questions.push($scope.ques)
        $scope.ques = {"options":[]}

    }

    $scope.addOption = ()=>{
        
        $scope.ques.options.push($scope.ques.opt)
        $scope.ques.opt = ""
        console.log($scope.ques.options)
    }

    $scope.removeOption = (option)=>{
        $scope.ques.options.pop($scope.ques.options.indexOf(option))
    }

    $scope.removeQues = (name)=>{
        $scope.questions.pop($scope.questions.indexOf(name))
    }

    $scope.clear = ()=>{
        $scope.ques = {}
    }

    $scope.clearAll = ()=>{
        $scope.questions = []
    }



}])