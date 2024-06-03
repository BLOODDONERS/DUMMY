<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process form data here
    
    // Redirect to thankyou.html after processing
    header("Location: thankyou.html");
    exit;
}
?>
