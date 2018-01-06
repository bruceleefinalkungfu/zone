<!DOCTYPE html>

<html lang="en" ng-app="crudApp">
    <head>
        <title>${title}</title>
        <link href="css/bootstrap.css" rel="stylesheet"/>
        <link href="css/app.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
    </head>
    <body>
    	<div id='zin-screen' style="border: thin solid blue;">
    		<input id='zin-start-button' type="button"></input>
    		<input id='zin-start-button2' type="button"></input>
    	</div>
    	
        <script src="js/lib/angular.min.js" ></script>
        <script src="js/lib/angular-ui-router.min.js" ></script>
        <script src="js/lib/jquery-3.2.1.js" ></script>
        <script src="js/lib/jquery-ui.js" ></script>
        <script src="js/lib/localforage.min.js" ></script>
        <script src="js/lib/ngStorage.min.js"></script>
        <script src="js/app/ZinApp.js"></script>
        <script src="js/app/ZinSfc.js"></script>
        <script src="js/app/app.js"></script>
        <script src="js/app/UserService.js"></script>
        <script src="js/app/UserController.js"></script>
        <script src="js/lib/zin-utill.js"></script>
    </body>
</html>