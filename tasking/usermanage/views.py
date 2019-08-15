from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.


def test(request):
    return render(request,'test1.html')


def login(request):

    return render(request, 'usermanage/login.html')