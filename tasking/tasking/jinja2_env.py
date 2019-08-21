

from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse

from jinja2 import Environment
from django.contrib.humanize.templatetags.humanize import naturaltime



def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
        'naturaltime': naturaltime,
    })
    return env