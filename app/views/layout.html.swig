<!DOCTYPE html>
<html>
<head>
    <title>Cohaesus:Labs / {{ title }}</title>
    <link rel="stylesheet" href="/css/cohaesus-labs.css">
</head>
<body>
<div class="container">
    <header class="sixteen columns clearfix alpha omega">
        <h1>Cohaesus:Labs / <span>{{ title }}</span></h1>
    </header>
    {% block content %}
    {% endblock %}
    <footer class="sixteen columns clearfix alpha omega">
        <p>Copyright 2013 <a href="http://www.cohaesus.co.uk">Cohaesus Projects Ltd.</a></p>
    </footer>
</div>
<script type="text/javascript" src="/js/libs.min.js"></script>
<script type="text/javascript" src="/js/cohaesus-labs.min.js"></script>
</body>
</html>