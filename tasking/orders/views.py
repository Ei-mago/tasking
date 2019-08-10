from django.shortcuts import render

# Create your views here.
def test1(request):
    return render(request,'test2.html')