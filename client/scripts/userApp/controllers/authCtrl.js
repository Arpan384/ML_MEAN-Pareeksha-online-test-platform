userApp.controller("homeCtrl",["$scope", "$rootScope", "$window","userOps",
function($scope, $rootScope, $window, userOps){
    
    // console.log(Object.keys(userOps))

    $scope.login = ()=>{
        // console.log(user)
        var promise = userOps.login($scope.userL)
        promise.then((data)=>{
            console.log(data)
            localStorage.testApp=data.token;
            $window.location.href = "#/dashboard"; 
        }).catch((err)=>{
            console.log(err)
            $scope.userL.password=""
            $scope.error = err.message
        })
    }

    $scope.register = ()=>{
        if($scope.userR.confirmPassword != $scope.userR.password) return;
        var promise = userOps.register($scope.userR)
        promise.then((data)=>{
            console.log(data)
            $scope.userL.username=$scope.userR.username
            $scope.userL.password=$scope.userR.password
            $scope.login()
        }).catch((err)=>{
            $scope.userR.password=""
            $scope.userR.confirmPassword=""
            $scope.error = err.message
        })
    }
}])