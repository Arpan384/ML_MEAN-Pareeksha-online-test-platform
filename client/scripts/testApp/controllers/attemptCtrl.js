testApp.controller("attemptCtrl",["$scope","$rootScope","$window","testOps","answerOps",
function($scope, $rootScope, $window, testOps, answerOps){

    if($rootScope.loggedInT)$window.location.href = "#/dashboard"
    // var testEnd = false;
    $scope.totalDuration
    var currentTime

    testOps.fetch(localStorage.testApp, $routeParams.testid).then((data)=>{
        $scope.test = data.test
        $scope.questions = data.questions
        $scope.answers = {}
        currentTime = data.test.duration;

        $scope.totalDuration.seconds = data.test.duration%60
        $scope.totalDuration.minutes = (data.test.duration/60)%60
        $scope.totalDuration.hours = (data.test.duration)/(60*60)
        if($scope.totalDuration.seconds/10 == 0) $scope.totalDuration.seconds = "0"+$scope.totalDuration.seconds
        if($scope.totalDuration.minutes/10 == 0) $scope.totalDuration.minutes = "0"+$scope.totalDuration.minutes
        if($scope.totalDuration.hours/10 == 0) $scope.totalDuration.hours = "0"+$scope.totalDuration.hours
        startTest()

    }).catch((err)=>{
        console.log(err)
        $scope.error=err.message
        if(err.promptlogin)$window.location.href = "#/home"
    })



    $scope.submit = ()=>{
        $scope.questions.forEach(element => {
            $scope.answers[element._id] = element["chosen"]
        });
        answerOps.submit(localStorage.testApp, $routeParams.testid, $scope.answers).then((data)=>{
            // review?
            // clearTimeout(testEnd)
            // clearTimeout(timer)
            $window.location.href = "#/dashboard"
        }).catch((err)=>{
            console.log(err)
            $scope.error = err.message
        })
    }

    function startTest(){
        // testEnd = setTimeout($scope.submit, $scope.test.duration)
        $scope.currentIndex = 0
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
        var timer = setInterval(()=>{
            if(currentTime>=0){
                $scope.seconds = currentTime%60
                $scope.hours = (currentTime-$scope.seconds)/(60*60)
                $scope.minutes = ((currentTime-$scope.seconds)/60)%60
                if($scope.seconds/10 == 0)$scope.seconds = "0"+$scope.seconds
                if($scope.minutes/10 == 0)$scope.minutes = "0"+$scope.minutes
                if($scope.hours/10 == 0)$scope.hours = "0"+$scope.hours
                currentTime--
            }
            else {
                $scope.submit()
                clearInterval(timer)
            }
        },1000)
    }

    $scope.next = ()=>{
        // $scope.mark()
        if($scope.currentIndex == $scope.questions.length-1) return
        $scope.currentIndex++;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
    }

    $scope.previous = ()=>{
        // $scope.mark()
        if($scope.currentIndex == 0) return
        $scope.currentIndex--;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
    }

    $scope.mark = ()=>{
        $scope.questions[$scope.currentIndex] = $scope.currentQuestion.chosen
    }

    $scope.skip = ()=>{
        // $scope.mark()
        $scope.questions[$scope.currentIndex] = undefined
        $scope.currentQuestion.chosen = undefined
        if($scope.currentIndex == $scope.questions.length-1) return
        $scope.currentIndex++;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
    }


}])