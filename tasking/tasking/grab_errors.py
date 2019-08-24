from django.shortcuts import render


def page_not_found(request):
    response = render(request,'404.html')
    response.status_code = 404
    return response