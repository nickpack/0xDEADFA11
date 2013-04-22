{% extends 'layout.html.swig' %}
{% block content %}
    {% for project in projects %}
        <h2><a href="/projects/{{ project.name }}">{{ project.name }}</a></h2>
        <p>{{ project.description }}</p>
    {% endfor %}
{% endblock %}