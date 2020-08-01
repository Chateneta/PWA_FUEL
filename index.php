<?php
include('php\fct.php');
getData();
?>
<head>
  <title>PWA_FUEL</title>
  <link rel="stylesheet" href="css\style.css">
  <link rel="stylesheet" href="css\loader.css">
  
</head>
<body>
  <div class="container">
    <button id="go" onclick="launch()">GO</button>
    <div id="loader" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <div id="main">
      <div class="data">
        <div class="title">
          <span>Ville</span>
          <span>7km</span>
        </div>
        <div class="content">
          <ul>
            <li>SP95 : 1.34</li>
            <li>SP98 : 1.22</li>
            <li>Gazole : 1.47</li>
          </ul>
          <div>
            <span>X  rue adresss</span>
            <div class="services">
              <img src="image\pique.png" alt="">
              <img src="image\pique.png" alt="">
              <img src="image\pique.png" alt="">
              <img src="image\pique.png" alt="">
            </div>
          </div>
        </div>
    </div>
  </div>
  <script src="js\jquery.js"></script>
  <script src="js\fct.js"></script>
  <script src="js\main.js"></script>
</body>