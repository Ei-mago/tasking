from django.shortcuts import render
from django.utils.deprecation import MiddlewareMixin


class error_exceptions(MiddlewareMixin):
    def process_request(self,request):
        pass
    def process_response(self,request,response):
        if response.status_code == 404:
            return  render(request,'404.html')
