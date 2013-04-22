{% extends 'layout.html.swig' %}
{% block content %}
    <div class="sixteen columns alpha omega">
        {{ markdown|raw }}
    </div>
{% endblock %}