<?php
// Security headers
header("Content-Security-Policy: default-src 'self'");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: geolocation=(), microphone=(), camera=()");

// Get form data and sanitize
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Validate form fields
$errors = array();

if (empty($name) || strlen($name) < 4) {
    $errors[] = "Please enter your name (at least 4 characters).";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}

if (empty($subject) || strlen($subject) < 4) {
    $errors[] = "Please enter a subject (at least 4 characters).";
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = "Please enter your message (at least 10 characters).";
}

// Check if there are validation errors
if (!empty($errors)) {
    $response = array(
        'success' => false,
        'errors' => $errors
    );
    echo json_encode($response);
    exit;
}

// Recipient email
$recipient = "contact@liquidlabs.ca";

// Additional headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Email body
$body = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <p><strong>Message:</strong></p>
    <p>" . nl2br($message) . "</p>
</body>
</html>
";

// Send email
$success = mail($recipient, "Website Contact Form: $subject", $body, $headers);

// Return response
if ($success) {
    $response = array(
        'success' => true,
        'message' => 'Your message has been sent. Thank you!'
    );
    echo json_encode($response);
} else {
    $response = array(
        'success' => false,
        'errors' => array('Sorry, there was an error sending your message. Please try again later.')
    );
    echo json_encode($response);
}
?>
