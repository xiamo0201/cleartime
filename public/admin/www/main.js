/**
 * Created by Laggo on 11/4/15.
 */
var app = angular.module('app', ['ui.router', 'ngStorage','ngAnimate','cAlert','ngFileUpload']);
app.run(['$rootScope', '$window', '$http', 'ajax', function ($rootScope, $window, $http, ajax) {
    $http.defaults.withCredentials = true;
}]);
/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    // 'SERVER_URL': 'http://localhost:3000'
    'SERVER_URL': 'https://gxx.leanapp.cn'
};
for(item in config){
    app.constant(item,config[item])
}
/**
 * Created by Laggo on 11/5/15.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    // Now set up the states
    $stateProvider
        //登录
        .state('login', {
            url: "/login",
            templateUrl: "www/html/login.html",
            controller: "loginController"
        })
        //布局
        .state('layout', {
            url: "/layout",
            templateUrl: "www/html/layout.html",
            controller: "layoutController"
        })
        //栏目
        .state('layout.category', {
            url: "/category",
            templateUrl: "www/html/category/list.html",
            controller: "listCategoryController"
        })
        .state('layout.addcategory', {
            url: "/addcategory",
            templateUrl: "www/html/category/add.html",
            controller: "addCategoryController"
        })
        //管理员管理
        .state('layout.user', {
            url: "/user",
            templateUrl: "www/html/user/list.html",
            controller: "userController"
        })
        .state('layout.adduser', {
            url: "/adduser/:username/:objectId",
            templateUrl: "www/html/user/add.html",
            controller: "addUserController"
        })
        //文章管理
        .state('layout.article',{
            url: "/article",
            templateUrl: "www/html/article/article.html",
            controller: "articleController"
        })
        .state('layout.addarticle',{
            url: "/addarticle",
            templateUrl: "www/html/article/add.html",
            controller: "addArticleController"
        })
        .state('layout.updatearticle',{
            url: "/updatearticle/:id",
            templateUrl: "www/html/article/add.html",
            controller: "updateArticleController"
        })
        //推荐位置管理
        .state('layout.recommend',{
            url: '/recommend',
            templateUrl: "www/html/recommend/recommend.html",
            controller: "recommendController"
        })
        .state('layout.addrecommend',{
            url: '/addrecommend',
            templateUrl: "www/html/recommend/add.html",
            controller: "addRecommendController"
        })
        //网站信息设置
        .state('layout.webinfo',{
            url: '/webinfo',
            templateUrl: "www/html/webinfo/webinfo.html",
            controller: "webInfoController"
        })
        //个人信息设置
        .state('layout.information',{
            url: '/information',
            templateUrl: "www/html/webinfo/information.html",
            controller: "informationController"
        })
        //友情链接
        .state('layout.friend',{
            url: '/friend',
            templateUrl: "www/html/friend/friend.html",
            controller: "friendController"
        })
        .state('layout.addfriend',{
            url: '/addfriend',
            templateUrl: "www/html/friend/add.html",
            controller: "addFriendController"
        })
        //评论管理
        .state('layout.comments',{
            url: '/comments',
            templateUrl: "www/html/comments/comments.html",
            controller: "commentsController"
        })
        .state('layout.addComments',{
            url: '/addComments/:id',
            templateUrl: "www/html/comments/add.html",
            controller: "addCommentsController"
        })
}]);

app.controller('layoutController', ['$scope','$window',function ($scope,$window) {
    $scope.goBack = function(){
        $window.history.back();
    }
}]);
app.controller('loginController', ['$scope', '$state', 'ajax', 'toast', '$http', function ($scope, $state, ajax, toast, $http) {

    $scope.submit = function () {
        ajax.post({
            url: '/login',
            data: {
                username: $scope.name,
                password: $scope.password
            },
            toast: "登录中..."
        }).then(
            function (result) {
                toast.dismiss('登录成功!');
                console.log(result);
                $state.go('layout')
            }
        )
    }

}]);
/**
 * Created by Laggo on 11/5/15.
 */
app.directive("categorylist", ['categoryService',function (categoryService) {
    return {
        restrict: 'E',
        templateUrl: 'www/html/directive/categoryList.html',
        replace: true,
        transclude: true,
        link: function (scope, ele, attr) {
            categoryService.list().then(function(result){
                scope.list = result
            })
        },
    }
}]);

/**
 * Created by Laggo on 11/5/15.
 */
app.directive("recommendlist", ['recommendService',function (recommendService) {
    return {
        restrict: 'E',
        templateUrl: 'www/html/directive/recommendList.html',
        replace: true,
        transclude: true,
        scope: {
        },
        link: function (scope, ele, attr) {
            recommendService.list().then(function(result){
                scope.list = result
            })

        },
    }
}]);

/**
 * Created by gxx on 16/7/25.
 */
app.filter('article_count', function () {
    return function categoryType(data) {
        if(data){
            return data.length
        }
        return 0
    }
});
app.filter('categoryType', ['categoryService', '$http', function (categoryService, $http) {
    return function categoryType(cod) {
        return
    }
}]);

(function () {
    'use strict';
    var app = angular.module('cAlert', []);
    app.run(['$rootScope', 'cAlert', 'toast', function ($rootScope, cAlert, toast) {
        $rootScope.toast = {};
        cAlert.dismiss();
        toast.dismiss('demo');
        angular.element(document.body).append("<calert></calert><toast></toast><cconfirm></cconfirm>");
    }]);
    app.directive('calert', ['$rootScope', 'cAlert', function ($rootScope, cAlert) {
        return {
            restrict: 'E',
            replace: true,
            template: "<div class='cAlert cAlert-{{cAlert.has}}'><div class='cAlert-box'><div class='cAlert-innerbox'><div class='cAlert-content'><p class='cAlert-title'>提示</p><p class='cAlert-font'>{{cAlert.text}}</p><div class='cAlert-btn-box'><p class='cAlert-btn cAlert-btn-faild' ng-click='dismiss()' ng-if='cAlert.comfirm'>关闭</p><p class='cAlert-btn cAlert-btn-true' ng-click='do()'>确认</p></div></div></div></div></div>",
            link: function (scope, ele, attrs) {
                scope.dismiss = function () {
                    cAlert.dismiss();
                };
                scope.do = function () {
                    if ($rootScope.cAlert.back) $rootScope.cAlert.back();
                    cAlert.dismiss();
                }
            }
        }
    }]);
    app.directive('toast', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            template: "<div class='toast' ng-if='toast.has'>{{toast.msg}}</div>",
            link: function (scope, ele, attrs) {
            }
        }
    }]);
    app.service('cAlert', ['$rootScope', 'toast', function ($rootScope, toast) {
        this.create = function (obj) {
            if(obj.comfirm){
                $rootScope.cAlert.comfirm = true;
            }else{
                $rootScope.cAlert.comfirm = false;
            }
            toast.dismiss();
            $rootScope.cAlert.has = true;
            $rootScope.cAlert.text = obj.msg;
            $rootScope.cAlert.back = obj.back;

        };
        this.dismiss = function () {
            $rootScope.cAlert = {};
            $rootScope.cAlert.text = '';
            $rootScope.cAlert.back = '';
            $rootScope.cAlert.has = false;
        }
    }]);
    app.service('toast', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        this.create = function (msg) {
            $rootScope.toast.msg = msg;
            $rootScope.toast.has = true;
        };
        this.dismiss = function (msg) {
            $rootScope;
            if (msg) {
                $rootScope.toast.msg = msg;
                $timeout(function () {
                    $rootScope.toast.has = false;
                }, 500)
            } else {
                $timeout(function () {
                    $rootScope.toast.has = false;
                }, 1)
            }
        }
    }])

})();
(function () {
    'use strict';
    var app = angular.module('canverImage', []);
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.canverImage = {
            url: '',
            show: false
        };
        $rootScope.canverImageShow = function(url){
            $rootScope.canverImage.url = url;
            $rootScope.canverImage.show = true;
        }
        $rootScope.canverImageClose = function(){
            $rootScope.canverImage.url = '';
            $rootScope.canverImage.show = false;
        }
        angular.element(document.body).append("<canverimage></canverimage>");
    }]);
    app.directive('canverimage', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            template: "<div class='canverImage canverImage-{{canverImage.show}}' ng-click='canverImageClose()'><div><img ng-src='{{canverImage.url}}' alt=''></div></div>",
            link: function (scope, ele, attrs) {
            }
        }
    }]);

})();
app.service('ajax', ['$q', '$http', '$rootScope', 'SERVER_URL', '$state', 'cAlert', 'toast', 'Upload', function ($q, $http, $rootScope, SERVER_URL, $state, cAlert, toast, Upload) {
    this.post = function (postData) {
        var req = {
            method: 'POST',
            url: SERVER_URL + postData.url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: postData.data
        };
        return this.ajax(req, postData);
    };
    this.get = function (postData) {
        var req = {
            method: 'GET',
            url: SERVER_URL + postData.url,
            params: postData.data
        };
        return this.ajax(req, postData);
    };
    this.ajax = function (req, postData) {
        //console.log(req);
        //if(postData.toast&&$rootScope.toast.has){
        //    alert('不要重复操作!');
        //    return false
        //}
        if (postData.toast) {
            toast.create(postData.toast);
        }
        var defer = $q.defer();
        var promise = defer.promise;
        $http(req).then(
            function success(response) {
                if (response.data.code == (200 || 101)) {
                    defer.resolve(response.data.data);
                } else {
                    cAlert.create({
                        msg: response.data.msg
                    });
                    //$state.go('login')
                }
            },
            function failed(response) {
                cAlert.create({
                    msg: '服务端错误！'
                })
            }
        );
        return promise
    };
    this.upload = function (file) {
        var deferred = $q.defer();
        Upload.upload({
            url: SERVER_URL + '/upload',
            file: file,
            toast: "上传中..."
        }).then(function (res) {
            deferred.resolve(res.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            //console.log(evt);
            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // deferred.resolve(progressPercentage);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
        return deferred.promise;
    };
}
])
;

app.service('articleService', ['ajax', '$q', function (ajax, $q) {
    this.list = function () {
        var defer = $q.defer();
        var promise = defer.promise;
        ajax.get({
            url: '/article'
        }).then(function (result) {
            defer.resolve(result);
        });
        return promise
    }
}]);


app.service('categoryService', ['ajax', '$q', function (ajax, $q) {
    this.list = function () {
        var defer = $q.defer();
        var promise = defer.promise;
        ajax.get({
            url: '/category'
        }).then(function (result) {
            defer.resolve(result);
        });
        return promise
    }
    this.list = function () {
        var defer = $q.defer();
        var promise = defer.promise;
        ajax.get({
            url: '/category'
        }).then(function (result) {
            defer.resolve(result);
        });
        return promise
    }
}]);


/**
 * Created by Laggo on 16/2/4.
 */
app.service('recommendService', ['ajax', '$q', function (ajax, $q) {
    this.list = function () {
        var defer = $q.defer();
        var promise = defer.promise;
        ajax.get({
            url: '/recommend'
        }).then(function (result) {
            defer.resolve(result);
        });
        return promise
    }
}]);


app.service('toolService', function () {

});

app.controller('addArticleController', ['$scope', 'ajax', 'toast', '$state', 'SERVER_URL', '$http', function ($scope, ajax, toast, $state, SERVER_URL, $http) {
    $scope.article = {};

    $scope.uploadImg = function (file) {
        ajax.upload(file).then(function (result) {
            $scope.article.fileId = result.fileId;
            $scope.imgPath = result.fileUrl;
        })
    }

    $scope.submit = function () {
        if(!$scope.article.fileId){
            alert('请上传图片!');
            return false
        }
        ajax.post({
            url: '/article',
            data: $scope.article,
            toast: "添加中..."
        }).then(
            function (result) {
                toast.dismiss('添加成功!');
                //$scope.link(result[0].objectId);
                $state.go('layout.article')
            }
        )
    };


    //百度链接提交
    $scope.link = function(a){
        var req = {
            method: 'POST',
            url: 'http://data.zz.baidu.com/urls?site=www.guixiaoxiao.cn&token=v142gv4JbzFKnfgx',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: { 'http': '//guixiaoxiao.cn/post/'+a}
        }
        $http(req).then(function(){
            toast.dismiss('百度链接提交成功!');
        }, function(){
            toast.dismiss('百度链接提交失败!');
        });
    }

}]);
app.controller('articleController', ['$scope', 'ajax', 'toast', 'articleService', function ($scope, ajax, toast, articleService) {

    articleService.list().then(function (result) {
        $scope.list = result;
    });

    $scope.del = function (id, index,fileId) {
        ajax.post({
            url: '/article/del',
            data: {
                objectId: id
            },
            toast: "删除中..."
        }).then(
            function (result) {
                //同时删除图片
                ajax.post({
                    url: '/upload/del',
                    data: {
                        objectId:fileId
                    },
                    toast: "删除中..."
                }).then(
                    function (result) {
                        toast.dismiss('OK!');
                        $scope.list.splice(index, 1)
                    }
                )
            }
        )
    }
}]);
app.controller('updateArticleController', ['$scope', 'ajax', 'toast', '$state', 'SERVER_URL', '$stateParams', function ($scope, ajax, toast, $state, SERVER_URL, $stateParams) {
    ajax.get({
        url: '/article/query',
        data: {
            objectId: $stateParams.id
        },
        toast: "获取数据..."
    }).then(function (result) {
        toast.dismiss('获取成功!');
        $scope.article = result;
        $scope.article.category = $scope.article.category.toString();
        $scope.article.content = decodeURIComponent($scope.article.content);
        var fileId = result.fileId;
        if(fileId){
            ajax.get({
                url: '/upload/query',
                data: {
                    objectId: fileId
                },
                toast: "获取数据..."
            }).then(function (result) {
                toast.dismiss('获取成功!');
                $scope.imgPath = result[0].url;
            });
        }
    });

    $scope.article = {};

    $scope.uploadImg = function (file) {
        ajax.upload(file).then(function (result) {
            $scope.article.fileId = result.fileId;
            $scope.imgPath = result.fileUrl;
        })
    }

    $scope.submit = function () {
        if(!$scope.article.fileId){
            alert('请上传图片!');
            return false
        }
        ajax.post({
            url: '/article/update',
            data: $scope.article,
            toast: "添加中..."
        }).then(
            function (result) {
                toast.dismiss('添加成功!');
                $state.go('layout.article')
            }
        )
    };
}]);
app.controller('addCategoryController', ['$scope', 'ajax', 'toast', '$state', function ($scope, ajax, toast, $state) {
    $scope.submit = function () {
        ajax.post({
            url: '/category',
            data: {
                name: $scope.name,
            },
            toast: "添加中..."
        }).then(
            function (result) {
                toast.dismiss('添加成功!');
                $state.go('layout.category')
            }
        )
    }
}]);
app.controller('listCategoryController', ['$scope', 'ajax', 'toast','categoryService', function ($scope, ajax, toast,categoryService) {
    categoryService.list().then(function(result){
        $scope.list = result;
    })

    $scope.del = function (id, index) {
        ajax.post({
            url: '/category/del',
            data: {
                objectId: id
            },
            toast: "删除中..."
        }).then(
            function (result) {
                toast.dismiss('OK!');
                $scope.list.splice(index, 1)
            }
        )
    }
}]);
app.controller('addCommentsController', ['$scope', 'ajax', 'toast', '$state', '$stateParams', function ($scope, ajax, toast, $state, $stateParams) {

    if ($stateParams.id) {
        ajax.get({
            url: '/comments/query',
            data: {
                objectId:$stateParams.id,
            },
            toast: "查询中..."
        }).then(
            function (result) {
                toast.dismiss('查询成功!');
                $scope.comments = result;
            }
        )
    }

    $scope.submit = function () {
        var url = $stateParams.id?'/comments/updata':'/comments';
        ajax.post({
            url: url,
            data: $scope.comments,
            toast: "添加中..."
        }).then(
            function (result) {
                toast.dismiss('添加成功!');
                $state.go('layout.comments')
            }
        )

    }
}]);
app.controller('commentsController', ['$scope', 'ajax', 'toast', function ($scope, ajax, toast) {
    //查询管理员
    ajax.get({
        url: '/comments',
        toast: "获取中..."
    }).then(
        function (result) {
            $scope.list = result;
        }
    );
    //删除管理员
    $scope.del = function(id,index){
        ajax.post({
            url: '/comments/del',
            data: {
                objectId: id
            },
            toast: "删除中..."
        }).then(
            function (result) {
                toast.dismiss('OK!');
                $scope.list.splice(index, 1);
            }
        )
    };

}]);
app.controller('addFriendController', ['$scope', 'ajax', 'toast', '$state', function ($scope, ajax, toast, $state) {
    $scope.submit = function () {
        ajax.post({
            url: '/linkfriend',
            data: $scope.data,
            toast: "添加中..."
        }).then(function (result) {
            toast.dismiss('添加成功!');
            $state.go('layout.friend');
        })
    }
}]);
/**
 * Created by gxx on 16/3/29.
 */
app.controller('friendController', ['$scope', 'ajax', 'toast', '$state', 'cAlert', function ($scope, ajax, toast, $state, cAlert) {
    ajax.get({
        url: '/linkfriend',
        toast: "do..."
    }).then(function (result) {
        $scope.resultData = result;
        toast.dismiss('end..!');
        $state.go('layout.friend');
    })


    $scope.del = function (id, index) {
        cAlert.create({
            mes: '是否确认删除!',
            comfirm: true,
            back: function () {
                ajax.post({
                    url: '/linkfriend/del',
                    data: {
                        objectId: id
                    },
                    toast: "删除中..."
                }).then(
                    function (result) {
                        toast.dismiss('OK!');
                        $scope.resultData.splice(index, 1)
                    }
                )
            }
        })
    }

}]);

/**
 * Created by gxx on 2016/1/28.
 */
app.controller('managerController', ['$scope', function ($scope) {

}]);

app.controller('addRecommendController', ['$scope', 'ajax', 'toast', '$state', function ($scope, ajax, toast, $state) {
    $scope.submit = function () {
        ajax.post({
            url: '/recommend',
            data: {
                name: $scope.name,
                nickname: $scope.nickname,
            },
            toast: "添加中..."
        }).then(function (result) {
            toast.dismiss('添加成功!');
            $state.go('layout.recommend');
        })
    }
}]);
app.controller('recommendController', ['$scope', 'ajax', 'toast', 'recommendService', function ($scope, ajax, toast, recommendService) {
    recommendService.list().then(function(result){
        $scope.list = result;
    })

    $scope.del = function (id, index) {
        ajax.post({
            url: '/recommend/del',
            data: {
                _id: id
            },
            toast: "删除中..."
        }).then(function (result) {
                toast.dismiss('OK!');
                $scope.list.splice(index, 1)
            }
        )
    }

}]);
app.controller('addUserController', ['$scope', 'ajax', 'toast', '$state', '$stateParams', function ($scope, ajax, toast, $state, $stateParams) {

    $scope.data = {
        username: $stateParams.username,
        objectId: $stateParams.objectId
    };

    $scope.isDisabled = function () {
        if ($stateParams.objectId) {
            return true
        }
        return false
    };

    $scope.submit = function () {

        var url = $stateParams.objectId ? '/user/updata' : '/user/';
        var data = $stateParams.objectId ? {
            objectId: $stateParams.objectId,
            password: $scope.password
        } : {
            username: $scope.data.username,
            password: $scope.password
        };
        var _toast = $stateParams.objectId ? '修改中...' : '添加中...';
        var _dismiss = $stateParams.objectId ? '修改成功!' : '添加成功!';

        ajax.post({
            url: url,
            data: data,
            toast: _toast
        }).then(function (result) {
            toast.dismiss(_dismiss);
            $state.go('layout.user')
        })
    }
}]);
app.controller('userController', ['$scope', 'ajax', 'toast', function ($scope, ajax, toast) {
    //查询管理员
    ajax.get({
        url: '/user',
        toast: "获取中..."
    }).then(
        function (result) {
            $scope.list = result;
        }
    );
    //删除管理员
    $scope.del = function(id,index){
        ajax.post({
            url: '/user/del',
            data: {
                objectId: id
            },
            toast: "删除中..."
        }).then(
            function (result) {
                toast.dismiss('OK!');
                $scope.list.splice(index, 1);
            }
        )
    };

}]);
app.controller('informationController', ['$scope', 'ajax', 'cAlert', 'toast', function ($scope, ajax, cAlert, toast) {
    $scope.isUpdata = false;
    //查询个人信息
    ajax.get({
        url: '/information',
        toast: "获取中..."
    }).then(function (result) {
        if (result.length < 1) {
            $scope.isUpdata = true;
        }
        $scope.info = result[0];
        toast.dismiss('获取成功');
    });


    //设置个人信息
    $scope.submit = function () {
        var url = '';
        var data = '';
        if ($scope.isUpdata) {
            url = '/information';
        } else {
            url = '/information/updata';
        }
        console.log(url);
        ajax.post({
            url: url,
            data: $scope.info,
            toast: "设置中..."
        }).then(function (result) {
            toast.dismiss('设置成功');
        })
    }
}]);
app.controller('webInfoController', ['$scope', 'ajax', 'cAlert','toast', function ($scope, ajax, cAlert,toast) {
    $scope.isUpdata = false;
    //查询个人信息
    ajax.get({
        url: '/webinfo',
        toast: "获取中..."
    }).then(function (result) {
        if (!result.length) {
            $scope.isUpdata = true;
        }
        $scope.info = result[0];
        toast.dismiss('获取成功');
    });


    //设置个人信息
    $scope.submit = function () {
        var url = '';
        var data = '';
        if ($scope.isUpdata) {
            url = '/webinfo';
        } else {
            url = '/webinfo/updata';
        }
        ajax.post({
            url: url,
            data: $scope.info,
            toast: "设置中..."
        }).then(function (result) {
            toast.dismiss('设置成功');
        })
    }
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsInJvdXRlci5qcyIsImNvbnRyb2xsZXIvbGF5b3V0Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvbG9naW5Db250cm9sbGVyLmpzIiwiZGlyZWN0aXZlL2NhdGVnb3J5TGlzdC5qcyIsImRpcmVjdGl2ZS9yZWNvbW1lbmRMaXN0LmpzIiwiZmlsdGVyL2FydGljbGVfY291bnQuanMiLCJmaWx0ZXIvY2F0ZWdvcnlGaWx0ZXIuanMiLCJtb2R1bGVzL2NBbGVydC5qcyIsIm1vZHVsZXMvY2FudmVySW1hZ2UuanMiLCJzZXJ2aWNlL2FqYXhTZXJ2aWNlLmpzIiwic2VydmljZS9hcnRpY2xlLmpzIiwic2VydmljZS9jYXRlZ29yeS5qcyIsInNlcnZpY2UvcmVjb21tZW5kLmpzIiwic2VydmljZS9Ub29sU2VydmljZS5qcyIsImNvbnRyb2xsZXIvYXJ0Y2lsZS9hZGRBcnRpY2xlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvYXJ0Y2lsZS9hcnRpY2xlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvYXJ0Y2lsZS91cGRhdGVBcnRpY2xlQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvY2F0ZWdvcnkvYWRkQ2F0ZWdvcnlDb250cm9sbGVyLmpzIiwiY29udHJvbGxlci9jYXRlZ29yeS9saXN0Q2F0ZWdvcnlDb250cm9sbGVyLmpzIiwiY29udHJvbGxlci9jb21tZW50cy9hZGRDb21tZW50c0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVyL2NvbW1lbnRzL2NvbW1lbnRzQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvZnJpZW5kL2FkZC5qcyIsImNvbnRyb2xsZXIvZnJpZW5kL2ZyaWVuZC5qcyIsImNvbnRyb2xsZXIvbWFuYWdlci9tYW5hZ2VyQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvcmVjb21tZW5kL2FkZFJlY29tbWVuZENvbnRyb2xsZXIuanMiLCJjb250cm9sbGVyL3JlY29tbWVuZC9yZWNvbW1lbmRDb250cm9sbGVyLmpzIiwiY29udHJvbGxlci91c2VyL2FkZFVzZXJDb250cm9sbGVyLmpzIiwiY29udHJvbGxlci91c2VyL3VzZXJDb250cm9sbGVyLmpzIiwiY29udHJvbGxlci93ZWJpbmZvL2luZm9ybWF0aW9uQ29udHJvbGxlci5qcyIsImNvbnRyb2xsZXIvd2ViaW5mby93ZWJpbmZvQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IExhZ2dvIG9uIDExLzQvMTUuXHJcbiAqL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsJ25nQW5pbWF0ZScsJ2NBbGVydCcsJ25nRmlsZVVwbG9hZCddKTtcclxuYXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJHdpbmRvdycsICckaHR0cCcsICdhamF4JywgZnVuY3Rpb24gKCRyb290U2NvcGUsICR3aW5kb3csICRodHRwLCBhamF4KSB7XHJcbiAgICAkaHR0cC5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG59XSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgTGFnZ28gb24gMTEvNC8xNS5cclxuICovXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICAvLyAnU0VSVkVSX1VSTCc6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXHJcbiAgICAnU0VSVkVSX1VSTCc6ICdodHRwczovL2d4eC5sZWFuYXBwLmNuJ1xyXG59O1xyXG5mb3IoaXRlbSBpbiBjb25maWcpe1xyXG4gICAgYXBwLmNvbnN0YW50KGl0ZW0sY29uZmlnW2l0ZW1dKVxyXG59IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgTGFnZ28gb24gMTEvNS8xNS5cclxuICovXHJcbmFwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9sb2dpblwiKTtcclxuICAgIC8vIE5vdyBzZXQgdXAgdGhlIHN0YXRlc1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAvL+eZu+W9lVxyXG4gICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG9naW5cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvbG9naW4uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImxvZ2luQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+W4g+WxgFxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2xheW91dFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ3d3cvaHRtbC9sYXlvdXQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImxheW91dENvbnRyb2xsZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/moI/nm65cclxuICAgICAgICAuc3RhdGUoJ2xheW91dC5jYXRlZ29yeScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jYXRlZ29yeVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ3d3cvaHRtbC9jYXRlZ29yeS9saXN0Lmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJsaXN0Q2F0ZWdvcnlDb250cm9sbGVyXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0LmFkZGNhdGVnb3J5Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2FkZGNhdGVnb3J5XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL2NhdGVnb3J5L2FkZC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiYWRkQ2F0ZWdvcnlDb250cm9sbGVyXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v566h55CG5ZGY566h55CGXHJcbiAgICAgICAgLnN0YXRlKCdsYXlvdXQudXNlcicsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c2VyXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL3VzZXIvbGlzdC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwidXNlckNvbnRyb2xsZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsYXlvdXQuYWRkdXNlcicsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hZGR1c2VyLzp1c2VybmFtZS86b2JqZWN0SWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvdXNlci9hZGQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImFkZFVzZXJDb250cm9sbGVyXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v5paH56ug566h55CGXHJcbiAgICAgICAgLnN0YXRlKCdsYXlvdXQuYXJ0aWNsZScse1xyXG4gICAgICAgICAgICB1cmw6IFwiL2FydGljbGVcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvYXJ0aWNsZS9hcnRpY2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJhcnRpY2xlQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xheW91dC5hZGRhcnRpY2xlJyx7XHJcbiAgICAgICAgICAgIHVybDogXCIvYWRkYXJ0aWNsZVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ3d3cvaHRtbC9hcnRpY2xlL2FkZC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiYWRkQXJ0aWNsZUNvbnRyb2xsZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsYXlvdXQudXBkYXRlYXJ0aWNsZScse1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VwZGF0ZWFydGljbGUvOmlkXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL2FydGljbGUvYWRkLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJ1cGRhdGVBcnRpY2xlQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+aOqOiNkOS9jee9rueuoeeQhlxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0LnJlY29tbWVuZCcse1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVjb21tZW5kJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvcmVjb21tZW5kL3JlY29tbWVuZC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwicmVjb21tZW5kQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xheW91dC5hZGRyZWNvbW1lbmQnLHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZHJlY29tbWVuZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL3JlY29tbWVuZC9hZGQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImFkZFJlY29tbWVuZENvbnRyb2xsZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/nvZHnq5nkv6Hmga/orr7nva5cclxuICAgICAgICAuc3RhdGUoJ2xheW91dC53ZWJpbmZvJyx7XHJcbiAgICAgICAgICAgIHVybDogJy93ZWJpbmZvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvd2ViaW5mby93ZWJpbmZvLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJ3ZWJJbmZvQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+S4quS6uuS/oeaBr+iuvue9rlxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0LmluZm9ybWF0aW9uJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9pbmZvcm1hdGlvbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL3dlYmluZm8vaW5mb3JtYXRpb24uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImluZm9ybWF0aW9uQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+WPi+aDhemTvuaOpVxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0LmZyaWVuZCcse1xyXG4gICAgICAgICAgICB1cmw6ICcvZnJpZW5kJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwid3d3L2h0bWwvZnJpZW5kL2ZyaWVuZC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiZnJpZW5kQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xheW91dC5hZGRmcmllbmQnLHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZGZyaWVuZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInd3dy9odG1sL2ZyaWVuZC9hZGQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImFkZEZyaWVuZENvbnRyb2xsZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/or4TorrrnrqHnkIZcclxuICAgICAgICAuc3RhdGUoJ2xheW91dC5jb21tZW50cycse1xyXG4gICAgICAgICAgICB1cmw6ICcvY29tbWVudHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ3d3cvaHRtbC9jb21tZW50cy9jb21tZW50cy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiY29tbWVudHNDb250cm9sbGVyXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGF5b3V0LmFkZENvbW1lbnRzJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9hZGRDb21tZW50cy86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ3d3cvaHRtbC9jb21tZW50cy9hZGQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcImFkZENvbW1lbnRzQ29udHJvbGxlclwiXHJcbiAgICAgICAgfSlcclxufV0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignbGF5b3V0Q29udHJvbGxlcicsIFsnJHNjb3BlJywnJHdpbmRvdycsZnVuY3Rpb24gKCRzY29wZSwkd2luZG93KSB7XHJcbiAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAkd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsICdhamF4JywgJ3RvYXN0JywgJyRodHRwJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCBhamF4LCB0b2FzdCwgJGh0dHApIHtcclxuXHJcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAkc2NvcGUubmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9hc3Q6IFwi55m75b2V5LitLi4uXCJcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCfnmbvlvZXmiJDlip8hJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsYXlvdXQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufV0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IExhZ2dvIG9uIDExLzUvMTUuXHJcbiAqL1xyXG5hcHAuZGlyZWN0aXZlKFwiY2F0ZWdvcnlsaXN0XCIsIFsnY2F0ZWdvcnlTZXJ2aWNlJyxmdW5jdGlvbiAoY2F0ZWdvcnlTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd3d3cvaHRtbC9kaXJlY3RpdmUvY2F0ZWdvcnlMaXN0Lmh0bWwnLFxyXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZSwgYXR0cikge1xyXG4gICAgICAgICAgICBjYXRlZ29yeVNlcnZpY2UubGlzdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmxpc3QgPSByZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59XSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IExhZ2dvIG9uIDExLzUvMTUuXHJcbiAqL1xyXG5hcHAuZGlyZWN0aXZlKFwicmVjb21tZW5kbGlzdFwiLCBbJ3JlY29tbWVuZFNlcnZpY2UnLGZ1bmN0aW9uIChyZWNvbW1lbmRTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd3d3cvaHRtbC9kaXJlY3RpdmUvcmVjb21tZW5kTGlzdC5odG1sJyxcclxuICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlLCBhdHRyKSB7XHJcbiAgICAgICAgICAgIHJlY29tbWVuZFNlcnZpY2UubGlzdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmxpc3QgPSByZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufV0pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBneHggb24gMTYvNy8yNS5cclxuICovXHJcbmFwcC5maWx0ZXIoJ2FydGljbGVfY291bnQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gY2F0ZWdvcnlUeXBlKGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICB9XHJcbn0pOyIsImFwcC5maWx0ZXIoJ2NhdGVnb3J5VHlwZScsIFsnY2F0ZWdvcnlTZXJ2aWNlJywgJyRodHRwJywgZnVuY3Rpb24gKGNhdGVnb3J5U2VydmljZSwgJGh0dHApIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiBjYXRlZ29yeVR5cGUoY29kKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbn1dKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnY0FsZXJ0JywgW10pO1xyXG4gICAgYXBwLnJ1bihbJyRyb290U2NvcGUnLCAnY0FsZXJ0JywgJ3RvYXN0JywgZnVuY3Rpb24gKCRyb290U2NvcGUsIGNBbGVydCwgdG9hc3QpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLnRvYXN0ID0ge307XHJcbiAgICAgICAgY0FsZXJ0LmRpc21pc3MoKTtcclxuICAgICAgICB0b2FzdC5kaXNtaXNzKCdkZW1vJyk7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLmFwcGVuZChcIjxjYWxlcnQ+PC9jYWxlcnQ+PHRvYXN0PjwvdG9hc3Q+PGNjb25maXJtPjwvY2NvbmZpcm0+XCIpO1xyXG4gICAgfV0pO1xyXG4gICAgYXBwLmRpcmVjdGl2ZSgnY2FsZXJ0JywgWyckcm9vdFNjb3BlJywgJ2NBbGVydCcsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBjQWxlcnQpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdjQWxlcnQgY0FsZXJ0LXt7Y0FsZXJ0Lmhhc319Jz48ZGl2IGNsYXNzPSdjQWxlcnQtYm94Jz48ZGl2IGNsYXNzPSdjQWxlcnQtaW5uZXJib3gnPjxkaXYgY2xhc3M9J2NBbGVydC1jb250ZW50Jz48cCBjbGFzcz0nY0FsZXJ0LXRpdGxlJz7mj5DnpLo8L3A+PHAgY2xhc3M9J2NBbGVydC1mb250Jz57e2NBbGVydC50ZXh0fX08L3A+PGRpdiBjbGFzcz0nY0FsZXJ0LWJ0bi1ib3gnPjxwIGNsYXNzPSdjQWxlcnQtYnRuIGNBbGVydC1idG4tZmFpbGQnIG5nLWNsaWNrPSdkaXNtaXNzKCknIG5nLWlmPSdjQWxlcnQuY29tZmlybSc+5YWz6ZetPC9wPjxwIGNsYXNzPSdjQWxlcnQtYnRuIGNBbGVydC1idG4tdHJ1ZScgbmctY2xpY2s9J2RvKCknPuehruiupDwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIixcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGUsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5kaXNtaXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNBbGVydC5kaXNtaXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuY0FsZXJ0LmJhY2spICRyb290U2NvcGUuY0FsZXJ0LmJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICBjQWxlcnQuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG4gICAgYXBwLmRpcmVjdGl2ZSgndG9hc3QnLCBbJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J3RvYXN0JyBuZy1pZj0ndG9hc3QuaGFzJz57e3RvYXN0Lm1zZ319PC9kaXY+XCIsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlLCBhdHRycykge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG4gICAgYXBwLnNlcnZpY2UoJ2NBbGVydCcsIFsnJHJvb3RTY29wZScsICd0b2FzdCcsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCB0b2FzdCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouY29tZmlybSl7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmNBbGVydC5jb21maXJtID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmNBbGVydC5jb21maXJtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNBbGVydC5oYXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNBbGVydC50ZXh0ID0gb2JqLm1zZztcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jQWxlcnQuYmFjayA9IG9iai5iYWNrO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZGlzbWlzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jQWxlcnQgPSB7fTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jQWxlcnQudGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNBbGVydC5iYWNrID0gJyc7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY0FsZXJ0LmhhcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1dKTtcclxuICAgIGFwcC5zZXJ2aWNlKCd0b2FzdCcsIFsnJHJvb3RTY29wZScsICckdGltZW91dCcsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkdGltZW91dCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnRvYXN0Lm1zZyA9IG1zZztcclxuICAgICAgICAgICAgJHJvb3RTY29wZS50b2FzdC5oYXMgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kaXNtaXNzID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlO1xyXG4gICAgICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnRvYXN0Lm1zZyA9IG1zZztcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnRvYXN0LmhhcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUudG9hc3QuaGFzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NhbnZlckltYWdlJywgW10pO1xyXG4gICAgYXBwLnJ1bihbJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoJHJvb3RTY29wZSkge1xyXG4gICAgICAgICRyb290U2NvcGUuY2FudmVySW1hZ2UgPSB7XHJcbiAgICAgICAgICAgIHVybDogJycsXHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAkcm9vdFNjb3BlLmNhbnZlckltYWdlU2hvdyA9IGZ1bmN0aW9uKHVybCl7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY2FudmVySW1hZ2UudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNhbnZlckltYWdlLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkcm9vdFNjb3BlLmNhbnZlckltYWdlQ2xvc2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNhbnZlckltYWdlLnVybCA9ICcnO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmNhbnZlckltYWdlLnNob3cgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLmFwcGVuZChcIjxjYW52ZXJpbWFnZT48L2NhbnZlcmltYWdlPlwiKTtcclxuICAgIH1dKTtcclxuICAgIGFwcC5kaXJlY3RpdmUoJ2NhbnZlcmltYWdlJywgWyckcm9vdFNjb3BlJywgZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdjYW52ZXJJbWFnZSBjYW52ZXJJbWFnZS17e2NhbnZlckltYWdlLnNob3d9fScgbmctY2xpY2s9J2NhbnZlckltYWdlQ2xvc2UoKSc+PGRpdj48aW1nIG5nLXNyYz0ne3tjYW52ZXJJbWFnZS51cmx9fScgYWx0PScnPjwvZGl2PjwvZGl2PlwiLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZSwgYXR0cnMpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1dKTtcclxuXHJcbn0pKCk7IiwiYXBwLnNlcnZpY2UoJ2FqYXgnLCBbJyRxJywgJyRodHRwJywgJyRyb290U2NvcGUnLCAnU0VSVkVSX1VSTCcsICckc3RhdGUnLCAnY0FsZXJ0JywgJ3RvYXN0JywgJ1VwbG9hZCcsIGZ1bmN0aW9uICgkcSwgJGh0dHAsICRyb290U2NvcGUsIFNFUlZFUl9VUkwsICRzdGF0ZSwgY0FsZXJ0LCB0b2FzdCwgVXBsb2FkKSB7XHJcbiAgICB0aGlzLnBvc3QgPSBmdW5jdGlvbiAocG9zdERhdGEpIHtcclxuICAgICAgICB2YXIgcmVxID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBTRVJWRVJfVVJMICsgcG9zdERhdGEudXJsLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBwb3N0RGF0YS5kYXRhXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHJlcSwgcG9zdERhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24gKHBvc3REYXRhKSB7XHJcbiAgICAgICAgdmFyIHJlcSA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgdXJsOiBTRVJWRVJfVVJMICsgcG9zdERhdGEudXJsLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBvc3REYXRhLmRhdGFcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgocmVxLCBwb3N0RGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5hamF4ID0gZnVuY3Rpb24gKHJlcSwgcG9zdERhdGEpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcSk7XHJcbiAgICAgICAgLy9pZihwb3N0RGF0YS50b2FzdCYmJHJvb3RTY29wZS50b2FzdC5oYXMpe1xyXG4gICAgICAgIC8vICAgIGFsZXJ0KCfkuI3opoHph43lpI3mk43kvZwhJyk7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgaWYgKHBvc3REYXRhLnRvYXN0KSB7XHJcbiAgICAgICAgICAgIHRvYXN0LmNyZWF0ZShwb3N0RGF0YS50b2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgICRodHRwKHJlcSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSA9PSAoMjAwIHx8IDEwMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNBbGVydC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2c6IHJlc3BvbnNlLmRhdGEubXNnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kc3RhdGUuZ28oJ2xvZ2luJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gZmFpbGVkKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjQWxlcnQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBtc2c6ICfmnI3liqHnq6/plJnor6/vvIEnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfTtcclxuICAgIHRoaXMudXBsb2FkID0gZnVuY3Rpb24gKGZpbGUpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIFVwbG9hZC51cGxvYWQoe1xyXG4gICAgICAgICAgICB1cmw6IFNFUlZFUl9VUkwgKyAnL3VwbG9hZCcsXHJcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXHJcbiAgICAgICAgICAgIHRvYXN0OiBcIuS4iuS8oOS4rS4uLlwiXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzLmRhdGEpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vycm9yIHN0YXR1czogJyArIHJlc3Auc3RhdHVzKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXZ0KTtcclxuICAgICAgICAgICAgLy8gdmFyIHByb2dyZXNzUGVyY2VudGFnZSA9IHBhcnNlSW50KDEwMC4wICogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCk7XHJcbiAgICAgICAgICAgIC8vIGRlZmVycmVkLnJlc29sdmUocHJvZ3Jlc3NQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJvZ3Jlc3M6ICcgKyBwcm9ncmVzc1BlcmNlbnRhZ2UgKyAnJSAnICsgZXZ0LmNvbmZpZy5kYXRhLmZpbGUubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9O1xyXG59XHJcbl0pXHJcbjtcclxuIiwiYXBwLnNlcnZpY2UoJ2FydGljbGVTZXJ2aWNlJywgWydhamF4JywgJyRxJywgZnVuY3Rpb24gKGFqYXgsICRxKSB7XHJcbiAgICB0aGlzLmxpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgYWpheC5nZXQoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXJ0aWNsZSdcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcbn1dKTtcclxuXHJcbiIsImFwcC5zZXJ2aWNlKCdjYXRlZ29yeVNlcnZpY2UnLCBbJ2FqYXgnLCAnJHEnLCBmdW5jdGlvbiAoYWpheCwgJHEpIHtcclxuICAgIHRoaXMubGlzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gZGVmZXIucHJvbWlzZTtcclxuICAgICAgICBhamF4LmdldCh7XHJcbiAgICAgICAgICAgIHVybDogJy9jYXRlZ29yeSdcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcbiAgICB0aGlzLmxpc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgYWpheC5nZXQoe1xyXG4gICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcnknXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG59XSk7XHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBMYWdnbyBvbiAxNi8yLzQuXHJcbiAqL1xyXG5hcHAuc2VydmljZSgncmVjb21tZW5kU2VydmljZScsIFsnYWpheCcsICckcScsIGZ1bmN0aW9uIChhamF4LCAkcSkge1xyXG4gICAgdGhpcy5saXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgIGFqYXguZ2V0KHtcclxuICAgICAgICAgICAgdXJsOiAnL3JlY29tbWVuZCdcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcbn1dKTtcclxuXHJcbiIsImFwcC5zZXJ2aWNlKCd0b29sU2VydmljZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbn0pO1xyXG4iLCJhcHAuY29udHJvbGxlcignYWRkQXJ0aWNsZUNvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgJyRzdGF0ZScsICdTRVJWRVJfVVJMJywgJyRodHRwJywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsICRzdGF0ZSwgU0VSVkVSX1VSTCwgJGh0dHApIHtcclxuICAgICRzY29wZS5hcnRpY2xlID0ge307XHJcblxyXG4gICAgJHNjb3BlLnVwbG9hZEltZyA9IGZ1bmN0aW9uIChmaWxlKSB7XHJcbiAgICAgICAgYWpheC51cGxvYWQoZmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5hcnRpY2xlLmZpbGVJZCA9IHJlc3VsdC5maWxlSWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5pbWdQYXRoID0gcmVzdWx0LmZpbGVVcmw7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCEkc2NvcGUuYXJ0aWNsZS5maWxlSWQpe1xyXG4gICAgICAgICAgICBhbGVydCgn6K+35LiK5Lyg5Zu+54mHIScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiAnL2FydGljbGUnLFxyXG4gICAgICAgICAgICBkYXRhOiAkc2NvcGUuYXJ0aWNsZSxcclxuICAgICAgICAgICAgdG9hc3Q6IFwi5re75Yqg5LitLi4uXCJcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCfmt7vliqDmiJDlip8hJyk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5saW5rKHJlc3VsdFswXS5vYmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xheW91dC5hcnRpY2xlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8v55m+5bqm6ZO+5o6l5o+Q5LqkXHJcbiAgICAkc2NvcGUubGluayA9IGZ1bmN0aW9uKGEpe1xyXG4gICAgICAgIHZhciByZXEgPSB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vZGF0YS56ei5iYWlkdS5jb20vdXJscz9zaXRlPXd3dy5ndWl4aWFveGlhby5jbiZ0b2tlbj12MTQyZ3Y0SmJ6RktuZmd4JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7ICdodHRwJzogJy8vZ3VpeGlhb3hpYW8uY24vcG9zdC8nK2F9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRodHRwKHJlcSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCfnmb7luqbpk77mjqXmj5DkuqTmiJDlip8hJyk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygn55m+5bqm6ZO+5o6l5o+Q5Lqk5aSx6LSlIScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufV0pOyIsImFwcC5jb250cm9sbGVyKCdhcnRpY2xlQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2FqYXgnLCAndG9hc3QnLCAnYXJ0aWNsZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHNjb3BlLCBhamF4LCB0b2FzdCwgYXJ0aWNsZVNlcnZpY2UpIHtcclxuXHJcbiAgICBhcnRpY2xlU2VydmljZS5saXN0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgJHNjb3BlLmxpc3QgPSByZXN1bHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuZGVsID0gZnVuY3Rpb24gKGlkLCBpbmRleCxmaWxlSWQpIHtcclxuICAgICAgICBhamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXJ0aWNsZS9kZWwnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RJZDogaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9hc3Q6IFwi5Yig6Zmk5LitLi4uXCJcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+WQjOaXtuWIoOmZpOWbvueJh1xyXG4gICAgICAgICAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvdXBsb2FkL2RlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RJZDpmaWxlSWRcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0OiBcIuWIoOmZpOS4rS4uLlwiXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygnT0shJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1dKTsiLCJhcHAuY29udHJvbGxlcigndXBkYXRlQXJ0aWNsZUNvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgJyRzdGF0ZScsICdTRVJWRVJfVVJMJywgJyRzdGF0ZVBhcmFtcycsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIHRvYXN0LCAkc3RhdGUsIFNFUlZFUl9VUkwsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgYWpheC5nZXQoe1xyXG4gICAgICAgIHVybDogJy9hcnRpY2xlL3F1ZXJ5JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG9iamVjdElkOiAkc3RhdGVQYXJhbXMuaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvYXN0OiBcIuiOt+WPluaVsOaNri4uLlwiXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICB0b2FzdC5kaXNtaXNzKCfojrflj5bmiJDlip8hJyk7XHJcbiAgICAgICAgJHNjb3BlLmFydGljbGUgPSByZXN1bHQ7XHJcbiAgICAgICAgJHNjb3BlLmFydGljbGUuY2F0ZWdvcnkgPSAkc2NvcGUuYXJ0aWNsZS5jYXRlZ29yeS50b1N0cmluZygpO1xyXG4gICAgICAgICRzY29wZS5hcnRpY2xlLmNvbnRlbnQgPSBkZWNvZGVVUklDb21wb25lbnQoJHNjb3BlLmFydGljbGUuY29udGVudCk7XHJcbiAgICAgICAgdmFyIGZpbGVJZCA9IHJlc3VsdC5maWxlSWQ7XHJcbiAgICAgICAgaWYoZmlsZUlkKXtcclxuICAgICAgICAgICAgYWpheC5nZXQoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3VwbG9hZC9xdWVyeScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SWQ6IGZpbGVJZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvYXN0OiBcIuiOt+WPluaVsOaNri4uLlwiXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygn6I635Y+W5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmltZ1BhdGggPSByZXN1bHRbMF0udXJsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuYXJ0aWNsZSA9IHt9O1xyXG5cclxuICAgICRzY29wZS51cGxvYWRJbWcgPSBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgIGFqYXgudXBsb2FkKGZpbGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYXJ0aWNsZS5maWxlSWQgPSByZXN1bHQuZmlsZUlkO1xyXG4gICAgICAgICAgICAkc2NvcGUuaW1nUGF0aCA9IHJlc3VsdC5maWxlVXJsO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZighJHNjb3BlLmFydGljbGUuZmlsZUlkKXtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivt+S4iuS8oOWbvueJhyEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcnRpY2xlL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS5hcnRpY2xlLFxyXG4gICAgICAgICAgICB0b2FzdDogXCLmt7vliqDkuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LmRpc21pc3MoJ+a3u+WKoOaIkOWKnyEnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbGF5b3V0LmFydGljbGUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfTtcclxufV0pOyIsImFwcC5jb250cm9sbGVyKCdhZGRDYXRlZ29yeUNvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgJyRzdGF0ZScsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIHRvYXN0LCAkc3RhdGUpIHtcclxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3J5JyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLm5hbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvYXN0OiBcIua3u+WKoOS4rS4uLlwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygn5re75Yqg5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsYXlvdXQuY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ2xpc3RDYXRlZ29yeUNvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywnY2F0ZWdvcnlTZXJ2aWNlJywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsY2F0ZWdvcnlTZXJ2aWNlKSB7XHJcbiAgICBjYXRlZ29yeVNlcnZpY2UubGlzdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAkc2NvcGUubGlzdCA9IHJlc3VsdDtcclxuICAgIH0pXHJcblxyXG4gICAgJHNjb3BlLmRlbCA9IGZ1bmN0aW9uIChpZCwgaW5kZXgpIHtcclxuICAgICAgICBhamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcnkvZGVsJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0SWQ6IGlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvYXN0OiBcIuWIoOmZpOS4rS4uLlwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygnT0shJyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1dKTsiLCJhcHAuY29udHJvbGxlcignYWRkQ29tbWVudHNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnYWpheCcsICd0b2FzdCcsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsICRzdGF0ZSwgJHN0YXRlUGFyYW1zKSB7XHJcblxyXG4gICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgIGFqYXguZ2V0KHtcclxuICAgICAgICAgICAgdXJsOiAnL2NvbW1lbnRzL3F1ZXJ5JyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0SWQ6JHN0YXRlUGFyYW1zLmlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b2FzdDogXCLmn6Xor6LkuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LmRpc21pc3MoJ+afpeivouaIkOWKnyEnKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jb21tZW50cyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSAkc3RhdGVQYXJhbXMuaWQ/Jy9jb21tZW50cy91cGRhdGEnOicvY29tbWVudHMnO1xyXG4gICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkYXRhOiAkc2NvcGUuY29tbWVudHMsXHJcbiAgICAgICAgICAgIHRvYXN0OiBcIua3u+WKoOS4rS4uLlwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygn5re75Yqg5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsYXlvdXQuY29tbWVudHMnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufV0pOyIsImFwcC5jb250cm9sbGVyKCdjb21tZW50c0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QpIHtcclxuICAgIC8v5p+l6K+i566h55CG5ZGYXHJcbiAgICBhamF4LmdldCh7XHJcbiAgICAgICAgdXJsOiAnL2NvbW1lbnRzJyxcclxuICAgICAgICB0b2FzdDogXCLojrflj5bkuK0uLi5cIlxyXG4gICAgfSkudGhlbihcclxuICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5saXN0ID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgICAvL+WIoOmZpOeuoeeQhuWRmFxyXG4gICAgJHNjb3BlLmRlbCA9IGZ1bmN0aW9uKGlkLGluZGV4KXtcclxuICAgICAgICBhamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvY29tbWVudHMvZGVsJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0SWQ6IGlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvYXN0OiBcIuWIoOmZpOS4rS4uLlwiXHJcbiAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygnT0shJyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfTtcclxuXHJcbn1dKTsiLCJhcHAuY29udHJvbGxlcignYWRkRnJpZW5kQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2FqYXgnLCAndG9hc3QnLCAnJHN0YXRlJywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsICRzdGF0ZSkge1xyXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvbGlua2ZyaWVuZCcsXHJcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS5kYXRhLFxyXG4gICAgICAgICAgICB0b2FzdDogXCLmt7vliqDkuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCfmt7vliqDmiJDlip8hJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnbGF5b3V0LmZyaWVuZCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1dKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBneHggb24gMTYvMy8yOS5cclxuICovXHJcbmFwcC5jb250cm9sbGVyKCdmcmllbmRDb250cm9sbGVyJywgWyckc2NvcGUnLCAnYWpheCcsICd0b2FzdCcsICckc3RhdGUnLCAnY0FsZXJ0JywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsICRzdGF0ZSwgY0FsZXJ0KSB7XHJcbiAgICBhamF4LmdldCh7XHJcbiAgICAgICAgdXJsOiAnL2xpbmtmcmllbmQnLFxyXG4gICAgICAgIHRvYXN0OiBcImRvLi4uXCJcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICRzY29wZS5yZXN1bHREYXRhID0gcmVzdWx0O1xyXG4gICAgICAgIHRvYXN0LmRpc21pc3MoJ2VuZC4uIScpO1xyXG4gICAgICAgICRzdGF0ZS5nbygnbGF5b3V0LmZyaWVuZCcpO1xyXG4gICAgfSlcclxuXHJcblxyXG4gICAgJHNjb3BlLmRlbCA9IGZ1bmN0aW9uIChpZCwgaW5kZXgpIHtcclxuICAgICAgICBjQWxlcnQuY3JlYXRlKHtcclxuICAgICAgICAgICAgbWVzOiAn5piv5ZCm56Gu6K6k5Yig6ZmkIScsXHJcbiAgICAgICAgICAgIGNvbWZpcm06IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2xpbmtmcmllbmQvZGVsJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdElkOiBpZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3Q6IFwi5Yig6Zmk5LitLi4uXCJcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCdPSyEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdERhdGEuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGd4eCBvbiAyMDE2LzEvMjguXHJcbiAqL1xyXG5hcHAuY29udHJvbGxlcignbWFuYWdlckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuXHJcbn1dKTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ2FkZFJlY29tbWVuZENvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgJyRzdGF0ZScsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIHRvYXN0LCAkc3RhdGUpIHtcclxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiAnL3JlY29tbWVuZCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgbmlja25hbWU6ICRzY29wZS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9hc3Q6IFwi5re75Yqg5LitLi4uXCJcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygn5re75Yqg5oiQ5YqfIScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2xheW91dC5yZWNvbW1lbmQnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ3JlY29tbWVuZENvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ3RvYXN0JywgJ3JlY29tbWVuZFNlcnZpY2UnLCBmdW5jdGlvbiAoJHNjb3BlLCBhamF4LCB0b2FzdCwgcmVjb21tZW5kU2VydmljZSkge1xyXG4gICAgcmVjb21tZW5kU2VydmljZS5saXN0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICRzY29wZS5saXN0ID0gcmVzdWx0O1xyXG4gICAgfSlcclxuXHJcbiAgICAkc2NvcGUuZGVsID0gZnVuY3Rpb24gKGlkLCBpbmRleCkge1xyXG4gICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogJy9yZWNvbW1lbmQvZGVsJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgX2lkOiBpZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b2FzdDogXCLliKDpmaTkuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QuZGlzbWlzcygnT0shJyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ2FkZFVzZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnYWpheCcsICd0b2FzdCcsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgYWpheCwgdG9hc3QsICRzdGF0ZSwgJHN0YXRlUGFyYW1zKSB7XHJcblxyXG4gICAgJHNjb3BlLmRhdGEgPSB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICRzdGF0ZVBhcmFtcy51c2VybmFtZSxcclxuICAgICAgICBvYmplY3RJZDogJHN0YXRlUGFyYW1zLm9iamVjdElkXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc3RhdGVQYXJhbXMub2JqZWN0SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSAkc3RhdGVQYXJhbXMub2JqZWN0SWQgPyAnL3VzZXIvdXBkYXRhJyA6ICcvdXNlci8nO1xyXG4gICAgICAgIHZhciBkYXRhID0gJHN0YXRlUGFyYW1zLm9iamVjdElkID8ge1xyXG4gICAgICAgICAgICBvYmplY3RJZDogJHN0YXRlUGFyYW1zLm9iamVjdElkLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgfSA6IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6ICRzY29wZS5kYXRhLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgX3RvYXN0ID0gJHN0YXRlUGFyYW1zLm9iamVjdElkID8gJ+S/ruaUueS4rS4uLicgOiAn5re75Yqg5LitLi4uJztcclxuICAgICAgICB2YXIgX2Rpc21pc3MgPSAkc3RhdGVQYXJhbXMub2JqZWN0SWQgPyAn5L+u5pS55oiQ5YqfIScgOiAn5re75Yqg5oiQ5YqfISc7XHJcblxyXG4gICAgICAgIGFqYXgucG9zdCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICB0b2FzdDogX3RvYXN0XHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRvYXN0LmRpc21pc3MoX2Rpc21pc3MpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2xheW91dC51c2VyJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ3VzZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnYWpheCcsICd0b2FzdCcsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIHRvYXN0KSB7XHJcbiAgICAvL+afpeivoueuoeeQhuWRmFxyXG4gICAgYWpheC5nZXQoe1xyXG4gICAgICAgIHVybDogJy91c2VyJyxcclxuICAgICAgICB0b2FzdDogXCLojrflj5bkuK0uLi5cIlxyXG4gICAgfSkudGhlbihcclxuICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5saXN0ID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgICAvL+WIoOmZpOeuoeeQhuWRmFxyXG4gICAgJHNjb3BlLmRlbCA9IGZ1bmN0aW9uKGlkLGluZGV4KXtcclxuICAgICAgICBhamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvdXNlci9kZWwnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RJZDogaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9hc3Q6IFwi5Yig6Zmk5LitLi4uXCJcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCdPSyEnKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9O1xyXG5cclxufV0pOyIsImFwcC5jb250cm9sbGVyKCdpbmZvcm1hdGlvbkNvbnRyb2xsZXInLCBbJyRzY29wZScsICdhamF4JywgJ2NBbGVydCcsICd0b2FzdCcsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIGNBbGVydCwgdG9hc3QpIHtcclxuICAgICRzY29wZS5pc1VwZGF0YSA9IGZhbHNlO1xyXG4gICAgLy/mn6Xor6LkuKrkurrkv6Hmga9cclxuICAgIGFqYXguZ2V0KHtcclxuICAgICAgICB1cmw6ICcvaW5mb3JtYXRpb24nLFxyXG4gICAgICAgIHRvYXN0OiBcIuiOt+WPluS4rS4uLlwiXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlzVXBkYXRhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLmluZm8gPSByZXN1bHRbMF07XHJcbiAgICAgICAgdG9hc3QuZGlzbWlzcygn6I635Y+W5oiQ5YqfJyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy/orr7nva7kuKrkurrkv6Hmga9cclxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICcnO1xyXG4gICAgICAgIHZhciBkYXRhID0gJyc7XHJcbiAgICAgICAgaWYgKCRzY29wZS5pc1VwZGF0YSkge1xyXG4gICAgICAgICAgICB1cmwgPSAnL2luZm9ybWF0aW9uJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgPSAnL2luZm9ybWF0aW9uL3VwZGF0YSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS5pbmZvLFxyXG4gICAgICAgICAgICB0b2FzdDogXCLorr7nva7kuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCforr7nva7miJDlip8nKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XSk7IiwiYXBwLmNvbnRyb2xsZXIoJ3dlYkluZm9Db250cm9sbGVyJywgWyckc2NvcGUnLCAnYWpheCcsICdjQWxlcnQnLCd0b2FzdCcsIGZ1bmN0aW9uICgkc2NvcGUsIGFqYXgsIGNBbGVydCx0b2FzdCkge1xyXG4gICAgJHNjb3BlLmlzVXBkYXRhID0gZmFsc2U7XHJcbiAgICAvL+afpeivouS4quS6uuS/oeaBr1xyXG4gICAgYWpheC5nZXQoe1xyXG4gICAgICAgIHVybDogJy93ZWJpbmZvJyxcclxuICAgICAgICB0b2FzdDogXCLojrflj5bkuK0uLi5cIlxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pc1VwZGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5pbmZvID0gcmVzdWx0WzBdO1xyXG4gICAgICAgIHRvYXN0LmRpc21pc3MoJ+iOt+WPluaIkOWKnycpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8v6K6+572u5Liq5Lq65L+h5oGvXHJcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSAnJztcclxuICAgICAgICB2YXIgZGF0YSA9ICcnO1xyXG4gICAgICAgIGlmICgkc2NvcGUuaXNVcGRhdGEpIHtcclxuICAgICAgICAgICAgdXJsID0gJy93ZWJpbmZvJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgPSAnL3dlYmluZm8vdXBkYXRhJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYWpheC5wb3N0KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS5pbmZvLFxyXG4gICAgICAgICAgICB0b2FzdDogXCLorr7nva7kuK0uLi5cIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB0b2FzdC5kaXNtaXNzKCforr7nva7miJDlip8nKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XSk7Il19
