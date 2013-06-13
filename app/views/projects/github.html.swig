{% extends 'layout.html.swig' %}
{% block content %}
    <article class="sixteen columns alpha omega github-project">
        {{ markdown|raw }}
    </article>
{% endblock %}