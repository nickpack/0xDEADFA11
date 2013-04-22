{% extends 'layout.html.swig' %}
{% block content %}
    <div class="sixteen columns alpha omega">
        <p>Hello{% if user %} {{ user.email }}{% endif %}. This is Cohaesus labs, our experiments in creative coding.</p>
        <h2>We are</h2>
        {% for member in team %}
            <div class="two columns{% if loop.first %} alpha{% endif %}{% if loop.last %} omega{% endif %}">
                <img width="80" height="80" src="{{ member.avatar_url }}" />
                <p><a href="https://github.com/{{ member.login }}">{{ member.login }}</a></p>
            </div>
        {% endfor %}
    </div>
    <div class="sixteen columns alpha omega">
        <h2>Our Stuff</h2>
        {% for project in projects %}
            <h2><a href="/projects/{{ project.name }}">{{ project.name }}</a></h2>
            <p>{{ project.description }}</p>
        {% endfor %}
    </div>
{% endblock %}