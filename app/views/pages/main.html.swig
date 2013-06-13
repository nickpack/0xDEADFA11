{% extends 'layout.html.swig' %}
{% block content %}
<section class="sixteen columns alpha omega" id="intro">
    <article class="container">
        <h1>Hi, I'm Nick...</h1>

        <div class="twelve columns alpha">
            <p class="lead">I’m a self-motivated twenty-something nerdy type, that is well versed in a few key
                programming languages, object-oriented programming, linux system administration, networking fundamentals
                and
                the MVC pattern. </p>

            <p>I’m an avid open source contributor, hobbyist hacker, keen musician, father and husband.</p>

            <p>I'm a self confessed nerd, code snob and warranty voiding enthusiast, but can talk human when put in
                front
                of non-technical people.</p>

            <p>My foundations are very much rooted in open source technologies and I am a strong believer in the
                methodology surrounding it.</p>

            <p>For a number of years I was the Lead Dev/Project Manager of the now retired <cite><a
                    href="http://www.idroidproject.org">iDroid Project</a></cite> which is a port of the Linux
                kernel &amp; Android to the Apple iPhone/iPod/iPad.</p>
            <p>One tab in my IDE is exactly equal to four spaces, and you can keep your CRLF, thanks.</p>
        </div>
        <div class="four columns omega">
            <img src="/img/mugshot.jpg" alt="Nick Pack" class="scale-with-grid">
        </div>
    </article>
</section>
<section class="sixteen columns alpha omega" id="oss">
    <h2>Open Source Projects</h2>
    <p>I actively maintain a few Open Source projects (mainly when I can find some spare time) it feels good to give
        something back.</p>
    <p>Some of the more recent ones you will find below, ordered by my last push.</p>
    {% for project in projects %}
    <article class="eight columns {{ loop.cycle('alpha', 'omega') }} project">
        <div class="ghbar"><i class="icon-github"></i>

            <h3><a href="/projects/{{ project.name }}">{{ project.name }}</a></h3> <i class="icon-code"></i> Language:
            {{ project.language }} | <i class="icon-star"></i> Stars: <a
                    href="https://github.com/nickpack/{{ project.name }}/stargazers">{{ project.watchers }}</a> | <i
                    class="icon-code-fork"></i> Forks: <a href="https://github.com/nickpack/{{ project.name }}/network">
                {{ project.forks }}</a></div>
        <p>{{ project.description }}</p>
    </article>
    {% endfor %}
</section>
{% endblock %}