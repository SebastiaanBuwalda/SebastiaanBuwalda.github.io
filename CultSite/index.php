<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="style.css">
    </head>
<body>

<img src="Assets/Banner_Soul.png">
<p>You have finally browsed into our 'online museum for your mind.' We are happy to have you!</p>
<H1>WHAT IS THIS PAGE?</H1>
<p>Greetings O Great Soul is an online hub for information and forum (members only) for people wishing to live a more fulfilling life. The appRoach of the 21st century has caused a big shift in how we should approach topics like sleep, community, free will, nutriotion (of body and mind.) and so much more! As such; Greetings 0 Great Soul wishes to combine ancient wisdom that has evolved us from jungles to concrete streets. Instead of announcing news from a physical 'forum', it is more with the times to do so on an online 'forum'! Blessed that it may be!</p>
<H1>WHAT ARE YOUR 6 CORE BELIEFS?</H1>
    <p>- Hapiness is within everybody.</p>
     <p>- Most philosophies do not account for modern technology. only we do.</p>
     <p>-Words on the internet are magic, for they can reach anybody.</p>
    <img src="Assets/universe.png" width="240">
    <p>-We are not in control.</p>
    <p>-Every desire, food, money, love, safety, is a desire for control.</p>
    <p>-If you really want something. Multiply that desire by 10.</p>
<H1>HOW DO I JOIN IN ON THE CONVERSATION?</H1>
    <p>It is good that you are willing to converse with like-minded individuals. To keep our talks from being overloading with SPAM and other nonsense we have a lock on the forum. </p>
   <form action="" method="POST">
<label>Enter the proper colour:</label><input type="text" name="first_name"><br>
<input type="submit" name="submit" value="submit"/>
</form>
     <p>If you wish to converse, input the correct colour to continue. Write it in the code of curses.</p>

<?php

$first_name= $_POST['first_name'];

$submitbutton= $_POST['submit'];

if ($submitbutton){
if ($first_name == '#d2003b') {
             echo 'You have won. put "reward" where the void or "index" once was. End it properly, with a PerHaPs.';
}
else {
echo 'The colour is not: ' . $first_name . ' remember that colours come in more languages then one.';
}
}
?>

</body>
</html>