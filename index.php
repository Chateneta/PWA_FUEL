<?php
include('php\fct.php');
getData();
?>
<head>
  <title>PWA_FUEL</title>
  <link rel="icon" type="image/png" href="image/fuel2.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="css\style.css">
  <link rel="stylesheet" href="css\loader.css">
  
</head>
<body>
  <div class="container">
    <button id="go" onclick="launch()">GO</button>
    <div id="loader" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <div id="main">
    </div>
  </div>
  <script src="js\jquery.js"></script>
  <script src="js\fct.js"></script>
  <script src="js\main.js"></script>
</body>